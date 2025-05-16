#!/usr/bin/env python
import os
import requests
import asyncio
import time

from dotenv import load_dotenv
load_dotenv()

"""
Predictions Script v0.3.0
"""

base_url = os.environ.get('BASE_URL')
print(f"base_url is: {base_url}")
users_cache = {}


## Fetch all unresolved predictions
async def handle_unresolved_predictions_pool():
  try:
     response = requests.get(f'{base_url}/api/predictionsNotResolved')

     if response.status_code ==200:
      data = response.json() 
      fill_user_cache_check_for_winners_contamination(data)
     else:
      print(f"Error: {response.status_code} - {response.text}")

  except requests.RequestException as e:
    print(f"Request failed: {e}")



def fill_user_cache_check_for_winners_contamination(data):
  print(f"Successfully called CFWC")
  for prediction in data:
    ## building out streak cache 
    if prediction['user']['id'] in users_cache:
      print("had this user")
      print("\n")
    else:
      print("didn't have this user")
      users_cache[prediction['user']['id']] = prediction['user']
      #print(users_cache)
      #print("\n" *10)
    ## checking for ActualWinnerData contamination don't know if this is needed but flask sqlAlchemy has done some weird stuff so -_(0-0)_-
    if (prediction['actualWinnerId'] != None):
      print("You should have never gotten here, big problem")
      # TODO log and break here prob
      print("\n" * 20 )
    else:
      ##Entry point for handling each prediction 
      handle_winner_not_known(prediction)
  print("After all the predictions were processed, here is users_cache")
  print(users_cache)
  print("\n" *10)
  patch_user_info()


def handle_winner_not_known(prediction):
  game_id = prediction['game_Id']

  ## Checking if the game is already on the backend (It should always be)
  game_response = requests.get(f'{base_url}/api/games/{str(game_id)}')

  if  game_response.status_code == 200:
    print("Game was on backend")
    backend_game_data = game_response.json()
    ## Checking if the prediction can be soley graded with data not from MLB API
    if (backend_game_data['gameResolved']== False):
      print(f'The game state for the game{game_id} on the backend is unresolved')
      print("calling call_mlb_patch_prediction")

      call_mlb_patch_prediction(prediction, game_id, backend_game_data)
    else:
      print("backend game isResolved")
      patch_user_prediction(prediction, backend_game_data)
  else:
    print("Game wasn't in database, this shouldn't be possible")
    print("\n" * 10)



def call_mlb_patch_prediction(prediction, game_id, backend_game_data):
  print("In: call_mlb_patch_prediction")
  print(f"game_sport_id: {backend_game_data['game_sport_id']}")
  print(f"Backend_game_data: {backend_game_data}")
  ## Calling MLB API to request status of game the prediction was made on
  mlb_Data = requests.get(f'https://statsapi.mlb.com/api/v1/schedule?sportId={str(backend_game_data["game_sport_id"])}&gamePk={str(game_id)}')

  if mlb_Data.status_code ==200:
    mlb_game_response = mlb_Data.json()
    ## Always checking the last date of a game object in order to handle rainouts etc
    if 'dates' in mlb_game_response and len(mlb_game_response['dates']) >= 0:
      last_date = len(mlb_game_response.get('dates')) -1
    else:
      print("No Dates in mlb_game_response")
      return
    print(f'This is the response from MLB: {mlb_game_response}')
    print(f"Abstract Game State is {mlb_game_response['dates'][last_date]['games'][0]['status']['abstractGameState']}")
    if (mlb_game_response['dates'][last_date]['games'][0]['status']['abstractGameState'] != 'Final'):
      print("Game isn't final yet")
      return
    else:
      print("Game state is final!")
      patch_game_on_backend(mlb_game_response, last_date)
  else:
    print("Request to the MLB API failed!", mlb_game_response.status_code)
    print('Response Content:', postResponse.text)
    print("\n" *5)
      



## Patching our unresolved game on the backend so we never have to ask MLB for the same game info again
def patch_game_on_backend(mlb_game_response, last_date):
  GameWinner = None
  GameLoser = None
  game_id = mlb_game_response['dates'][last_date]['games'][0]['gamePk']
  game_season = mlb_game_response['dates'][last_date]['games'][0]['season']
  game_type = mlb_game_response['dates'][last_date]['games'][0]['gameType']
  game_day_night = mlb_game_response['dates'][last_date]['games'][0]['dayNight']

  print(f"here's mlb_game_response {mlb_game_response}")
  print("\n" * 2)
  ## Check if the game has a winner isWinner is only sent if there's a winner (some ties happen in spring etc)
  away_winner = mlb_game_response['dates'][last_date]['games'][0]['teams']['away']
  home_winner = mlb_game_response['dates'][last_date]['games'][0]['teams']['home']

  if away_winner.get('isWinner') is True or home_winner.get('isWinner') is True:
    print("the final game has a winner")
    if mlb_game_response['dates'][last_date]['games'][0]['teams']['away']["isWinner" ] == True:
      GameWinner = mlb_game_response['dates'][last_date]['games'][0]['teams']['away']['team']['id']
      GameLoser =  mlb_game_response['dates'][last_date]['games'][0]['teams']['home']['team']['id']
    else:
      GameWinner = mlb_game_response['dates'][last_date]['games'][0]['teams']['home']['team']['id']
      GameLoser =  mlb_game_response['dates'][last_date]['games'][0]['teams']['away']['team']['id']
      
    game = {'gamePk': game_id, 'gameWinner_id': GameWinner, 'gameDayNight': game_day_night, 'gameSeason': game_season, 'gameType':game_type, 'gameLoser_id': GameLoser, 'gameResolved': True}
    postResponse = requests.patch(f'{base_url}/api/games/{str(game_id)}', json=game)
    if postResponse.status_code == 200:
      print('Success patch of game on backend', postResponse.status_code)
      print("\n" *5)
    else:
      print('Error patching game on backend:', postResponse.status_code)
      print('Response Content:', postResponse.text)
      print("\n" *5)
  else:
    print(f"Rare tied game that is final but without a winner {mlb_game_response}")
    game ={'gamePk': game_id, 'stale_game_flag': True, 'gameResolved': True}
    postResponse = requests.patch(f'{base_url}/api/games/{str(game_id)}', json=game)
    if postResponse.status_code == 200:
      print("Success: Patching of rare final game with no winner", postResponse.status_code)
      print("\n" * 5)
    else:
      print("Error: Patching of rare final game with no winner", postResponse.status_code)
      print("Response content:", postResponse.text)
      print("\n" * 5)


