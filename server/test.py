from langchain_core.output_parsers import StrOutputParser
import game_master_handler
import util
import asyncio


# from langchain_community.llms import OpenAI

# from langchain.llms import OpenAI
from langchain_openai import OpenAI


# import os
from dotenv import load_dotenv
from data_structs import PlayerState

# os.environ["OPENAI_API_KEY"] = "your-openai-api-key-here"
load_dotenv()

llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.7)


async def test_llm_chain(player_stats, quest, quest_effect, player_story):
    # llm = bedrock_handler.initialize_bedrock_llm()

    llm_chain = game_master_handler.PERSONAL_QUEST_PROMPT | llm | StrOutputParser()

    response = await llm_chain.ainvoke(
        {
            "\nchange": 0,
            "player_stats": player_stats,
            "quest": quest,
            "quest_effect": quest_effect,
            "player_story": player_story,
        }
    )
    util.info(response)
    print(response)


async def test_pipeline():
    stats = PlayerState(100, 12.2, 16, 20)
    quest = "Go to the library and study "
    quest_effect = "knowledge"
    player_story = "the player is trying to find the vampire king"
    await test_llm_chain(stats, quest, quest_effect, player_story)


if __name__ == "__main__":
    # print(llm_handler.cred.)
    asyncio.run(test_pipeline())
