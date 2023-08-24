## before push 





## Today's Game

Eventually want to transition to rendering alot of different info for a game in 
abstractGameStatus === "Final". For now Will indicated winner, final score










The State for a game that is selected does not persist, so on refresh no idea if 
a prediction was made or not. 

## Need to go through each file
Today
Today's Game
Prediction Group

Active Class for leauge select buttons and milb player image endpoint condional src?


## Take away prediction group after prediction is made on game 
## higlight team picked make it persist
## not allow double predictions of same game









## signout doesn't navigate you out


## python issues
generate secret key and set up .env file




## failed sign in should shake or show something


## Thoughts

SRC set and responsiveness of the site needs to be implmented / improved

MILB photos cause errors based on the MLB silo being called.
  Noteable prospects have a photo found here
  https://midfield.mlbstatic.com/v1/people/${mlbplayerID}/milb/${numbersize}

example call for blade tidwell
    https://midfield.mlbstatic.com/v1/people/694918/milb/400




## Done
Switched Clickable Div's to Buttons after I some accessibility concerns. The site should be fun for everyone.
Removed the 9 onClicks *facepalm* and just fed in a param for useNavigate. If I change to reactRouter 6.4 will see what is hip way to navigate
Cleaned up TodaysGame: it's not a feature yet but it needs a thoughtful design overhall to take further. 
Took away Prediction Group if game is Live.
Finally wrote some logic to not let users make two predictions for a game.
Fixed Bug where number of predictions got updated even if the double prediction was successfull rejected


## deploy

same version of node, python



## Know CSS issues

1.The home screen span in the buttons can grow larger than the buttons.
2.The bat svg should be changed and lower on signIN-SignUP
3.The Live Game is just a mess
3.1The Batter Needs to be the same size regardless of side
3.2 The Live Bases clip off the screen


## Further Development Goals
