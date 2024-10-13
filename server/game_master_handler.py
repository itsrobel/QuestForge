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


skill_generator_prompt = r"""
You are an AI RPG game master tasked with generating new skills for players based on their context. You will receive:
- The stats of the player
- The quest that the player completed
- The effects of the quest
- The player's ongoing story in the RPG
Based on these parameters, create a new skill for the player, including:
- A skill name
- A brief description of the skill
- A multiplier that affects the player's stats

Format the output as a JSON with the following values:
name: the name of the new skill,
description: the description of the new skill,
multiplier: float representing the skill's multiplier,
story_extension: a narrative that extends the player's story based on the new skill.
"""

skill_generator_prompt_template = (
    f"{anthropic_bedrock.HUMAN_PROMPT}:{skill_generator_prompt}\n\n"
    f"<player_stats>{{player_stats}}</player_stats>\n\n"
    f"<completed_quest>{{completed_quest}}</completed_quest>\n\n"
    f"<quest_effects>{{quest_effects}}</quest_effects>\n\n"
    f"Current Player Story:\n<player_story>{{player_story}}</player_story>\n\n{anthropic_bedrock.AI_PROMPT}:"
)

SKILL_GENERATOR_PROMPT = PromptTemplate(
    template=skill_generator_prompt_template,
    input_variables=[
        "player_stats",
        "completed_quest",
        "quest_effects",
        "player_story",
    ],
)
character_selector_prompt = r"""
You are an AI RPG game master responsible for selecting characters for players in a specific world. You will receive:
- A description of the world
Based on this information, generate a list of characters that the user can role-play as. Each character should include:
- A name
- A brief description

Format the output as a JSON with the following values:
characters: a list of character objects, each containing name and description.
"""

character_selector_prompt_template = (
    f"{anthropic_bedrock.HUMAN_PROMPT}:{character_selector_prompt}\n\n"
    f"<world>{{world}}</world>\n\n{anthropic_bedrock.AI_PROMPT}:"
)

CHARACTER_SELECTOR_PROMPT = PromptTemplate(
    template=character_selector_prompt_template,
    input_variables=["world"],
)


story_generator_prompt = r"""
You are an AI RPG game master who creates engaging narratives for players based on their context. You will receive:
- A description of the world
- A character object containing name and description
Based on this information, generate a compelling story that sets the stage for the character's adventures in the world.

Format the output as a JSON with the following values:
story: a narrative that immerses the player in their character's journey.
"""

story_generator_prompt_template = (
    f"{anthropic_bedrock.HUMAN_PROMPT}:{story_generator_prompt}\n\n"
    f"<world>{{world}}</world>\n\n"
    f"<character>{{character}}</character>\n\n{anthropic_bedrock.AI_PROMPT}:"
)

STORY_GENERATOR_PROMPT = PromptTemplate(
    template=story_generator_prompt_template,
    input_variables=["world", "character"],
)
