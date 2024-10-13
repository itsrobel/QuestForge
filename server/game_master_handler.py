import anthropic_bedrock
from langchain_core.prompts import PromptTemplate

group_combat_event = r"""
You are an AI RPG game master for a mythical campagin that will receive: 
- The stats of the players in the party
- The story of the players in the RPG,
- The 
Based off of these paramters, create a stat change to the player using
the stat that the event effects. using the story provided create a extension
of the story using the event that the player attended as a setting.
Export the information as a json in the following format
"""

personal_event = r"""
You are an AI RPG game master for a mythical campagin that will receive: 
- The stats of the player
- The quest that the player completed,
- The stat the quest effects,
- The story of the player in the RPG,
Based off of these paramters, create a stat change to the player using
the stat that the event effects. using the story provided create a extension
of the story using the event that the player attended as a setting.
Format the output as a json with the values of the following:
change: int change in stat,
stat: the stat that changed,
story: generated story
"""

# NOTE: group events should just have a stat Multiplier

group_boss_fight_prompt = r"""
You are an AI RPG game master for a mythical campaign. You will receive:
- The stats of all players in the party
- The current story of the party in the RPG
- The details of the boss they are facing

Based on these parameters, create an exciting and challenging boss fight scenario. Include:
1. A description of the boss and its abilities
2. The setting of the fight
3. Special mechanics or challenges the party must overcome
4. Possible outcomes based on the party's actions

After the fight, determine stat changes for each player based on their performance and role in the battle.

Export the information as a JSON in the following format:
{
  "boss_description": "Description of the boss",
  "fight_setting": "Setting of the battle",
  "special_mechanics": ["List of special mechanics or challenges"],
  "potential_strategies": ["List of potential strategies"],
  "possible_outcomes": ["List of possible outcomes"],
  "player_stat_changes": [
    {
      "player_name": "Name of player 1",
      "stat_changes": [
        {
          "stat": "Name of stat changed",
          "change": "Integer value of change"
        }
      ]
    },
    // Repeat for each player
  ],
  "story_continuation": "A paragraph continuing the party's story after the boss fight"
}
"""

group_boss_fight_prompt_template = f"""
{anthropic_bedrock.HUMAN_PROMPT}:{group_boss_fight_prompt}

<party_stats>:{{party_stats}}</party_stats>

<current_story>:{{current_story}}</current_story>

<boss_details>:{{boss_details}}</boss_details>

{anthropic_bedrock.AI_PROMPT}:
"""

GROUP_BOSS_FIGHT_PROMPT = PromptTemplate(
    template=group_boss_fight_prompt_template,
    input_variables=[
        "party_stats",
        "current_story",
        "boss_details",
    ],
)

personal_event_prompt = (
    f"{anthropic_bedrock.HUMAN_PROMPT}:{personal_event}\n\n"
    f"<player_stats>:{{player_stats}}</player_stats>\n\n"
    f"<quest>:{{quest}}</quest>\n\n"
    f"<quest_effect>:{{quest_effect}}</quest_effect>\n\n"
    f"Current Player Story:"
    f"<player_story>{{player_story}}</player_story>\n\n{anthropic_bedrock.AI_PROMPT}:"
)


PERSONAL_QUEST_PROMPT = PromptTemplate(
    template=personal_event_prompt,
    input_variables=[
        "\\nchange",
        "player_stats",
        "quest",
        "quest_effect",
        "player_story",
    ],
)
# TODO: Create prompt for skill generation
# TODO: Create prompt for group events
# TODO: Create prompt for group battles
