from config import app, db
from flask import request, make_response, jsonify, session, send_from_directory
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from models import User, User_Prediction, Game, Player
from sqlalchemy import func
import os
import schedule
import time
import subprocess
import threading

    
CORS(app)
## Code for shutting down app routes I use to use.
# # import pdb
# excluded_endpoints = ['/', 'signup', 'check_session', 'login', 'logout']
# @app.before_request ##hook that fires to check cookie
# def check_is_logged_in():
#     if request.endpoint not in excluded_endpoints:
#         user_id = session.get('user_id')
#         user = User.query.filter(User.id == user_id).first()

#         if not user:
#             return render_template("index.html")
#             ##return {'error': 'User is not logged in'}, 401
#             ##+redirect(url_for('login')



## Base route
@app.route('/')
def serve():
    return send_from_directory('../client/dist', 'index.html')
## Catch-all route
@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory('../client/dist', path)

@app.post('/api/signup')
def signup():
    # get json from request
    data = request.get_json()

    try:
        # create new user using json data
        new_user = User(
            username=data['username'],
            email=data['email'],
            # TODO for eventual signup flow
            # profilePic=data['profilePic'], 
            totalScore=0,
            totalGuessesCorrect=0,
            totalGuessesIncorrect=0,
            currentStreak=0,
            longestStreak=0,
        )
        new_user.password_hash = data['password']
        #add user to db
        db.session.add(new_user)
        db.session.commit()
    except ValueError as e:
        print("this is the error received in app.py")
        print(e)
        return {"Error": f'ValueError: {str(e)}'}, 422
    
    except Exception as e:
        print(e)
        return {'error': f'Error creating user: {str(e)}'}, 422

    #add user_id cookie
    session['user_id'] = new_user.id

    #return user as JSON
    return new_user.to_dict(), 201

@app.get('/api/check_session')
def check_session():
    if 'user_id' not in session:
        return make_response(jsonify({"error": "No user is currently signed in"}), 401)

    # get user_id from browser cookies
    user_id = session.get('user_id')

    # check for user in db
    user = User.query.get(session['user_id'])

    if not user:
        session.pop('user_id', None)
        return make_response(jsonify({'ERROR': 'User not found in database'}), 401)
    
    # user exists
    try:
        user_dict = user.to_dict()
        return jsonify(user_dict), 200
    except Exception as e:
        print(f"Error in to_dict(): {e}")
        return make_response(jsonify({'error': str(e)}), 500)

## Login
@app.post('/api/login')
def login():
    data = request.get_json()
    # query db by username
    user = User.query.filter(
        User.username == data['username']
    ).first()
    
    if not user or not user.authenticate(data['password']):
        # user doesn't exist or password doesn't match, return 401
        return make_response(jsonify({'error': 'Login failed'}), 401)
    
    # login success, add cookie to browser
    session['user_id'] = user.id
    return jsonify(user.to_dict()),200

## Logout
@app.delete('/api/logout')
def logout():
    # check if user_id cookie is set
    user_id = session.get('user_id')

    if not user_id:
        # no cookie is set, return 401
        return {'error': 'User is not logged in'}, 401
    
    # delete the cookie
    session.pop('user_id')
    # return 204 (no content)
    return {}, 204


## fetch all the users
@app.get('/api/users')
def get_all_users():
    users = User.query.with_entities(User.id, User.username).all()
    data = []

    for user in users:
        user_dict ={
            'id': user.id, 
            'username': user.username
        }
        data.append(user_dict)

    return make_response(
        jsonify(data),
        200
    )

## fetch a specific user
@app.get('/api/users/<int:id>')
def get_user_by_id(id):
    user = User.query.filter(
        User.id == id
    ).first()

    if not user:
        return make_response(
            jsonify({"error": "User not found"}),
            404
        )
    return user.to_dict(), 200

