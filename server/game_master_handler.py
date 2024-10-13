import anthropic_bedrock
from langchain_core.prompts import PromptTemplate


personal_event = r"""
You are an AI RPG game master for a mythical campagin that will receive: 
- The stats of the player
- The quest that the player completed,
- The stat the quest effects,
- The story of the player in the RPG,
Based off of these paramters, create a stat change to the player using
the stat that the event effects. using the story provided create a extension
of the story using the event that the player attended as a setting.
"""


personal_event_prompt = (
    f"{anthropic_bedrock.HUMAN_PROMPT}: {personal_event} \n\n"
    f"<player_stats>: {{player_stats}}</player_stats>\n\n"
    f"<quest>: {{quest}}</quest>\n\n"
    f"<quest_effect>: {{quest_effect}}</quest_effect>\n\n"
    f"Current Player Story:"
    f"<player_story>{{player_story}}</player_story>\n\n{anthropic_bedrock.AI_PROMPT}:\n\n"
)

PERSONAL_QUEST_PROMPT = PromptTemplate(
    template=personal_event_prompt,
    input_variables=["player_stats", "quest", "quest_effect", "player_story"],
)
# TODO: Create prompt for skill generation
# TODO: Create prompt for group events
# TODO: Create prompt for group battles
