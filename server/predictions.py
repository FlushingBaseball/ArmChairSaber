import requests
import asyncio




users_streak_cache = {}

## Fetching all unresolved predictions
async def handle_unresolved_predictions_pool():
  try:
     response = requests.get('http://localhost:5555/api/predictionsNotResolved')

     if response.status_code ==200:
      print("response from the server")
      data = response.json() 
      print("data recieved")
      check_for_winners(data)
     else:
      print(f"Error: {response.status_code} - {response.text}")

  except requests.RequestException as e:
    print(f"Request failed: {e}")



def check_for_winners(data):
  print(f"Successfully called CFW")
  for prediction in data:
    ## building out streak cache 
    if prediction['user']['id'] in users_streak_cache:
      print("had this user")
    else:
      print("didn't have this user")
      users_streak_cache[prediction['user']['id']] = prediction['user']['currentStreak']
    ## Looping through predictions and checking for ActualWinnerData contamination 
    if (prediction['actualWinnerId'] != None):
      handleWinnerKnown(prediction)
    else:
      handle_winner_not_known(prediction)


    # /api/games/<int:gamePk

def handle_winner_not_known(prediction):

  game_id = prediction['game_Id']
  game_response = requests.get(f'http://localhost:5555/api/games/{str(game_id)}')

  if  game_response.status_code == 200: ## need to check if the game is resolved or not ,lll
  v
    print("200 from server")
    game_data = game_response.json()
    print(f'Server Game Data: {game_data}')
  else:
    print("Game wasn't in database")
    # call_mlb_patch_prediction(prediction, game_id)
    # print(users_streak_cache)
 

def call_mlb_patch_prediction(prediction, game_id):
  print("In: call_mlb_patch_prediction")

  mlb_Data = requests.get(f'https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk={str(game_id)}')

  if mlb_Data.status_code ==200:
    mlb_game_response = mlb_Data.json()
    print(f'This is the response from MLB: {mlb_game_response}')
    if (
      not mlb_game_response['dates'][0]['games'][0]['teams']['away'].get("isWinner" ) and 
      '1' in mlb_game_response["dates"] and
      not mlb_game_response['dates'][1]['games']['teams']['away'].get('isWinner')
      ):
      print("game has no winner")
      return
    else:
      print("game has a winner!")
      send_game_to_backend(mlb_game_response)
    
    
    



def send_game_to_backend(mlb_game_response):
  GameWinner = None
  GameLoser = None
  game_id = mlb_game_response['dates'][0]['games'][0]['gamePk']

  if mlb_game_response['dates'][0]['games'][0]['teams']['away']["isWinner" ] == True:
    GameWinner = mlb_game_response['dates'][0]['games'][0]['teams']['away']['team']['id']
    GameLoser =  mlb_game_response['dates'][0]['games'][0]['teams']['home']['team']['id']
  else:
    GameWinner = mlb_game_response['dates'][0]['games'][0]['teams']['home']['team']['id']
    GameLoser =  mlb_game_response['dates'][0]['games'][0]['teams']['away']['team']['id']


  game = {'gamePk': game_id, 'gameWinner_id': GameWinner, 'gameLoser_id': GameLoser, 'gameResolved': True}

  postResponse = requests.post(f'http://localhost:5555/api/games/{game_id}', json=game)

  if postResponse.status_code == 201:
    print('Success post of game to backend', postResponse.status_code)
  else:
    print('Error posting game to backend:', postResponse.status_code)
    print('Response Content:', postResponse.text)








# 2. we aren't checking the games right to see if they're on the backend and have the info? 
# 1. we have the games we need to patch them










# ## Stale fetches 
# Either I can make a dict where the key is the user id and the value is the current streak
# at inital pull. and update those values as the grading proccess evolves and at the end 
# make all those updates at once? 

# or with the grading of each prediction I can make a fetch for the user and only update 
# based on that data instead of the stale copy of user attached to a prediction. 


## for every prediction 
## check if theres actualwinner on the prediction? 
## if theres not await the response from the backend
## if the backend has the game assign actualwinner and actualloser to the prediction and grade it 
## send the patched prediction with that data to the backend

## if the backend doesnt have the game 
## fetch that game from the external api 
## assign actualWinner and actualLoser to the prediction from 
## game data we fetched, Grade the prediction and send it patched
## to the backend 


asyncio.run(handle_unresolved_predictions_pool())


