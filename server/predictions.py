import requests
import asyncio

users_cache = {}


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
    if prediction['user']['id'] in users_cache:
      print("had this user")
    else:
      print("didn't have this user")
      users_cache[prediction['user']['id']] = prediction['user']
    ## checking for ActualWinnerData contamination don't know if this is needed but flask sqlAlchemy has done some weird stuff so -_(0-0)_-
    # print(users_cache)
    # print("\n" *10)
    if (prediction['actualWinnerId'] != None):
      print("You should have never gotten here big problem")
      print("\n" * 20 )
    else:
      handle_winner_not_known(prediction)
  print("after all the predictions were processed")
  #patch_user_info


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
      patch_user_prediction(prediction, backend_game_data)

  else:
    print("Game wasn't in database, this shouldn't be possible")
    print("\n" * 10)


"""
  Attempts to resolve backend game by calling the MLB API and checking if the game has been offically scored
"""
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






def patch_user_prediction(prediction, backend_game_data):
  prediction_actual_Winner_Id = backend_game_data['gameWinner_id']
  prediction_actual_Loser_Id = backend_game_data['gameWinner_id']
  prediction_id = prediction['id']
  user_id = prediction['user']['id']


  # patched_prediction = {
  #   "actualWinnerId": prediction_actual_Winner_Id,
  #   "actualLoserId":  prediction_actual_Loser_Id,
  #   "isResolved": True
  # } 

  # prediction_patch_response = requests.patch(f'http://localhost:5555/api/predictions/{str(prediction_id)}',
  # json=patched_prediction
  # )

  # if prediction_patch_response.status_code==200:
  #   print("Success, prediction patched", prediction_patch_response.status_code)
  #   print("\n" * 5 )

  # else:
  #   print("Error patching game on backend", prediction_patch_response.status_code)
  #   print("Response Content:", postResponse.text)
  #   print("\n" *5)

  # Both Comparators are int's
  if (prediction['predictedWinnerId'] == prediction_actual_Winner_Id):
    users_cache[user_id]["totalGuessesCorrect"] += 1
    users_cache[user_id]["totalScore"] += 10
    users_cache[user_id]["currentStreak"] += 1
  else:
    users_cache[user_id]["totalGuessesIncorrect"] += 1
    users_cache[user_id]["totalScore"] -= 10
    users_cache[user_id]["currentStreak"] =0



  if(users_cache[user_id]["currentStreak"] > users_cache[user_id]["longestStreak"]):
    print(f'Current Streak is: {users_cache[user_id]["currentStreak"]} and longest streak is {users_cache[user_id]["longestStreak"]}')
    print("users current steak was longer than longeststreak")
  
  elif (users_cache[user_id]["currentStreak"] == users_cache[user_id]["longestStreak"]):
    print(f'Current Streak is: {users_cache[user_id]["currentStreak"]} and longest streak is {users_cache[user_id]["longestStreak"]}')
    print("Current and longest were equal")
    ## something something
  else:
    print(f'Current Streak is: {users_cache[user_id]["currentStreak"]} and longest streak is {users_cache[user_id]["longestStreak"]}')
    print("users longest streak was greater than current streak")
  
  patch_user_info()



  """ 
  users_cache
  if (prediction['predictedWinnerId'] == backend_game_data['gameWinner_id']):
    users_streak_cache[prediction['user']['id']] + 1
  else:
    users_streak_cache[prediction['user']['id']] = 0
  """




# ['user']["totalGuessesCorrect"] + 1


def patch_user_info():
  for key in users_cache:
    print("\n" *10)
    print(f"This is the user being handled {users_cache[key]}")
  #   user_patch_response = requests.patch(f"http://localhost:5555/api/users/{str(user)}")
  #   /api/users/<int:id>


  #     prediction_patch_response = requests.patch(f'http://localhost:5555/api/predictions/{str(prediction_id)}',
  # json=patched_prediction
  # )

  # if prediction_patch_response.status_code==200:
  #   print("Success, prediction patched", prediction_patch_response.status_code)
  #   print("\n" * 5 )

  # else:
  #   print("Error patching game on backend", prediction_patch_response.status_code)
  #   print("Response Content:", postResponse.text)
  #   print("\n" *5)

  """
  /api/users/<int:id>

  totalScore
        ##users_streak_cache[prediction['user']['id']] = prediction['user']['currentStreak']

  totalGuessesCorrect
  totalGuessesIncorrect
  currentStreak
  longestStreak
  """





asyncio.run(handle_unresolved_predictions_pool())


## Remember to update user feilds longest Streak, Currentstreak total guesses correct
##totalguessedincorrect total score etc


## build out better user cache nested dicts? 





## Game resolved on backend should be the single source of truth? 