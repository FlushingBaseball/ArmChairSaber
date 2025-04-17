from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.sql import func

from config import db, bcrypt
import re

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String, nullable=False, unique=True)
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username cannot be empty")
        pattern = r"^[a-zA-Z0-9~!@#$%^&*_+-?]{1,20}$"
        if not re.match(pattern, username):
            raise ValueError("Username must only contain lowercase and capital letters, numbers, and the symbols ~!@#$%^&*_+-?, also usernames cannot be longer than 20 characters")
        return username
    
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    profilePic = db.Column(db.String, nullable=False, default=0)
    totalScore = db.Column(db.Integer, default=0)
    totalNumGuesses = db.Column(db.Integer, default=0)
    totalGuessesCorrect = db.Column(db.Integer, default=0)
    totalGuessesIncorrect = db.Column(db.Integer, default=0)
    currentStreak = db.Column(db.Integer, default=0)
    longestStreak = db.Column(db.Integer, default=0)
    User_Predictions = db.relationship('User_Prediction', backref="user")
    favorite_team = db.Column(db.Integer, nullable =True)

    ## Access level 
    access_level = db.Column(db.Integer, nullable = False, default=0)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Cannot access password hash!')
    
    @password_hash.setter
    def password_hash(self, new_pass):
        pattern = r'^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"\'<>,.?/~])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"\'<>,.?/~]{9,128}$'

        if not re.match(pattern, new_pass):
            raise ValueError("Password must be at least nine characters, with at least one number, one uppercase letter AND one symbol")

        p_hash = bcrypt.generate_password_hash(new_pass.encode('utf-8'))
        self._password_hash = p_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<User {self.username}>"

    @validates('email')
    def validate_email(self, key, email_address):
        pattern = r"^(?=.{1,254}$)(?=.{1,64}@)(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:(?:[\x20-\x21\x23-\x5B\x5D-\x7E]|\\[\x00-\x7F]))*\")@(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,63}$"
    
        if not re.match(pattern, email_address):
            raise ValueError("Failed Email structure validation")
        
        return email_address

    serialize_rules = ("-_password_hash", "-User_Predictions.user")

class Player(db.Model, SerializerMixin):
    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True)
    age =db.Column(db.Integer, nullable=False)
    currentTeamId =db.Column(db.Integer, nullable=False)
    firstLastName = db.Column(db.String, nullable=False)
    mlbId = db.Column(db.Integer, nullable=False, unique=True)

    serialize_rules = () 


class User_Prediction(db.Model, SerializerMixin):
    __tablename__ = "user_predictions"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    game_Id = db.Column(db.Integer, db.ForeignKey("games.gamePk"))
    user_Id = db.Column(db.Integer, db.ForeignKey("users.id"))
    predictedWinnerId = db.Column(db.Integer,
                                    db.CheckConstraint('predictedWinnerId > 0'),
                  nullable=False)
    actualWinnerId = db.Column(db.Integer, nullable=True)
    predictedLoserId = db.Column(db.Integer,
                        db.CheckConstraint('predictedLoserId > 0'),
                            nullable=False,
                                  default=0
                                  )
    actualLoserId = db.Column(db.Integer, nullable=True)
    isResolved = db.Column(db.Boolean, nullable = True, default = False)
    isStale = db.Column(db.Boolean, nullable = True, default = False)
 


    ##back ref user = relationship
    ##back ref game = relationship

    serialize_rules=("-game.Game_Predictions", "-user.User_Predictions")


class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    gamePk = db.Column(db.Integer, nullable=False, unique=True)
    gameWinner_id = db.Column(db.Integer, nullable=False)
    gameLoser_id= db.Column(db.Integer, nullable=False)
    ## home_team_id = db.Column(db.Integer, nullable=True) ##TODO change nullable to false in future
    ## away_team_id = db.Column(db.Integer, nullable = True) ##TODO change nullable to false in future
    ## start_time = db.Column(db.Integer, nullable = True ) ##TODO change nullable to false in future
    gameResolved = db.Column(db.Boolean, nullable = False, default = False)
    gameType = db.Column(db.String, nullable =False) 
    gameSeason =db.Column(db.Integer, nullable=False) 
    gameDayNight =db.Column(db.String, nullable=False) 

    ## If a game (most likely a winter ball game) has no winner after a few checks, system should flag it and update this flag
    stale_game_flag = db.Column(db.Boolean, nullable=True, default = False)
    Game_Predictions = db.relationship('User_Prediction', backref='game')

    serialize_rules=("-user_predictions.game",)











