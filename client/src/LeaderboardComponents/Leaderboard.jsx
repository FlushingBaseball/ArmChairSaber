import BatLoader from "../UtilityComponents/BatLoader";
import { useEffect, useState, useMemo } from "react";
// import {profilePictures} from "../Metadata/profilePictures.json"

/**
 * Improving the leaderboard efficiency by creating and calling thumbnails instead of full images and reusing repeats from storage
 *
 *
 */
function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState();

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((resp) => resp.json())
      .then((data) => {
        setLeaderboardData(data);
      });
  }, []);

  useEffect(() => {
    console.log("leaderboard data is", leaderboardData);
  }, [leaderboardData]);

  const sortedLeaderboardData = useMemo(() => {
    if (!leaderboardData) return [];
    return [...leaderboardData].sort((a, b) => b.totalScore - a.totalScore);
  }, [leaderboardData]);

  if (!leaderboardData) {
    return <BatLoader />;
  }

  function mapLeaderboardData() {
    const rows = sortedLeaderboardData.map((user, index) => (
      <tr key={user.username} className="leader-row">
        <td className="leader-data leaderboard-place">{index + 1}</td>
        <td className="leader-data">
          <picture id="Leaderboard-Picture">
            <source
              srcSet={
                user.profilePic
                  ? `/api/profile_pictures/p${user.profilePic}_thumb.webp`
                  : "./Images/default-batter.svg"
              }
              media="(max-width: 768px)"
            />
            <img
              id="Leaderboard-Img"
              src={
                user.profilePic
                  ? `/api/profile_pictures/p${user.profilePic}_med.webp`
                  : "./Images/default-batter.svg"
              }
            />
          </picture>
        </td>
        <td id="Leaderboard-Username">
          {user.username.length > 15
            ? user.username.substring(0, 9) + "..."
            : user.username}
        </td>
        <td className="leader-data">{user.totalScore}</td>
        <td className="leader-data">{user.longestStreak}</td>
        <td className="leader-data">{user.currentStreak}</td>
        <td className="leader-data">{user.totalGuessesCorrect}</td>
        <td className="leader-data">{user.totalGuessesIncorrect}</td>
      </tr>
    ));

    return (
      <table id="Leaderboard" key={Math.random()}>
        <thead id="Leaderboard-Head">
          <tr>
            <th className="leader-head">PLACE</th>
            <th className="leader-head"></th>
            <th className="leader-head">USERNAME</th>
            <th className="leader-head">SCORE</th>
            <th className="leader-head">LONGEST STREAK</th>
            <th className="leader-head">CURRENT STREAK</th>
            <th className="leader-head">CORRECT PREDICTIONS</th>
            <th className="leader-head">INCORRECT PREDICTIONS</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  return (
    <div id="Wrapper-Leaderboard-Feature">
      <h1 id="leaderboard-banner">Leading Armchair Sabermetricians</h1>
      <p id="thanks">
        Thank you to everyone who explored this website and made a prediction
        -Sam
      </p>
      <div className="Wrapper-Table-Leaderboard">{mapLeaderboardData()}</div>
    </div>
  );
}

export default Leaderboard;