## patch a specific user
@app.patch('/api/users/<int:id>')
def patch_user_by_id(id):
    user = User.query.filter(
        User.id == id
    ).first()

    if not user:
        return make_response(
            jsonify({"error": 'User not found to patch'}),
            404
        )
    
    data = request.get_json()

    for field in data:
        if hasattr(User, field):
            setattr(user, field, data[field])
        else:
            print(f"Patch data did not have field {field}")

    db.session.add(user)
    db.session.commit()

    return make_response(
        jsonify(user.to_dict()),
        200
    )


## batch_update users for prediction grading
@app.patch('/api/batch_update_users')
def batch_update_users():
    try:
        db.session.begin()

        data = request.get_json()
        print("this is the data recieved", data)
        print("\n" * 5)



        print("here is the request method", request.method)
        print("here is the request headers", request.headers)
        print("\n" * 5)


        for user_update in data:
            print("this is user_update", user_update)
            print("\n" * 5)

            user_id = user_update.get('id')
            user = User.query.filter(
                User.id == user_id
            ).first()
            print("this is the user we found", user)
            print("\n" * 5)

            if user:
                for field, value in user_update.items():
                    if hasattr(User, field):
                        setattr(user, field, value)
                    else:
                        print(f"Patch data for user {user_id} did not have field {field}")

        # Commit the transaction if all updates are successful
        db.session.commit()

        return make_response(
            jsonify({"message": "Batch update successful"}),
            200
        )

    except Exception as e:
        # Rolling back the transaction if there's an error
        db.session.rollback()
        print("Error during batch update:", str(e))

        return make_response(
            jsonify({"error": "Batch update failed"}),
            500
        )

    finally:
        db.session.close()


@app.post('/api/players')
def post_player():
    data = request.get_json()
    try:
        new_player = Player(
            age = data['age'],
            currentTeamId =data['currentTeamId'],
            firstLastName =data['firstLastName'],
            mlbId = data['MLBAMID']

        )
        db.session.add(new_player)
        db.session.commit()
    except Exception as e:
        print(e)
        return{'error': f'Error creating Player: {str(e)}'},422
    return new_player.to_dict(), 201



## fetch all players
@app.get('/api/players')
def get_all_Players():
    players = Player.query.all()
    data = [p.to_dict() for p in players]

    return make_response(
        jsonify(data),
        200
        )

## fetch a specific player    
@app.get('/api/players/<int:MLBAMID>')
def get_player_by_id(MLBAMID):
    player = Player.query.filter(
        Player.MLBAMID == MLBAMID
    ).first()

    if not player:
        return make_response(
            jsonify({'error': 'player not found'}),
            404
        )
    
    return make_response(
        jsonify(player.to_dict()),
        200
    )


## Route to serve team logos not on the api, college etc and fallback if api fails
LOGO_IMAGE_DIR = os.path.join(os.path.dirname(__file__), 'images')
@app.route('/api/<image_folder>/<filename>')
def serve_backend_image(image_folder, filename):
    try:
        file_path = os.path.join(LOGO_IMAGE_DIR, image_folder)

        if not os.path.exists(file_path):
            return make_response(
                jsonify({"Error": "This path did not exist in the folder"}),
                404
            )
        return send_from_directory(file_path, filename)
    
    except Exception as e:
        print(e)
        return make_response(jsonify({"Error": "something went wrong fetching the logo"}),404)




## post a prediction to the database
@app.post('/api/predictions')
def postPredicitons():
    data = request.get_json()
    try:
        new_prediction =  User_Prediction(
            game_Id = data['game_Id'],
            user_Id =data['user_Id'],
            predictedWinnerId =data['predictedWinnerId'],
            predictedLoserId = data['predictedLoserId'],
            isResolved = False
        )

        existing_prediction = User_Prediction.query.filter_by(
            game_Id=new_prediction.game_Id, user_Id=new_prediction.user_Id
        ).first()

        if existing_prediction:
            return make_response(
                jsonify({'ERROR': "You have already made a prediction on this game"}),
                400
            )

        db.session.add(new_prediction)
        db.session.commit()

    except Exception as e:
        print(e)
        return {'error': f'Error creating Prediction: {str(e)}'}, 422

    # return user as JSON, status code 201
    return new_prediction.to_dict(), 201

