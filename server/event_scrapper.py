from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import requests

events_dict = {"Football": "https://gohuskies.com/sports/football/schedule/2024"}


page = requests.get(events_dict["Football"])


# driver = webdriver.Chrome()

# driver.get(events_dict["Football"])

# title = driver.title
# driver.implicitly_wait(0.5)


# soup = driver.page_source
soup = BeautifulSoup(page.content, "html.parser")
games = {}


coming_games = soup.find_all(class_="upcoming-game")
for game in coming_games:
    date = game.find(class_="sidearm-schedule-game-opponent-date").text.strip()
    name = game.find(class_="sidearm-schedule-game-opponent-name").text.strip()
    location = game.find(class_="sidearm-schedule-game-location").text.strip()
    games[date] = {"team": name, "location": location}
print(games)
