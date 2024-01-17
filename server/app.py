from config import app, db
from flask import request, make_response, jsonify, session, render_template
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from models import User, User_Prediction, Game, Player
from sqlalchemy import func


    
CORS(app)

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



# @app.route('/')
# @app.route('/<int:id>')
# def index(id=0):
#     return render_template("index.html")

# # returning index.html to enable dynamic routing to work on refresh
# @app.errorhandler(404)   
# def not_found(e):   
#   return app.send_static_file('index.html')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")



@app.post('/signup')
def signup():
    # get json from request
    data = request.get_json()

    try:
        # create new user using json data
        new_user = User(
            username=data['username'],
            email=data['email'],
            # profilePic=data['profilePic'],
            totalScore=0,
            totalGuessesCorrect=0,
            totalGuessesIncorrect=0,
            currentStreak=0,
            longestStreak=0,
        )
        new_user.password_hash = data['password']
        # add user to db
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(e)
        return {'error': f'Error creating user: {str(e)}'}, 422

    # add user_id cookie
    session['user_id'] = new_user.id

    # return user as JSON, status code 201
    return new_user.to_dict(), 201

@app.get('/check_session')
def check_session():
    # get user_id from browser cookies
    user_id = session.get('user_id')
    # check for user in db
    user = User.query.filter(User.id == user_id).first()

    if not user:
        # user doesn't exist, return 401 (unauthorized)
        # return {'error': 'Unauthorized'}, 401
        return
    
    # user exists
    return user.to_dict(), 200

@app.post('/login')
def login():
    data = request.get_json()
    # query db by username
    user = User.query.filter(
        User.username == data['username']
    ).first()
    
    if not user or not user.authenticate(data['password']):
        # user doesn't exist or password doesn't match, return 401
        return make_response(jsonify({'error': 'Login failed'}), 401)
    
    # login success, add cookie to broswer
    session['user_id'] = user.id
    return jsonify(user.to_dict()),200

@app.delete('/logout')
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



@app.get('/users')
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


@app.get('/users/<int:id>')
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
        # Rollingback the transaction if there's an error
        db.session.rollback()
        print("Error during batch update:", str(e))

        return make_response(
            jsonify({"error": "Batch update failed"}),
            500
        )

    finally:
        db.session.close()

@app.post('/players')
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




@app.get('/players')
def get_all_Players():
    players = Player.query.all()
    data = [p.to_dict() for p in players]

    return make_response(
        jsonify(data),
        200
        )
    
@app.get('/players/<int:MLBAMID>')
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



@app.post('/predictions')
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
        User_Prediction.isResolved == False
    )

    data = [u.to_dict() for u in un_Predictions]

    if not data:
        return make_response("Nothing Found", 204)

    return make_response(
        jsonify(data),
        200
    )




@app.get('/predictions')
def get_all_Predicitons():
    predictions = User_Prediction.query.all()
    data = [p.to_dict() for p in predictions]

    return make_response(
        jsonify(data),
        200
        )



@app.get('/predictions/<int:id>')
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
    try:
        new_game =  Game(
            gamePk = data['gamePk'],
            gameWinner_id = data['gameWinner_id'],
            gameLoser_id =data['gameLoser_id']
        )
        db.session.add(new_game)
        db.session.commit()

    except Exception as e:
        print(e)
        return {'error': f'Error creating Game: {str(e)}'}, 422

    # return user as JSON, status code 201
    return new_game.to_dict(), 201



@app.get('/games')
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






if __name__ == '__main__':
    app.run()