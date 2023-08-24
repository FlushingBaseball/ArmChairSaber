## before deployment 





## Today's Games

Eventually want to transition to rendering alot of different info for a game in 
abstractGameStatus === "Final". For now Will indicated winner, final score


While in rainout, game is considered Live. Need more info than abstract game status

The State for a team that is predicted winner does not persist since it's done with state.
should check if theres a match already on the back end to render the class

Active Class for leauge select buttons and milb player image endpoint condional src?



## signout 
doesn't navigate you out


## python issues
generate secret key and set up .env file
Or Have the the OS generate a new one everytime on startup? using os?


## games should do something on hover
## login needs to shake or do something
## failed sign in should shake or show something


## team Map
Display Team Map


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







## Deployment
Use the same versions of node and python



## Know CSS issues

1.The home screen span in the buttons can grow larger than the buttons.
2.The bat svg should be changed and lower on signIN-SignUP
3.The Live Game is just a mess
3.1The Batter Needs to be the same size regardless of side
3.2 The Live Bases clip off the screen




## Further Development Goals

1. Live Pitch Data vis is broken beyond repair.
Without documentation I need to start from first principles of the bases width and balls width
Pitch Vis Green for ball Red for Strike
Hitter Hot and Cold Zones are doable if dimensions are figured out

Use Midjourney to make artwork for the 9 buttons?

Add Carousel of The day's games and scores to the top of a live game
  let people hide it all togeather or scores they don't care about





## Flask Instructions 

flask db init
 flask db revision --autogenerate -m'Create tables owners, pets'
Then push the changes to the database
 "flask db upgrade head"



## Remember
Serialization Rules are still tuples and need a comma if there's only one



