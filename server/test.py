from langchain.chains import (
    LLMChain,
)
from langchain_core.output_parsers import StrOutputParser
import llm_handler
import game_master_handler
import util
import asyncio
import os
from dotenv import load_dotenv
from data_structs import PlayerState

load_dotenv()

llm = llm_handler.initialize_bedrock_llm()
# llm_chain = LLMChain(
#     prompt=game_master_handler.PERSONAL_QUEST_PROMPT, llm=llm, verbose=False
# )


llm_chain = game_master_handler.PERSONAL_QUEST_PROMPT | llm | StrOutputParser()


async def test_llm_chain(player_stats, quest, quest_effect, player_story):
    response = await llm_chain.ainvoke(
        {
            "player_stats": player_stats,
            "quest": quest,
            "quest_effect": quest_effect,
            "player_story": player_story,
        }
    )
    util.info(response)


async def test_pipeline():
    stats = PlayerState(100, 12.2, 16, 20)
    quest = "Go to the library and study "
    quest_effect = "knowledge"
    player_story = "the player is trying to find the vampire king"
    await test_llm_chain(stats, quest, quest_effect, player_story)


if __name__ == "__main__":
    asyncio.run(test_pipeline())
