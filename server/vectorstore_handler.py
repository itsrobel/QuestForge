import os
import time
from langchain.indexes import SQLRecordManager, index
from langchain_chroma import Chroma
from langchain_community.embeddings import BedrockEmbeddings
from langchain_text_splitters import HTMLSectionSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter


from boto3.session import Session
import data_manager
from botocore.config import Config
import util

config = Config(read_timeout=1000)


def setup_bedrock():
    """Initialize the Bedrock runtime."""
    return data_manager.session.client(
        service_name="bedrock-runtime",
        region_name=data_manager.AWS_REGION,
        config=config,
    )


embeddings = BedrockEmbeddings(
    client=setup_bedrock(),
    region_name=data_manager.AWS_REGION,
    model_id="amazon.titan-embed-text-v1",
)
vector_store_root = "chroma/webapp"
os.makedirs(vector_store_root) if not os.path.exists(vector_store_root) else None


def getRecordManager() -> SQLRecordManager:
    collection_name = "s3"
    namespace = f"chroma/{collection_name}"
    record_manager = SQLRecordManager(
        namespace, db_url="sqlite:///record_manager_cache.sql"
    )
    record_manager.create_schema()
    return record_manager


master_record_manager = getRecordManager()


def getSession() -> Session:
    aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

    # if aws_access_key_id and aws_secret_access_key:
    session = Session(
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=data_manager.AWS_REGION,
    )
    # .get_credentials()
    return session


# TODO: each vector_store needs to be a document path that is "{root}/{site}_{route}"


def getVectorStore(site: str, route: str = "index") -> Chroma:
    vector_store = Chroma(
        persist_directory=f"{vector_store_root}/{site}_{route}",
        embedding_function=embeddings,
        # client_settings=Settings(anonymized_telemetry=False),
    )
    return vector_store


def _clear(record_manager: SQLRecordManager, vector_store: Chroma) -> None:
    index([], record_manager, vector_store, cleanup="full", source_id_key="source")
    vector_store.delete_collection()


def clearVectorStoreAll() -> None:
    vector_store_list: list[tuple] = getVectorStoreList()
    for vector_store in vector_store_list:
        site, route = vector_store
        _clear(master_record_manager, getVectorStore(site, route))


def getVectorStoreList() -> list[tuple]:
    vector_store_list: list = [
        vector_store
        for vector_store in os.listdir(vector_store_root)
        if os.path.isdir(os.path.join(vector_store_root, vector_store))
    ]
    vector_store_list = [i.split("_") for i in vector_store_list]
    vector_store_list = [tuple(i) for i in vector_store_list]
    return vector_store_list


def indexWebApp(html_content: str, site: str, route: str = "index") -> float:
    """
    html_content - the html page that you want to index
    site - the base url source of  the site you want to index
    route - the specific page source, the default value for this is
    index. When trying to pass in the home of a site, do not populate
    this parameter.
    """
    # site, date = args
    start_time = time.time()
    try:
        # NOTE: I should probably update this to be something else
        headers_to_split_on = [("h1", "Header 1"), ("h2", "Header 2")]

        html_splitter = HTMLSectionSplitter(headers_to_split_on)

        html_header_splits = html_splitter.split_text(html_content)
        chunk_size = 2500
        chunk_overlap = 250
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap
        )
        docs = text_splitter.split_documents(html_header_splits)

        for doc in docs:
            doc.metadata["source"] = f"{site}/{route}"

        if html_content:
            index(
                docs,
                record_manager=master_record_manager,
                vector_store=getVectorStore(site, route),
                cleanup="incremental",
                source_id_key="source",
            )
    except Exception as error:
        util.error(f"Error in funcion indexProcess: {error}")
    finally:
        end_time = time.time()
        time_to_complete = round((end_time - start_time), 2)
        util.info(f"Index Process execution time: {time_to_complete} seconds")
        return time_to_complete
