import requests
import asyncio




users_streak_cache = {}




## requesting all unresolved Predictions
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
    if prediction['user']['id'] in users_streak_cache:
      print("had this user")
    else:
      print("didn't have this user")
      users_streak_cache[prediction['user']['id']] = prediction['user']['currentStreak']

    if (prediction['actualWinnerId'] != None):
      handleWinnerKnown(prediction)
    else:
      # print(f"Prediction actualWinnerId property is {prediction['actualWinnerId']}")
      handle_winner_not_known(prediction)


    

def handle_winner_not_known(prediction):
  print("Successfully called Handle Winner Not Known")
  game_id = prediction['game_Id']
  game_response = requests.get('http://localhost:5555/api/games/{game_id}')

  if  game_response.status_code == 200:
    print("200 from server")
    game_data = game_response.json()
    # print(f'Server Game Data: {game_data}')


  else:
    print("Game Wasn't on backend")
    # print(f"Error: {game_response.status_code} - {game_response.text}")
    # call_mlb_patch_prediction(prediction, game_id)
    # call_mlb_patch_prediction(prediction, game_id)
    print(users_streak_cache)



def call_mlb_patch_prediction(prediction, game_id):
  print("Successfully called: call_mlb_patch_prediction")
  # print(f'prediction parameter {prediction} - game_id is {game_id}')
  # print(f'Type of game_id paramater {type(str(game_id))}')
  mlb_Data = requests.get(f'https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk={str(game_id)}')
  # print(f'MLB response {mlb_Data}')

  if mlb_Data.status_code ==200:
    print("200 from MLB")
    mlb_game_response = mlb_Data.json()
    print(f'This is the response from MLB: {mlb_game_response}')
    print(f'The type of the response is: {type(mlb_game_response)}')
    # if 
  
  else:
    print(f"Error: {mlb_Data.status_code} - {mlb_Data.text}")






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

