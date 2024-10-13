from typing import NamedTuple


class PlayerState(NamedTuple):
    health: float
    athleticism: float
    creativity: int
    knowledge: int


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


class Player:
    def __init__(self, name, health=100, strength=10, knowledge=10):
        self.name = name
        self.health = health
        self.strength = strength
        self.knowledge = knowledge
        self.skills = []

    # ... (previous methods remain the same)

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


class Attack(NamedTuple):
    caster: Player
    target: Player
    attack: int
