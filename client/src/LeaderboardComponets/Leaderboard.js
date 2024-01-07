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
    <h1>...Loading</h1>
  )
}

const newData = leaderboardData.sort((a,b) => b.totalScore - a.totalScore)


function mapLeaderboardData() {

    const rows = newData.map((user, index) => (
      <tr key={index} className="leader-row">
        <td>{index + 1}</td>
        <td id="leaderboard-pic"><img src="./Images/default-batter.svg"></img></td>
        <td id="">{user.username}</td>
        <td>{user.totalScore}</td>
        <td>{user.longestStreak}</td>
        <td>{user.currentStreak}</td>
        <td>{user.totalNumGuesses}</td>
        <td>{user.totalGuessesCorrect}</td>
        <td>{user.totalGuessesIncorrect}</td>
      </tr>
    ));

    return (
      <table id="Leaderboard" key={Math.random()}>
        <thead id="Leaderboard-Head">
          <tr>
            <th className="">PLACE</th>
            <th className=""></th>
            <th className="">USERNAME</th>
            <th>SCORE</th>
            <th>LONGEST STREAK</th>
            <th>CURRENT STREAK</th>
            <th>TOTAL GUESSES</th>
            <th>CORRECT PREDICTIONS</th>
            <th>WRONG PREDICTIONS</th>
          </tr>
        </thead>
        <tbody id="">{rows}</tbody>
      </table>
    );
  

}



  return (
    <div id="WrapperLeaderBoard">
      <h1 id="leaderboard-banner">🏆Leading Armchair Sabermetricians🏆</h1>
      <h3 id="leaderboard-sub">All users who have made at least one prediction </h3>
      {mapLeaderboardData()}
      <p id="thanks">I am sincerely thankful for every user who has explored my website and made a prediction. Whether you make a prediction/s based on a predictive model / system you labored to create, knowing a guy who knows a guy, or a gut feeling, Thank You. - Sam
      </p>
    </div>
  );
} 

export default Leaderboard;
