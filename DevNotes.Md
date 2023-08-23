## before push 

Need to go through each file

Work on Today 

 Active Class for leauge select buttons and milb player image endpoint condional src?


## Take away prediction group after prediction is made on game 
## higlight team picked 
## not allow double predictions of same game





## python issues
generate secret key and set up .env file







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