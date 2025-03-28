import BatLoader from "../UtilityComponents/BatLoader";
import { useEffect, useState } from "react";

function Leaderboard() {

  const [leaderboardData, setLeaderboardData] = useState();

  useEffect(()=>{
    fetch('/api/leaderboard')
    .then((resp) => resp.json())
    .then((data)=>{
      setLeaderboardData(data)
    })
  },[])

useEffect(()=>{
  console.log("leaderboard data is", leaderboardData)

},[leaderboardData])



if (!leaderboardData){
  return (
    <BatLoader />
  )
}

const newData = leaderboardData.sort((a,b) => b.totalScore - a.totalScore)


function mapLeaderboardData() {

    const rows = newData.map((user, index) => (
      <tr key={index} className="leader-row">
        <td className="leader-data leaderboard-place">{index + 1}</td>
        <td className="leader-data" ><img id="leaderboard-pic" src={ user.profilePic ? `/api/profile_pictures/p${Number(user.profilePic)}.webp` : "./Images/default-batter.svg"}></img></td>
        <td id="Leaderboard-Username">{user.username.length > 15
  ? user.username.substring(0, 9) + "..."
  : user.username}</td>
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
        <tbody id="">{rows}</tbody>
      </table>
    );
  

}



  return (
    <div id="Wrapper-Leaderboard-Feature">
      <h1 id="leaderboard-banner">Leading Armchair Sabermetricians</h1>
      <p id="thanks">Thank you to everyone who explored this website and made a prediction -Sam
      </p>
      <div className="Wrapper-Table-Leaderboard">
        {mapLeaderboardData()}
      </div>
    </div>
  );
} 

export default Leaderboard;
