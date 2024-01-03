import requests
import asyncio

users_streak_cache = {}

## Fetch all unresolved predictions
async def handle_unresolved_predictions_pool():
  try:
     response = requests.get('http://localhost:5555/api/predictionsNotResolved')

     if response.status_code ==200:
      data = response.json() 
      check_for_winners_contamination(data)
     else:
      print(f"Error: {response.status_code} - {response.text}")

  except requests.RequestException as e:
    print(f"Request failed: {e}")



def check_for_winners_contamination(data):
  print(f"Successfully called CFW")
  for prediction in data:
    ## building out streak cache 
    if prediction['user']['id'] in users_streak_cache:
      print("had this user")
    else:
      print("didn't have this user")
      users_streak_cache[prediction['user']['id']] = prediction['user']['currentStreak']
    ## checking for ActualWinnerData contamination don't know if this is needed but flask sqlAlchemy has done some weird stuff so -_(0-0)_-
    if (prediction['actualWinnerId'] != None):
      print("You should have never gotten here big problem")
      print("\n" * 20 )
    else:
      handle_winner_not_known(prediction)


def handle_winner_not_known(prediction):

  game_id = prediction['game_Id']
  game_response = requests.get(f'http://localhost:5555/api/games/{str(game_id)}')

  if  game_response.status_code == 200:
    print("Game entry was on backend")
    backend_game_data = game_response.json()
    print(f'Server Game Data: {backend_game_data}')
    if (backend_game_data['gameResolved']== False):
      call_mlb_patch_prediction(prediction, game_id, backend_game_data)
    else:
      print("backend game isResolved")
      patch_user_prediction(prediciton, backend_game_data)


  else:
    print("Game wasn't in database")
    print("\n" * 10)
    # call_mlb_patch_prediction(prediction, game_id)
    # print(users_streak_cache)
 

def call_mlb_patch_prediction(prediction, game_id, backend_game_data=None):
  print("In: call_mlb_patch_prediction")

  mlb_Data = requests.get(f'https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk={str(game_id)}')

  if mlb_Data.status_code ==200:
    mlb_game_response = mlb_Data.json()

    last_date = len(mlb_game_response.get('dates')) -1

    # print(f'This is the response from MLB: {mlb_game_response}')
    print(f"Abstract Game State is {mlb_game_response['dates'][last_date]['games'][0]['status']['abstractGameState']}")
    if (mlb_game_response['dates'][last_date]['games'][0]['status']['abstractGameState'] != 'Final'):
      print("Game isn't final yet")
      return
    else:
      print("Game has a winner!")
      patch_game_on_backend(mlb_game_response, last_date)
      




def patch_game_on_backend(mlb_game_response, last_date):
  GameWinner = None
  GameLoser = None
  game_id = mlb_game_response['dates'][last_date]['games'][0]['gamePk']

  if mlb_game_response['dates'][last_date]['games'][0]['teams']['away']["isWinner" ] == True:
    GameWinner = mlb_game_response['dates'][last_date]['games'][0]['teams']['away']['team']['id']
    GameLoser =  mlb_game_response['dates'][last_date]['games'][0]['teams']['home']['team']['id']
  else:
    GameWinner = mlb_game_response['dates'][last_date]['games'][0]['teams']['home']['team']['id']
    GameLoser =  mlb_game_response['dates'][last_date]['games'][0]['teams']['away']['team']['id']


  game = {'gamePk': game_id, 'gameWinner_id': GameWinner, 'gameLoser_id': GameLoser, 'gameResolved': True}

  postResponse = requests.patch(f'http://localhost:5555/api/games/{str(game_id)}', json=game)

  if postResponse.status_code == 200:
    print('Success patch of game on backend', postResponse.status_code)
    print("\n" *5)
  else:
    print('Error patching game on backend:', postResponse.status_code)
    print('Response Content:', postResponse.text)
    print("\n" *5)



# def patch_user_prediction(prediciton, backend_game_data):

#   PredictionactualWinnerId = backend_game_data['gameWinner_id']
#   PredictionactualLoserId = backend_game_data['gameWinner_id']

#   patched_predictions = {"actualWinnerId": PredictionactualWinnerId, "actualLoserId": PredictionactualLoserId, "isResolved": True} 


#   """ 
#   if (prediction['predictedWinnerId'] == backend_game_data['gameWinner_id']):
#     users_streak_cache[prediction['user']['id']] + 1
#   else:
#     users_streak_cache[prediction['user']['id']] = 0
#   """



#     prediction_patch_response = requests.patch(f'http://localhost:5555/api/predictions/{}')



asyncio.run(handle_unresolved_predictions_pool())


## Remember to update user feilds longest Streak, Currentstreak total guesses correct
##totalguessedincorrect total score etc