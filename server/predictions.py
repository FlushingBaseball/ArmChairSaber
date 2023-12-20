import requests
import asyncio









## requesting all unresolved Predictions
async def handle_unresolved_predictions_pool():
  try:
     response = requests.get('http://localhost:5555/api/predictionsNotResolved')

     if response.status_code ==200:
      print("response from the server")
      data = response.json() 
      print("data recieved")
      # print(f"data is now of type {type(data)}") ## List
      check_for_winners(data)

     else:
      print(f"Error: {response.status_code} - {response.text}")

  except requests.RequestException as e:
    print(f"Request failed: {e}")






def check_for_winners(data):
  print(f"Successfully called CFW")
  for prediction in data:
    print(prediction)
    if (prediction['actualWinnerId'] != None):
      handleWinnerKnown(prediction)
    else:
      print(f"Prediction actualWinnerId property is {prediction['actualWinnerId']}")
      handle_winner_not_known(prediction)


    

def handle_winner_not_known(prediction):
  game_id = prediction['game_Id']
  game_response = requests.get('http://localhost:5555/api/games/{game_id}')

  if  game_response.status_code == 200:
    print("200 from server")
    game_data = game_response.json()
    print(f'Server Game Data: {game_data}')

  else:
    print("Game Wasn't on backend")
    print(f"Error: {game_response.status_code} - {game_response.text}")
  


## for every prediction 
## check if theres actualwinner on the prediction? 
## if theres not await the response from the backend
## if the backend has the game assign actualwinner and actualloser to the predicion and grade it 
## send the patched prediction with that data to the backend

## if the backend doesnt have the game 
## fetch that game from the external api 
## assign actualWinner and actualLoser to the predicion from 
## game data we fetched, Grade the prediction and send it patched
## to the backend 


asyncio.run(handle_unresolved_predictions_pool())


