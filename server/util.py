import datetime
import logging

from langchain_chroma import Chroma

# logging.basicConfig(level=logging.INFO)
logging.basicConfig(
    filename="runtime.log",
    level=logging.INFO,
    format="%(asctime)s %(process)s %(levelname)s %(message)s",
    filemode="a",
)
logger = logging.getLogger()


def logAttr(arg):
    logger.info(f"Attributes of {arg}")
    attrs = [attr for attr in dir(arg) if not attr.startswith("__")]
    for attr in attrs:
        logger.info(attr)


def debug(arg):
    logger.debug(arg)


def info(arg):
    logger.info(arg)


def error(arg):
    logger.error(arg)


def getDailyDatetime() -> str:
    today = datetime.date.today()
    yesterday = today - datetime.timedelta(days=1)
    formatted_date = yesterday.strftime("%Y-%m-%d")
    return formatted_date


# TODO:: let the end_date also be a int that is days ahead of start_date
def getDates(start_date: str, end_date: str) -> list[str]:
    try:
        start = datetime.datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.datetime.strptime(end_date, "%Y-%m-%d") + datetime.timedelta(
            days=1
        )
        delta = (end - start).days
        days = [start + datetime.timedelta(days=i) for i in range(delta)]
        days = [day.strftime("%Y-%m-%d") for day in days]

        # days.pop(0)
        # info(days)
        return days
    except Exception as error:
        logger.error(f"Error in funcion getDates: {error}")
        return []


def getInfoVectorStore(vector_store: Chroma) -> set:
    md = vector_store.get()["metadatas"]
    set_of_dates: set = set()
    set_of_sources: set = set()
    for meta in md:
        set_of_dates.add(meta["date"])
        set_of_sources.add(meta["source"])

    if set_of_dates:
        info("dates in vs: ")
        for date in set_of_dates:
            info(date)
    else:
        info("vector store does not contain any values")
    return set_of_dates
