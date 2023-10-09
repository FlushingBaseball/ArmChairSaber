
from flask import request, make_response, jsonify, session, Flask, render_template
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
# from models import User, User_Prediction, Game, Player
from server.models import User, User_Prediction, Game, Player

from sqlalchemy import func

from server.config import app, db
CORS(app)

# import pdb
excluded_endpoints = ['/', 'signup', 'check_session', 'login', 'logout']



@app.before_request ##hook that fires to check cookie
def check_is_logged_in():
    if request.endpoint not in excluded_endpoints:
        user_id = session.get('user_id')
        user = User.query.filter(User.id == user_id).first()

        if not user:
            return {'error': 'User is not logged in'}, 401



@app.route('/')
@app.route('/<int:id>')
def index(id=0):
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
        return {'error': 'Unauthorized'}, 401
    
    # user exists, return user as JSON, status code 200
    return user.to_dict(), 200

@app.post('/login')
def login():
    # get JSON from request
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




@app.patch('/users/<int:id>')
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
        setattr(user, field, data[field])

    db.session.add(user)
    db.session.commit()

    return make_response(
        jsonify(user.to_dict()),
        200
    )



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

@app.get('/predictionsNotResolved')
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


@app.get('/nextUnresolvedPrediction')
def get_single_unresolved_prediction():
    un_res_prediction = User_Prediction.query.filter(
        User_Prediction.isResolved == False
    ).first()

    if not un_res_prediction:
        return make_response(
            jsonify({'error': 'Unresolved Predictions not found'}),
            404
        )
    
    return make_response(
        jsonify(un_res_prediction.to_dict()),
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


@app.patch('/predictions/<int:id>')
def patch_prediction_by_id(id):
    prediciton = User_Prediction.query.filter(
        User_Prediction.id == id
    ).first()

    if not prediciton:
        return make_response(
            jsonify({"error": 'Predition not found to patch'}),
            404
        )
    
    data = request.get_json()

    for field in data:
        setattr(prediciton, field, data[field])

    db.session.add(prediciton)
    db.session.commit()

    return make_response(
        jsonify(prediciton.to_dict()),
        200
    )

























# @app.post('/games')
# def postGames():
#     data = request.get_json()
#     try:
#         new_game =  Game(
#             gamePk = data['gamePk'],
#             gameWinner_id = data['gameWinner_id'],
#             gameLoser_id =data['gameLoser_id']
#         )
#         db.session.add(new_game)
#         db.session.commit()

#     except Exception as e:
#         print(e)
#         return {'error': f'Error creating Game: {str(e)}'}, 422

#     # return user as JSON, status code 201
#     return new_game.to_dict(), 201



@app.post('/games/<int:gamePk>')
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

@app.get('/games/<int:gamePk>')
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


@app.patch('/games/<int:gamePk>')
def patch_game_by_gamePk(gamePk):
    game = Game.query.filter(
        Game.gamePk == gamePk
    ).first()

    if not game:
        return make_response(
            jsonify({"error": 'Game not found to patch'}),
            404
        )
    
    data = request.get_json()

    for field in data:
        setattr(vs, field, data[field])

    db.session.add(game)
    db.session.commit()

    return make_response(
        jsonify(game.to_dict()),
        200
    )









## leader board fuction 

@app.route('/leaders')
def create_leader_board():
    leaderboard = User_Prediction.query.all()
    outPut = [p.to_dict() for p in leaderboard]

    return outPut


#     for entry in sample_data:
#     username = entry["user"]["username"]
#     predicted_winner = entry["predictedWinnerId"]
#     actual_winner = entry["actualWinnerId"]
    
#     # Check if the prediction was correct
#     if username not in user_data:
#         user_data[username] = {"total_correct": 0, "total_predictions": 0}
    
#     user_data[username]["total_predictions"] += 1
    
#     if predicted_winner == actual_winner:
#         user_data[username]["total_correct"] += 1

# # Calculate the average correct predictions for each user
# average_correct_predictions = {}
# for username, data in user_data.items():
#     total_correct = data["total_correct"]
#     total_predictions = data["total_predictions"]
    
#     if total_predictions > 0:
#         average_correct = total_correct / total_predictions
#         average_correct_predictions[username] = average_correct

# print(average_correct_predictions)
#     # leaderboard = db.session.query(User_Prediction.user_Id,
#     #                                func.avg(db.case((User_Prediction.predictedWinnerId == User_Prediction.actualWinnerId, 100.0), else_=0.0)).label('average_percentage')) \
#     #     .group_by(User_Prediction.user_Id,)
#     # result = leaderboard.all()

#     # average_percentage_list = [{'user_id': user_id, 'average_percentage': avg_percentage} for user_id, avg_percentage in result]

#     # return jsonify(average_percentage_list)

















if __name__ == '__main__':
    app.run()