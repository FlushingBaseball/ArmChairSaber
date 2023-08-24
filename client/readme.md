
## Advanced Batting

## leauge Leaders



5. Import the CSS File:
   Import the CSS file (or "fonts.css") in your React project, so the font-face definition is applied. You can import the CSS file in your index.js (or App.js) file or any component where you need to use the custom font. For example:

```jsx
import React from 'react';
import './fonts.css'; // Import the CSS file

function App() {
  return (
    <div>
      <h1 style={{ fontFamily: 'CustomFont', fontSize: '32px' }}>Hello, Custom Font!</h1>
      {/* Add other components and content */}
    </div>
  );
}

export default App;
```

6. Use the Custom Font:
   After completing the steps above, you can use the custom font throughout your React components by setting the `fontFamily` CSS property to the name of the custom font family defined in the `@font-face` rule.

Remember to adjust the paths and file names in the `@font-face` rule to match the location of your font files and CSS file relative to the components using the custom font.

Once everything is set up, your React project will be using the custom font for the specified elements, and you should see the text rendered with the custom font when the application is run.









































MLB Stats API was easy to find. I'm sharing it for the good of the community.

https://statsapi.mlb.com/api/v1/transactions

Parameters: teamId, playerId, date, startDate, endDate.

Date, startDate and endDate use the following date format: YYYY-MM-DD.





# Random gamePk's to test with

530628


# Player MLBID's
Nimmo 607043
Alonso 624413
Batty 683146
Mcneil 643446
Lindor 596019








Logo            Sign in / Sign out
( 9 Zones)
Zone 1: Todays Games (Monte Carlo?)
Zone 2: Around the horn (map)  -> 40 man?
Zone 3: Blog
Zone 4: Libary of baseball resources?
Zone 5: Current season projects, PECOTA, STEAMER etc
Zone 6: Daily predictions / prediction leaderboards
Zone 7: Advanced pitching stats
Zone 8: Advanced Hitting stats
Zone 9: 






























For the current game state: [https://statsapi.mlb.com/api/v1.1/game/{game_pk}/feed/live]












# Sam's home made Statcast API documentation


// game_pk is a unique identifier for games (including double headers) used by MLBAM and it is returned when you scrape from Savant.

# End points that work

 
`http://statsapi.mlb.com:80/api/v1/game/${game_pk}/boxscore`   These don't seem to have winner or loser on them



https://statsapi.mlb.com/api/v1/schedule?date=07/24/2023&sportId=1&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,team,id,name,probablePitcher,id,fullName,note
https://statsapi.mlb.com/api/v1/schedule?date=07/24/2023&sportId=1&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,team,id,name,probablePitcher,id,fullName,note




today = statsapi.get('schedule',{'date':'05/03/2019','sportId':1,'hydrate':'probablePitcher(note)','fields':'dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,team,id,name,probablePitcher,id,fullName,note'})
for day in today['dates']:
    print('{}\n'.format(day['date']))
    for game in day['games']:
        print('{} - {} - {}\n'.format(game['teams']['away']['team']['name'], game['teams']['away']['probablePitcher']['fullName'], game['teams']['away']['probablePitcher']['note']))
        print('@ {} - {} - {}\n\n'.format(game['teams']['home']['team']['name'], game['teams']['home']['probablePitcher']['fullName'], game['teams']['home']['probablePitcher']['note']))

























## end points to try



I'm using http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=04/01/2019 to pull gameid for the game in question

http://statsapi.mlb.com//api/v1/game/565803/linescore.json to get all the live data


http://statsapi.mlb.com/api/v1.1/game/566279/feed/live




Under “offense” in the second json link, there’s a first, second, third field of there is a runner on base.

For example, when I looked at it, it was the bottom of the ninth in the Dodgers game, and this was there:

"offense" : { "batter" : { "id" : 621035, "fullName" : "Chris Taylor", "link" : "/api/v1/people/621035" }, ... }, "first" : { "id" : 571970, "fullName" : "Max Muncy", "link" : "/api/v1/people/571970" }, ...




I use StatCast Search regularly for pitch by pitch data. If you turn off your wifi and click the “Download data as a Comma Separated Values file” button it directs you to the API endpoint which u can read directly into R or Python.




fangraphs projections 
Projections pages have api you can call , i.e. - https://www.fangraphs.com/api/projections?pos=all&stats=bat&type=steamer600&team=0&lg=all&players=0



http://seanlahman.com/download-baseball-database/




https://github.com/toddrob99/MLB-StatsAPI



Look through pybaseball to steal some etc




https://baseballsavant.mlb.com/csv-docs






https://statsapi.mlb.com/api/v1.1/game/599377/feed/live


As an example, here is a request that gets Jake Cronenworth's daily game logs and batting splits -- you should be able to just click on this and see the API response:

https://statsapi.mlb.com/api/v1/people/630105/stats?stats=gameLog,statSplits,statsSingleSeason&group=hitting&gameType=R&sitCodes=1,2,3,4,5,6,7,8,9,10,11,12&season=2022&language=en









Use *base_url/api/v1/*stats?stats=lastXGames*&parameter2 on an endpoint where 'stats' is an available parameter.

The type: lastXGames is only an available param on the 'stats' and 'team_stats' endpoints.

For instance...

https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=hitting&teamId=117







 this works great to find the players with the most hits in the American League.
statsapi.league_leader_data(leaderCategorie="hits", leagueId="103", statGroup="hitting")





Leauge leaders?? 

https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=hits&sportId=1&limit=10&season=2022&statGroup=hitting&leagueId=103&fields=leagueLeaders,leaders,rank,value,team,name,league,name,person,fullName








getting game Pk's and some other stuff

https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=2022-01-01&endDate=2022-12-31&gameType=R&fields=dates,date,games,gamePk,status,abstractGameState,teams,away,home,team,id,name,gameDate




getting just data and  game PK's

https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=2022-01-01&endDate=2022-12-31&gameType=R&fields=dates,date,games,gamePk








# ideas



One thing I'd really love to be able to query for is how a player has performed over a given time range and how that compares to projections in that same time range.






# how to
I refresh the list of games daily and then check their status and loop through plays in active games every 1 minute.








# minor leauge
https://statsapi.mlb.com/api/v1/schedule/games/?sportId=12































/statcast_search/csv?all=true&type=details&game_pk={game_pk}




"/statcast_search/csv?all=true&hfPT=&hfAB=&hfBBT=&hfPR=&hfZ=&stadium=&hfBBL=&hfNewZones=&hfGT=R%7CPO%7CS%7C=&hfSea=&hfSit=&player_type=pitcher&hfOuts=&opponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt={start_dt}&game_date_lt={end_dt}&team={team}&position=&hfRO=&home_road=&hfFlag=&metric_1=&hfInn=&min_pitches=0&min_results=0&group_by=name&sort_col=pitches&player_event_sort=h_launch_speed&sort_order=desc&min_abs=0&type=details&"
# _MAX_SC_RESULTS = 40000







  return data.sort_values(
        ['game_date', 'game_pk', 'at_bat_number', 'pitch_number'],
        ascending=False
    )





//playerid_lookup(last_name, first_name), 



