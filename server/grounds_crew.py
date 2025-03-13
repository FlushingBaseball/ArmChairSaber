#!/usr/bin/env python
import os
import requests
import datetime

from dotenv import load_dotenv
load_dotenv()

"""
Grounds Crew Script v0.1.0

Call API
if there's games 
post the games to the back end, if the game is already on the backend reject it
if there's not any games log it


"""
base_url = os.environ.get('BASE_URL')
print(f'base_url is: {base_url}')
todays_date = datetime.datetime.now().strftime("%m/%d/%Y")
print(f"todays date is {todays_date} checking mlb's schedule")


def schedule_todays_games():
  mlb_schedule = requests.get(f'https://statsapi.mlb.com/api/v1/schedule?date={todays_date}&sportId=1')

  if mlb_schedule.status_code == 200:
    todays_schedule_data = mlb_schedule.json()
    print(todays_schedule_data)
    """
    if dates key exists and is greater than zero
    loop through all the games and submit them
    """

    if 'dates' in todays_schedule_data and len(todays_schedule_data['dates']):
      for game in todays_schedule_data['dates'][0]['games']:
        print('In a new game')
        gamePk = game['gamePk']
        game_data ={'gamePk': gamePk, 'stale_game_flag': False, 'gameResolved': False}
        print(f"this is the data we're sending to the backend {game_data}")
        game_data_post_response = requests.post(f'{base_url}/api/games/{str(gamePk)}', json=game_data)

        if game_data_post_response.status_code == 201:
          print(f"Success: posted game {gamePk} to backend")
          print("\n" * 5)
        else:
          print(f"Failure: error posting game {gamePk} to the backend")
          print("Response: ", game_data_post_response.text)
          print('\n' * 5)

  else:
    print("Error: initial call to MLB schedule endpoint failed")
    print(f" {mlb_schedule.status_code} - {mlb_schedule.text}")
    print('\n' * 3)


  


schedule_todays_games()


