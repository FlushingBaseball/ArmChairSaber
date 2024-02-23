import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/*App imports */
import "./App.css";
import NotFound from "./NotFound";
/*Live game imports */
import LiveGame from "./LiveGame";
import TeamMap from "./TeamComponets/TeamMap";
import HomePage from "./HomePage";
import Today from "./TodaysGamesComponets/Today";
/*Nav */
import Nav from "./Nav";
import Login from "./Login";
import SignOut from "./SignOut";
/*Smaller features */
import Leaderboard from "./LeaderboardComponets/Leaderboard";
import RollingMetrics from "./RollingComponets/RollingMetrics";
import LeagueLeaders from "./LeaugeLeaders";
import UserHome from "./UserPageComponets/UserHome";
import Faq from "./FaqComponets/Faq";
import PlayerPage from "./PlayerComponets/PlayerPage";
import Standings from "./TeamComponets/Standings";
/*Incomplete and broken features */
import Teams from "./Incomplete Features/Teams";
import Venue from "./TeamComponets/Venue";
import Transactions from "./TeamComponets/Transactions";
import FieldingSaber from "./FieldingComponets/FieldingSaber";
import FreeAgents from './Incomplete Features/FreeAgents';
import Test from "./Test";
/*Blog imports */
import BlogHome from "./BlogComponets/BlogHome";
import RichHill from "./BlogComponets/Articles/RichHill.mdx";
import MLBExpansion from "./BlogComponets/Articles/MLBExpansion.mdx";
import BullpenHope from "./BlogComponets/Articles/BullpenHope.mdx";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [searchPlayer, setSearchPlayer] = useState(607043);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        console.log("User not signed in");
      }
    });
  }, []);

  return (
    <div className="App">
      <Nav user={user} setUser={setUser} />
      <Routes>
        {/*Base url */}
        <Route path="/" element={<HomePage />} />
        {/*User routes */}
        <Route
          path="/user/:username"
          element={<UserHome user={user} setUser={setUser} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setUser={setUser}
              showLogin={showLogin}
              setShowLogin={setShowLogin}
            />
          }
        />
        <Route path="/signout" element={<SignOut setUser={setUser} />} />
        {/*Game routes */}
        <Route path="/today" element={<Today user={user} />} />
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
