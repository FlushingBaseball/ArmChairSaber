import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./HomePage";
import Teams from "./Teams";
import Today from "./Today";
import Nav from "./Nav";
import NotFound from "./NotFound";
import LiveGame from "./LiveGame";
import TeamMap from "./TeamComponets/TeamMap";
import Leaderboard from "./LeaderboardComponets/Leaderboard";
import Login from "./Login";
import SignOut from "./SignOut";
import Test from "./Test";

import FieldingSaber from "./FieldingSaber";
import RollingMetrics from "./RollingMetrics";
import LeagueLeaders from "./LeaugeLeaders";
import UserHome from "./UserPageComponets/UserHome";
import Faq from "./FaqComponets/Faq";
import Venue from "./TeamComponets/Venue";
import PlayerPage from "./PlayerComponets/PlayerPage";
import Standings from "./TeamComponets/Standings";
import Transactions from "./TeamComponets/Transactions";

/*Blog Imports */
import BlogHome from "./BlogComponets/BlogHome";
import RichHill from "./BlogComponets/Articles/RichHill.mdx";
import MLBExpansion from "./BlogComponets/Articles/MLBExpansion.mdx"
import BullpenHope from "./BlogComponets/Articles/BullpenHope.mdx"



function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [searchPlayer, setSearchPlayer] = useState(607043);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="App">
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/today" element={<Today user={user} />} />
        <Route path="TodaysGame/:gamePk" element={<LiveGame />} />
        <Route path="Leaderboard" element={<Leaderboard />} />
        <Route path="test" element={<Test />} />
        <Route path="/rolling-metrics" element={<RollingMetrics />} />

        <Route path="/blog" element={<BlogHome />} />
        <Route
          path="/advancedFielding"
          element={
            <FieldingSaber
              searchPlayer={searchPlayer}
              setSearchPlayer={setSearchPlayer}
            />
          }
        />
        <Route path="/LeagueLeaders" element={<LeagueLeaders />} />
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

        <Route path="/standings" element={<Standings />} />
        <Route path="/transactions" element={<Transactions />} />

        {/**Blog article paths **/}
        <Route path="/blog/Rich-Hill" element={<RichHill />} />
        <Route path="/blog/MLB-Expansion" element={<MLBExpansion />} />
        <Route path="/blog/Bullpen-Hope" element={<BullpenHope />} />



        <Route path="/signout" element={<SignOut setUser={setUser} />} />
        <Route path="/FAQ" element={<Faq />} />
        <Route path="/Venue" element={<Venue />} />

        <Route path="TeamMap" element={<TeamMap />} />
        <Route path="/player/" element={<PlayerPage />} />
        <Route path="/player/:mlbAmId/" element={<PlayerPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
