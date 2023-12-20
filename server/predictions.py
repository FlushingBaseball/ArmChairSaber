import requests
import asyncio



# def fetch_unresolved_predictions_pool():
#   response = requests.get('/api/predictionsNotResolved')
#   print(response)


async def handle_unresolved_predictions_pool():
  try:
     response = requests.get('http://localhost:5555/api/predictionsNotResolved')


     if response.status_code ==200:
      print("response from the server")
      data = response.json()
      print(data)

     else:
      print(f"Error: {response.status_code} - {response.text}")

  except requests.RequestException as e:
    print(f"Request failed: {e}")


asyncio.run(handle_unresolved_predictions_pool())

# backend_url = 'http://localhost:5555/'
# endpoint = '/api/predictionsNotResolved'
# url = f'{backend_url}{endpoint}'

# try:
#     response = requests.get(url)

#     # Check if the request was successful (status code 200)
#     if response.status_code == 200:
#         print("Response from the server:")
#         print(response.json())  # Assuming the response is in JSON format
#     else:
#         print(f"Error: {response.status_code} - {response.text}")

# except requests.RequestException as e:
#     print(f"Request failed: {e}")
