import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "./Context/UserContext";
/*App imports */
import "./App.css";
import NotFound from "./NotFound";
/*Live game imports */
import LiveGame from "./LiveGame";
import TeamMap from "./TeamComponents/TeamMap";
import HomePage from "./HomePage";
import Today from "./TodaysGamesComponents/Today";
/*Nav */
import Nav from "./Nav";
import Login from "./Login";
import SignOut from "./SignOut";
/*Smaller features */
import Leaderboard from "./LeaderboardComponents/Leaderboard";
import RollingMetrics from "./RollingComponents/RollingMetrics";
import LeagueLeaders from "./LeagueLeaders";
import UserHome from "./UserPageComponents/UserHome";
import Faq from "./FaqComponents/Faq";
import PlayerPage from "./PlayerComponents/PlayerPage";
import Standings from "./TeamComponents/Standings";
/*Incomplete and broken features */
import Teams from "./Incomplete Features/Teams";
import Venue from "./TeamComponents/Venue";
import Transactions from "./TeamComponents/Transactions";
import FieldingSaber from "./FieldingComponents/FieldingSaber";
import FreeAgents from './Incomplete Features/FreeAgents';
import Test from "./Test";
/*Blog imports */
import BlogHome from "./BlogComponents/BlogHome";
import RichHill from "./BlogComponents/Articles/RichHill.mdx";
import MLBExpansion from "./BlogComponents/Articles/MLBExpansion.mdx";
import BullpenHope from "./BlogComponents/Articles/BullpenHope.mdx";

function App() {
  // const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [searchPlayer, setSearchPlayer] = useState(607043);
  const {user, setUser} = useUser()
  
  // if (!user){
  //   useEffect(() => {
  //     fetch("/api/check_session").then((r) => {
  //       if (r.ok) {
  //         r.json().then((user) => setUser(user));
  //       } else {
  //         console.log("User is not signed in to an account");
  //       }
  //     });
  //   }, []);
  // }

  useEffect(()=>{
    console.log(user)
  },[user])

  return (
      <div className="App">
        <Nav />
        <Routes>
          {/*Base url */}
          <Route path="/" element={<HomePage />} />
          {/*User routes */}
          <Route
            path="/user/:username"
            element={<UserHome/>}
          />
          <Route
            path="/login"
            element={
              <Login
                showLogin={showLogin}
                setShowLogin={setShowLogin}
              />
            }
          />
          <Route path="/signout" element={<SignOut />} />
          {/*Game routes */}
          <Route path="/today" element={<Today />} />
          <Route path="TodaysGame/:gamePk" element={<LiveGame />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          {/*Routes not used */}
          <Route path="test" element={<Test />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/free-agents" element={<FreeAgents />} />
          <Route path="/teams" element={<Teams />} />
          <Route
            path="/advanced-fielding"
            element={
              <FieldingSaber
                searchPlayer={searchPlayer}
                setSearchPlayer={setSearchPlayer}
              />
            }
          />
          {/*Smaller feature routes */}
          <Route path="/rolling-metrics" element={<RollingMetrics />} />
          <Route path="/league-leaders" element={<LeagueLeaders />} />
          <Route path="/standings" element={<Standings />} />
          {/**Blog article paths **/}
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/Rich-Hill" element={<RichHill />} />
          <Route path="/blog/MLB-Expansion" element={<MLBExpansion />} />
          <Route path="/blog/Bullpen-Hope" element={<BullpenHope />} />
          <Route path="/FAQ" element={<Faq />} />
          <Route path="rosters" element={<TeamMap />} />
          <Route path="/player/" element={<PlayerPage />} />
          <Route path="/player/:mlbAmId/" element={<PlayerPage />} />
          {/*Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default App;
