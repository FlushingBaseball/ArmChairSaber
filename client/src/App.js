
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom"


import './App.css';
import HomePage from './HomePage';
import Teams from './Teams';
import Today from './Today';
import Nav from './Nav';
import NotFound from './NotFound'
import LiveGame from './LiveGame';
import TeamMap from './TeamMap';
import LeaderBoard from './LeaderBoard';

import Login from './Login';
import Test from './Test';
import AdvancedPitching from './AdvancedPItching';

import FieldingSaber from './FieldingSaber';
import AdvancedBatting from './AdvancedBatting';

import LeagueLeaders from './LeaugeLeaders';

import UserHome from './UserPageComponets/UserHome';

import PlayerPage from './PlayerComponets/PlayerPage';


//566484
//http://statsapi.mlb.com:80/api/v1/game/530629/boxscore


//not working https://baseballsavant.mlb.com/gf?game_pk=(717309)

/* Working endpoints
Generates the box score for a game based on the game ID
http://statsapi.mlb.com:80/api/v1/game/530628/boxscore"


Generates the schedule for the day 
"https://statsapi.mlb.com/api/v1/schedule?date=07/24/2023&sportId=1&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,team,id,name,probablePitcher,id,fullName,note"





*/

function App() {

const [user, setUser] =useState(null);
const [showLogin, setShowLogin] = useState(true);
const [searchPlayer, setSearchPlayer] = useState(607043)


useEffect(() => {
  fetch("/check_session").then((r) => {
    if (r.ok) {
      r.json().then((user) => setUser(user));
    }
  });
}, []);

if (!user) {
  return (
    <Login
      showLogin={showLogin}
      setShowLogin={setShowLogin}
      setUser={setUser}
    />
  );
}





  return (

      <div className='App'>
        <Nav user={user} setUser={setUser}/>
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/today' element={<Today user={user}/>} />
        <Route path="TodaysGame/:gamePk" element={<LiveGame />} />
        <Route path="TeamMap" element={<TeamMap />} />
        <Route path="Leaderboard" element={<LeaderBoard />} />
        <Route path='test' element={<Test />} />
        <Route path='/advancedBatting' element={<AdvancedBatting />} />
        <Route path="/advancedPitching" element={<AdvancedPitching />} />
        <Route path='/advancedFielding' element={<FieldingSaber searchPlayer={searchPlayer} setSearchPlayer={setSearchPlayer}/>} />
        <Route path='/LeagueLeaders' element={<LeagueLeaders />} />
        <Route path="/user/:username" element={<UserHome user={user}/>} />
        <Route path='/player:playerName' element={<PlayerPage />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
       </div>

  )
}

export default App;