@app.get('/api/predictionsNotResolved')
def get_all_not_resolved_predictions():
    un_Predictions = User_Prediction.query.filter(
        User_Prediction.isResolved == False,
        User_Prediction.isStale == False
    )

    data = [u.to_dict() for u in un_Predictions]

    if not data:
        print("There were no unresolved predictions found")
        return make_response("Nothing Found", 204)

    return make_response(
        jsonify(data),
        200
    )




@app.get('/api/predictions')
def get_all_Predicitons():
    predictions = User_Prediction.query.all()
    data = [p.to_dict() for p in predictions]

    return make_response(
        jsonify(data),
        200
        )



@app.get('/api/predictions/<int:id>')
def get_prediction_by_id(id):
    prediction = User_Prediction.query.filter(
        User_Prediction.id == id
    ).first()

    if not prediction:
        return make_response(
            jsonify({'error': 'prediction not found'}),
            404
        )
    
    return make_response(
        jsonify(prediction.to_dict()),
        200
    )


@app.patch('/api/predictions/<int:id>')
def patch_prediction_by_id(id):
    try:
        prediction = User_Prediction.query.filter(
            User_Prediction.id == id
        ).first()
        
        if not prediction:
            return make_response(
                jsonify({"error": 'prediction not found to patch'}),
                404
            )
        
        data = request.get_json()

        if not data:
            return make_response(
                jsonify({"Error": "Invalid or missing incoming JSON data"}),
                400
            )
        
        for field in data:
            setattr(prediction, field, data[field])
        
        db.session.add(prediction)
        db.session.commit()
        
        return make_response(
            jsonify(prediction.to_dict()),
            200
        )
    except Exception as e:
        return make_response(
            jsonify({"Error": "Internal Server Error"}),
            500
        )


@app.post('/api/games/<int:gamePk>')
def post_Games_by_Pk(gamePk):
    data = request.get_json()
    print(f'the initial data received is: {data}')
    required_fields = ['gamePk', 'gameType', 'gameSeason', 'gameDayNight', 'away_team_id', 'home_team_id', 'venue']
    for field in required_fields:
        if field not in data:
            raise KeyError(f"Missing field: {field}")

    try:
        game_data = {
            'gamePk': data['gamePk'],
            "game_sport_id": data["game_sport_id"],
            'gameType' : data['gameType'],
            'gameSeason' : data['gameSeason'],
            'gameDayNight': data['gameDayNight'],
            'venue': data['venue'],
            'away_team_id': data['away_team_id'],
            'home_team_id': data['home_team_id']
        }

        if 'gameWinner_id' in data:
            game_data['gameWinner_id'] = data['gameWinner_id']

        if 'gameLoser_id' in data:
            game_data['gameLoser_id'] = data['gameLoser_id']
        

        ## "**" is the dictionary unpacking operator lol not power math
        new_game =  Game(**game_data)
        print("new_game is")
        print(new_game)
        db.session.add(new_game)
        db.session.commit()
    except IntegrityError as e:
        print(f"Database integrity error: {e}")
        if 'violates unique constraint' in str(e) or 'duplicate key value' in str(e):
            return {"Error" : f'Game with gamePk {data.get("gamePk" "N/A")} already exists.'}, 409
        elif 'violates not-null constraint' in str(e):
            return {"Error" : f"Missing required data for game creation: {str(e)}"}, 400
        else:
            return {"Error": f'Database integrity error? maybe: {str(e)}'}, 500
    
    except KeyError as e:
        print(f"Missing key in data: {e}")
        return {"error": f'Missing required field: {str(e)}'}, 400

    except Exception as e:
        print(e)
        return {'error': f'Error creating Game: {str(e)}'}, 422

    # return user as JSON, status code 201
    return new_game.to_dict(), 201


