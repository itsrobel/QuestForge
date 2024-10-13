from typing import NamedTuple
import uuid
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")


db = client["game_db"]  # Use your database name here
dworld = db["world"]
dplayer = db["world"]


class World:
    def __init__(self, name, owner_id, theme):
        self.name = name
        self.owner_id = owner_id
        self.theme = theme

    def to_dict(self):
        return {
            "name": self.name,
            "owner_id": self.theme,
            "theme": self.theme,
        }


class Skill:
    def __init__(self, name, description, multiplier):
        self.name = name
        self.description = description
        self.multiplier = multiplier

    def use(self, player):
        effect = int(player.strength * self.multiplier)
        print(f"{player.name} uses {self.name}!")
        print(f"{self.description}")
        print(
            f"Effect: {effect} (based on strength: {player.strength} * multiplier: {self.multiplier})"
        )
        return effect

    def display_info(self):
        print(f"\nSkill: {self.name}")
        print(f"Description: {self.description}")
        print(f"Multiplier: {self.multiplier}")

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description,
            "multiplier": self.multiplier,
        }


class Player:
    def __init__(self, name, description, health=100, strength=10, knowledge=10):
        self.id = uuid.uuid4()
        self.name = name
        self.discription = description
        self.health = health
        self.strength = strength
        self.knowledge = knowledge
        self.skills = []

    def add_skill(self, skill):
        self.skills.append(skill)
        print(f"{self.name} learned the skill: {skill.name}")

    def use_skill(self, skill_name):
        for skill in self.skills:
            if skill.name.lower() == skill_name.lower():
                return skill.use(self)
        print(f"{self.name} doesn't know the skill: {skill_name}")

    def display_skills(self):
        if not self.skills:
            print(f"{self.name} hasn't learned any skills yet.")
        else:
            print(f"\n{self.name}'s Skills:")
            for skill in self.skills:
                skill.display_info()

    def to_dict(self):
        return {
            "name": self.name,
            "health": self.health,
            "strength": self.strength,
            "knowledge": self.knowledge,
            "skills": [skill.to_dict() for skill in self.skills],
        }


class Attack(NamedTuple):
    caster: Player
    target: Player
    attack: int


def update_player_state(player_id, new_buffs):
    """
    Update the player's state with new buffs.

    :param player_id: The ID of the player to update.
    :param new_buffs: A dictionary of buffs to apply.
    """
    db.players.update_one({"_id": player_id}, {"$set": new_buffs})


def add_buff(player_id, buff_name, buff_value):
    """
    Add a specific buff to the player's state.

    :param player_id: The ID of the player to update.
    :param buff_name: The name of the buff (e.g., 'health', 'strength').
    :param buff_value: The value of the buff to add.
    """
    current_state = db.players.find_one({"_id": player_id})

    if current_state:
        # Example logic for merging buffs (simple addition)
        current_value = current_state.get(buff_name, 0)
        new_value = current_value + buff_value

        update_player_state(player_id, {buff_name: new_value})
