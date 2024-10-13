import boto3
from botocore.config import Config
from langchain_aws import ChatBedrock
import os

config = Config(read_timeout=1000)
AWS_REGION = "us-west-2"


AKI = os.getenv("AKI")
SAK = os.getenv("SAK")

session = boto3.Session(
    aws_access_key_id=AKI,
    aws_secret_access_key=SAK,
)


MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0"
HAIKU_MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0"
SONNET_MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0"
OPUS_MODEL_ID = "anthropic.claude-3-opus-20240229-v1:0"


def setup_bedrock():
    """Initialize the Bedrock runtime."""
    return session.client(
        service_name="bedrock-runtime", region_name=AWS_REGION, config=config
    )


def initialize_llm(client, model_id, streaming):
    """Initialize the language model."""
    llm = ChatBedrock(client=client, model_id=model_id, streaming=streaming)
    llm.model_kwargs = {"temperature": 0.0, "max_tokens": 4096}
    return llm


def initialize_bedrock_llm(model_id=SONNET_MODEL_ID, streaming=False):
    bedrock_runtime = setup_bedrock()
    return initialize_llm(bedrock_runtime, model_id, streaming)


opus_model_id = "claude-3-opus-20240229"
sonnet_model_id = "claude-3-sonnet-20240229"
haiku_model_id = "claude-3-haiku-20240307"


def get_llm_opus(streaming=False):
    return initialize_bedrock_llm(model_id=OPUS_MODEL_ID, streaming=streaming)


def get_llm_sonnet(streaming=False):
    initialize_bedrock_llm(model_id=SONNET_MODEL_ID, streaming=streaming)


def get_llm_haiku(streaming=False):
    return initialize_bedrock_llm(model_id=HAIKU_MODEL_ID, streaming=streaming)
