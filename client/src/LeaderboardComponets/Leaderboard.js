import { useEffect, useState } from "react";

import DownTime from "../UtilityComponets/DownTime";


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



  return (
    <div id="WrapperLeaderBoard">
      <DownTime />
    </div>
  );
} 

export default Leaderboard;