@app.get('/api/games')
def get_all_games():

    theGameData = Game.query.all()
    print("got here too")
    outPut = [ga.to_dict() for ga in theGameData]

    return make_response(
        jsonify(outPut),
        200
    )

@app.get('/api/games/<int:gamePk>')
def get_game_by_id(gamePk):
    game = Game.query.filter(
        Game.gamePk == gamePk
    ).first()

    if not game:
        return make_response(
            jsonify({'error': 'game not found'}),
            404
        )
    
    return make_response(
        jsonify(game.to_dict()),
        200
    )

@app.patch('/api/games/<int:gamePk>')
def patch_game_by_gamePk(gamePk):
    try:
        game = Game.query.filter(
            Game.gamePk == gamePk
        ).first()
            
        if not game:
            return make_response(
                jsonify({"error": 'Game not found to patch'}),
                404
            )

        data = request.get_json()

        if not data:
            return make_response(
                jsonify({"Error": "Invalid or missing JSON data"}),
                400
            )
        
        for field in data:
            setattr(game, field, data[field])
            
        db.session.add(game)
        db.session.commit()
        
        return make_response(
            jsonify(game.to_dict()),
            200
        )
            
    except Exception as e:
        return make_response(
            jsonify({"Error": "Internal Server Error"}),
            500
        )






@app.get('/api/leaderboard')
def get_leaders():
    try:
        leaderboard_users = User.query.filter(User.totalNumGuesses >= 1).all()

        if not leaderboard_users:
            return make_response(
                jsonify({"Error": "couldn't make leaderboard"}),
                500
            )

        leaderboard_user_list = [
            {
            'username' : user.username,
            'totalScore': user.totalScore,
            'totalNumGuesses': user.totalNumGuesses,
            'totalGuessesCorrect': user.totalGuessesCorrect,
            'totalGuessesIncorrect': user.totalGuessesIncorrect,
            'currentStreak': user.currentStreak,
            'longestStreak': user.longestStreak,
            'profilePic' : user.profilePic
            }
            for user in leaderboard_users
        ]

        return make_response(
            jsonify(leaderboard_user_list),
            200
        )

    except Exception as e:
        # Failed to get leaderboard?
        print("Error making leaderboard on backend:", str(e))
        return make_response(
            jsonify({"error": "Leaderboard failed"}),
            500
        )



# Run predictions.py using subprocess and a separate thread
def run_predictions():
    print("Running predictions.py")
    subprocess.run(["python", "./predictions.py"])

def run_grounds_crew():
    print("Running grounds_crew.py")
    subprocess.run(["python", "./grounds_crew.py"])



def job_scheduler():
    while True:
        # print("Checking schedule")
        schedule.run_pending()
        time.sleep(1)
        
## Run grounds_crew.py at midnight 12:00 AM, 12:10AM, 8:00 AM, 4:00 PM
schedule.every().day.at("00:00", tz="US/Eastern").do(run_grounds_crew)
schedule.every().day.at("00:10", tz="US/Eastern").do(run_grounds_crew)
schedule.every().day.at("08:00", tz="US/Eastern").do(run_grounds_crew) 
schedule.every().day.at("16:00", tz="US/Eastern").do(run_grounds_crew) 
## Run predictions.py at (12:02 AM, 12:04 AM, 5:00 PM, 5:02 PM) 
schedule.every().day.at("00:02", tz="US/Eastern").do(run_predictions)
schedule.every().day.at("00:04", tz="US/Eastern").do(run_predictions)
schedule.every().day.at("17:00", tz="US/Eastern").do(run_predictions)
schedule.every().day.at("17:02", tz="US/Eastern").do(run_predictions)


## will exit when the program exits
scheduler_thread = threading.Thread(target=job_scheduler,name="SchedulerThread", daemon=True)

## running the thread
scheduler_thread.start()


## returning index.html to enable dynamic routing to work on refresh
@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()