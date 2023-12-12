
import { useState } from 'react';
import { Routes, Route } from "react-router-dom"


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
import SignOut from './SignOut';
import Test from './Test';
import AdvancedPitching from './AdvancedPItching';

import FieldingSaber from './FieldingSaber';
import AdvancedBatting from './AdvancedBatting';

import LeagueLeaders from './LeaugeLeaders';

import UserHome from './UserPageComponets/UserHome';
import Faq from './Faq';
import Venue from './TeamComponets/Venue';

import PlayerPage from './PlayerComponets/PlayerPage';


function App() {

const [user, setUser] =useState(null);
const [showLogin, setShowLogin] = useState(true);
const [searchPlayer, setSearchPlayer] = useState(607043);




  return (

      <div className='App'>
        <Nav user={user} setUser={setUser}/>
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/today' element={<Today user={user}/>} />
        <Route path="TodaysGame/:gamePk" element={<LiveGame />} />
        <Route path="Leaderboard" element={<LeaderBoard />} />
        <Route path='test' element={<Test />} />
        <Route path='/advancedBatting' element={<AdvancedBatting />} />
        <Route path="/advancedPitching" element={<AdvancedPitching />} />
        <Route path='/advancedFielding' element={<FieldingSaber searchPlayer={searchPlayer} setSearchPlayer={setSearchPlayer}/>} />
        <Route path='/LeagueLeaders' element={<LeagueLeaders />} />
        <Route path="/user/:username" element={<UserHome user={user} setUser={setUser}/>} />
        <Route path='/login' element={<Login  setUser={setUser}  showLogin={showLogin} setShowLogin={setShowLogin}/>} />
        <Route path='/signout' element={<SignOut setUser={setUser}/>}/>
        <Route path ="/FAQ" element={<Faq />} />
        <Route path='/Venue' element={<Venue />} />

          <Route path="TeamMap" element={<TeamMap />} />
          <Route path='/player/' element={<PlayerPage />} />
          <Route path='/player/:mlbAmId/' element={<PlayerPage />} />

        <Route path="*" element={<NotFound />} />
    </Routes>
       </div>

  )
}

export default App;