## I've decided games will only be patched from the backend game data for now, one function should be grading all predictions
def patch_user_prediction(prediction, backend_game_data):
  if backend_game_data['gameWinner_id'] is None:
    print("Handling stale prediction")
    stale_prediction_id = prediction['id']
    stale_patched_prediction = {
      "isStale" : True,
      "isResolved" :True
    }
    stale_prediction_patch_response = requests.patch(f'{base_url}/api/predictions/{str(stale_prediction_id)}',
                                                     json=stale_patched_prediction)
    if stale_prediction_patch_response.status_code==200:
      print("Success: Stale prediction patched")
      print("\n" * 2)
    else:
      print("Error: patching stale prediction", stale_prediction_patch_response.status_code)
      print("Response Content:", stale_prediction_patch_response.text)
      print("\n" *5)


  else:
    prediction_id = prediction['id']
    user_id = prediction['user']['id']
    prediction_actual_Winner_Id = backend_game_data['gameWinner_id']
    prediction_actual_Loser_Id = backend_game_data['gameWinner_id']
    
    patched_prediction = {
    "actualWinnerId": prediction_actual_Winner_Id,
    "actualLoserId":  prediction_actual_Loser_Id,
    "isResolved": True
    } 
    
    prediction_patch_response = requests.patch(f'{base_url}/api/predictions/{str(prediction_id)}',
                                               json=patched_prediction
                                               )
    
    if prediction_patch_response.status_code==200:
      print("Success, prediction patched", prediction_patch_response.status_code)
      print("\n" * 2 )
      print("Starting cache work")
      if (prediction['predictedWinnerId'] == prediction_actual_Winner_Id):
        users_cache[user_id]["totalGuessesCorrect"] += 1
        users_cache[user_id]["totalScore"] += 10
        users_cache[user_id]["currentStreak"] += 1
      else:
        users_cache[user_id]["totalGuessesIncorrect"] += 1
        users_cache[user_id]["totalScore"] -= 10
        users_cache[user_id]["currentStreak"] =0
        ## handling streaks
      if(users_cache[user_id]["currentStreak"] > users_cache[user_id]["longestStreak"]):
        print(f'Current Streak is: {users_cache[user_id]["currentStreak"]} and longest streak is {users_cache[user_id]["longestStreak"]}')
        print("users current steak was longer than longeststreak")
        users_cache[user_id]["longestStreak"] = users_cache[user_id]["currentStreak"]
      elif (users_cache[user_id]["currentStreak"] == users_cache[user_id]["longestStreak"]):
        print(f'Current Streak is: {users_cache[user_id]["currentStreak"]} and longest streak is {users_cache[user_id]["longestStreak"]}')
        print("Current and longest were equal")
      else:
        print(f'Current Streak is: {users_cache[user_id]["currentStreak"]} and longest streak is {users_cache[user_id]["longestStreak"]}')
        print("users longest streak was greater than current streak")
    else:
      print("Error patching game on backend", prediction_patch_response.status_code)
      print("Response Content:", prediction_patch_response.text)
      print("\n" *5)




def patch_user_info():
    max_retry_limit = 3
    retry_delay_seconds = 5
    attempts = 0

    formatted_user_data = list(users_cache.values())
    print("this is the formatted user data", formatted_user_data)
    print("\n" * 5)


    while attempts < max_retry_limit:
        try:
            batch_user_update_response = requests.patch(f'{base_url}/api/batch_update_users',json=formatted_user_data)

            if batch_user_update_response.status_code == 200:
                print("Success, all users patched", batch_user_update_response.status_code)
                print("\n" * 5)
                break  # The update worked, exit the while loop

            print("Error patching users on backend", batch_user_update_response.status_code)
            print("Response Content:", batch_user_update_response.text)
            print("\n" * 5)
        except Exception as e:
            print(f"Exception during patch attempt (Attempt {attempts + 1}):", str(e))

        attempts += 1

        if attempts < max_retry_limit:
            # delay before trying again
            time.sleep(retry_delay_seconds)
            print(f"Retrying in {retry_delay_seconds} seconds... \n")

    if attempts == max_retry_limit:
        print("Max retries reached. Failed to patch users")
        print("\n" * 10)

  


  




asyncio.run(handle_unresolved_predictions_pool())




