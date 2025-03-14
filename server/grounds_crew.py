#!/usr/bin/env python
import os
import requests
import datetime
import time
from requests.exceptions import RequestException
from dotenv import load_dotenv
load_dotenv()

"""
Grounds Crew Script v1.0.0
  Takes about 5.5 seconds to run if all 409's (which they should be on the second run)
"""

base_url = os.environ.get('BASE_URL')
print(f'base_url is: {base_url}')
todays_date = datetime.datetime.now().strftime("%m/%d/%Y")
print(f"todays date is {todays_date} checking mlb's schedule")


def schedule_todays_games():
  max_retries = 3
  retry_delay = 2
  mlb_schedule = requests.get(f'https://statsapi.mlb.com/api/v1/schedule?date={todays_date}&sportId=1')

  if mlb_schedule.status_code == 200:
    todays_schedule_data = mlb_schedule.json()
    print(todays_schedule_data)

    if 'dates' in todays_schedule_data and len(todays_schedule_data['dates']):
      for game in todays_schedule_data['dates'][0]['games']:
        print('In a new game')
        gamePk = game['gamePk']
        game_data ={'gamePk': gamePk, 'stale_game_flag': False, 'gameResolved': False}
        print(f"this is the data we're sending to the backend {game_data}")

        current_retry = 0
        current_delay = retry_delay
        success = False

        while current_retry < max_retries and not success: 
          try:
            game_data_post_response = requests.post(f'{base_url}/api/games/{str(gamePk)}', json=game_data)

            if game_data_post_response.status_code == 201:
              print(f"Success: posted game {gamePk} to backend")
              success = True
              print("\n" * 5)
            
            elif game_data_post_response.status_code == 409:
              print(f"ATTENTION: Game {gamePk} already exists in database - skipping")
              success = True

            else:
              print(f"Failure: Attempt {current_retry+1} failed: posting game {gamePk} to the backend")
              print("Response: ", game_data_post_response.text)
              current_retry += 1
              print('\n' * 5)
              if current_retry < max_retries:
                time.sleep(current_delay)
                current_delay *= 2

          except RequestException as e:
            print(f"Request error on attempt {current_retry+1}: {e}")
            current_retry +=1
            
            if current_retry < max_retries:
              time.sleep(current_delay)
              current_delay *=2

  else:
    print("Error: initial call to MLB schedule endpoint failed")
    print(f" {mlb_schedule.status_code} - {mlb_schedule.text}")
    print('\n' * 3)


  


schedule_todays_games()


