from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)

    _password_hash = db.Column(db.String)

    email = db.Column(db.String, nullable=True, unique=True)
    profilePic = db.Column(db.String, nullable=True)
    totalScore = db.Column(db.Integer)
    totalNumGuesses = db.Column(db.Integer)
    totalGuessesCorrect = db.Column(db.Integer)
    totalGuessesIncorrect = db.Column(db.Integer)
    currentStreak = db.Column(db.Integer)
    longestStreak = db.Column(db.Integer)
    User_Predictions = db.relationship('User_Prediction', backref="user")


    @hybrid_property
    def password_hash(self):
        raise AttributeError('Cannot access password hash!')
    
    @password_hash.setter
    def password_hash(self, new_pass):
        p_hash = bcrypt.generate_password_hash(new_pass.encode('utf-8'))
        self._password_hash = p_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<User {self.username}>"
    
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
    game_Id = db.Column(db.Integer, db.ForeignKey("games.id"))
    user_Id = db.Column(db.Integer, db.ForeignKey("users.id"))
    predictedWinnerId = db.Column(db.Integer, nullable=False)
    actualWinnerId = db.Column(db.Integer, nullable=True)
    ##back ref user = relationship
    ##back ref game = relationship
    serialize_rules=("-game.Game_Predictions", "-user.User_Predictions")
    

class Game(db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    gamePk = db.Column(db.Integer, nullable=False, unique=True)
    gameWinner_id = db.Column(db.Integer, nullable=False)
    gameLoser_id= db.Column(db.Integer, nullable=False)
    Game_Predictions = db.relationship('User_Prediction', backref='game')



    serialize_rules=("-user_predictions.game",)











