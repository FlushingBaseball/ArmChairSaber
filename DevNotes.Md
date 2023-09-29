

Stale data issue, somehow need to do indvidual fetches for data

maybe do a route where response = where isresolved = false .first

else return "no more"

keep calling that from the front end untill you get no more

The prediction data is out of date the on 2nd predictions;

## useful sql

# if malformed prediction gets in 
update users set totalScore =0, totalGuessesCorrect=0, currentStreak=0, longestStreak=0, totalGuessesIncorrect =0 where id =6;

# Counting
select count(*) from user_predictions where user_Id = 1;



## Prediction Leaderboard
Somehow predictions are being counted wrong, although a database check
proves there are only 16 predictions made by user id =1, totalGuessesCorrect = 5
totalGuessesIncorrect = 13. 18 is not 16 so...Houston we have a problem. 

totalNumGuesses is also incorrect for user id =2, 80 on counter 79 in table.
id's 5 and 6 are correct so maybe this was me messing with the data via querys?

# side notes
somehow blank predicted winners got in the data and I had to clean it? how 
predicted winner was 0 on three guesses


Need to finish today

1. Fix Predictions
2. Fix UserPage 
3. Fix what Buttons show for each player
4. Make a shake animation for double submitting
5. CSS




























Player page will be done soon just need to clean up
only render what should be avalibe
 and there's a comma
and not clearing issue


somehow need to clarify whats being sent over
pitcher doesn't work on default since theres no hitting for 2023





1. Work on Today's Games












## Overview

This site shouldn't be a half baked Fangraphs, Savant, Prospectus, ESPN etc. 
You pull up the app and boom you have stantons sprint speed. He grounds out and it updates and tells you 
that was actually faster than his average. I care about Brett Battys groundball rate and eli delacruz's swinging strike rate. 
I've orignized them into a view I called fantasy draft 2024?. 


# Statistical Views to track / orginize stats. Drag and dropable

# Live Game plays off drag and drop (alerts based on game events?)

# Beat the machines (can see how each one predicted on todays game)
Make predictions against different prediction algorithms
Current season projects, PECOTA, STEAMER etc
One thing I'd really love to be able to query for is how a player has performed over a given time range
and how that compares to projections in that same time range.

## Player Pages

## Team Pages
1. Team Overview (reputation etc)
2. Roster and the roster is clickable to direct you to a player page
3. Coaches are clickable to find out background on the coach. 




So there's an incredible amount of things that I want to do for this website.
I want people to be able to save and see stats and orginize them. 
I want a great user profile and leaderboard
I want a cool map and nice touches.

but for now I should work on the MVP and get it out there and deploy


Zone 6: Daily predictions / prediction leaderboards
Zone 7: Advanced pitching stats - Advanced Hitting stats - Feilding 





# Saber Hitting 
should be able to type in a player and grab some saber data

# Saber Pitching
should be able to type in a pitcher and grab some saber date









## Before deployment 

1. Roster Transactions? 


## After Deployment

1. Need to fix Pitch Data Vis
2. Individual player cards
3. Ability to save stats
4. Roster for other levels ?









## Prediction Fix

Ideally you wouldn't want to calculate every single prediction again to come to an average. That could get intense fro sqlite pretty fast. 
Instead of mapping over all the predictions saying const correctPrediction = entry.actualWinnerId === entry.predictedWinnerId;

So I could add a resolved True/False table to user_prediction and only call the resolve prediction logic on the unresolved predictions. 















## Today's Games

Eventually want to transition to rendering alot of different info for a game in 
abstractGameStatus === "Final". For now Will indicated winner, final score


While in rainout, game is considered Live. Need more info than abstract game status

The State for a team that is predicted winner does not persist since it's done with state.
should check if theres a match already on the back end to render the class

Active Class for leauge select buttons and milb player image endpoint condional src?




## python issues
generate secret key and set up .env file
Or Have the the OS generate a new one everytime on startup? using os?


## games should do something on hover

## failed sign in should shake and show something


## team Map
Display Team Map


## Thoughts




## Done
Switched Clickable Div's to Buttons after I some accessibility concerns. The site should be fun for everyone.
Removed the 9 onClicks *facepalm* and just fed in a param for useNavigate. If I change to reactRouter 6.4 will see what is hip way to navigate
Cleaned up TodaysGame: it's not a feature yet but it needs a thoughtful design overhall to take further. 
Took away Prediction Group if game is Live.
Finally wrote some logic to not let users make two predictions for a game.
Fixed Bug where number of predictions got updated even if the double prediction was successfull rejected
Indicate which batter in a lineup is at bat
Fixed Sign In and Sign Out






## Deployment
Use the same versions of node and python



## Know CSS issues

1.The home screen span in the buttons can grow larger than the buttons.
2.The bat svg should be changed and lower on signIN-SignUP
3.The Live Game is just a mess
3.1The Batter Needs to be the same size regardless of side
3.2 The Live Bases clip off the screen

3.4 SRC set and responsiveness of the site needs to be implmented / improved




## Further Development Goals

0. Pulling in players to populate the data base should be first fetch from the database, then fetch from mlb if the player is not in the data base set push it into an array for prosessing 

1. Live Pitch Data vis is broken beyond repair.
Without documentation I need to start from first principles of the bases width and balls width
Pitch Vis Green for ball Red for Strike
Hitter Hot and Cold Zones are doable if dimensions are figured out

2. Use Midjourney to make artwork for the 9 buttons?

3. Add Carousel of The day's games and scores to the top of a live game
  let people hide it all togeather or scores they don't care about






# Known non pressing issues
  svg's use a property called class, the browser for some reason thinks im misspelling className and throwing a warning
  
advanced Batting
On Base Plus Slugging is repeated twice along with other stuff


## Strikezone Investigation

## breakthroughs!
x is from left to right
z is from the ground to the sky (up down)
y is depth from you to the pitcher

## General 

The Plate is 17 Inches Wide

The ball is 1.43 inches in diameter conver to feet /12

The Center of the ball could be as much as 1.42 outside the zone in any direction and should be a strike

strikeZoneTop 3.09 ?? Feet
strikeZoneBottom 1.5 ?? Feet

Coordinates

aX 3.0460

aY 26.48 -29.9683
  The acceleration of the pitch, in feet per second per second, in y-dimension, determined at y=50 feet

aZ -26.35649 -15.22
 The acceleration of the pitch, in feet per second per second, in z-dimension, determined at y=50 feet.


pX -0.73
?? Horizontal Coordinate of the ball as it crosses the plate


pZ 2.67
Vertical coordinate of where the ball crosses the plate



pfxX 9.72 
    Horizontal movement in feet from the catcher's perspective.

pfxZ -0.73
  Vertical movement in feet from the catcher's perpsective

x ???

X0 -9.81
 The velocity of the pitch, in feet per second, in x-dimension, determined at y=50 feet.

y ??


Y0 130.93
 The velocity of the pitch, in feet per second, in y-dimension, determined at y=50 feet.

z0 ???


Check if the pitch has coordinates

players of the same height may have different strike zone tops and bottoms
their legs and torsos may have different proportions

sztop / szbottom seems to change based on how a batter is standing?



11      |      12
  -------------
  | 1 | 2 | 3 |
  -------------
--| 4 | 5 | 6 |--
  -------------
  | 7 | 8 | 9 |
  -------------
13      |      14










## Flask Instructions 

flask db init
 flask db revision --autogenerate -m'Create tables owners, pets'
Then push the changes to the database
 "flask db upgrade head"



## Remember
Serialization Rules are still tuples and need a comma if there's only one


## Name
20's 30's baseball terms