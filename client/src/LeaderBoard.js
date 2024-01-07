import { useEffect, useState } from "react";

import DownTime from "./UtilityComponets/DownTime";


function LeaderBoard() {

  const [leaderboardData, setLeaderboardData] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    fetch(`/api/users/leaderboard/`)
    .then((resp) => resp.json())
    .then((data)=>{
      setLeaderboardData(data)
      // setIsLoading(false)
    })
  },[])

useEffect(()=>{
  console.log("leaderboard data is",leaderboardData)

},[leaderboardData])

// if (leaderboardData.length < 1){
//   return (
//     <h1>...Loading</h1>
//   )
// }
 
function mapLeaderboardData(){
  if (leaderboardData.length > 1){
    return leaderboardData.map((leader) =>(
      <div className="WrapperLeaderEntry">
        <span>{leader.username}</span>
      </div>
    ))
  }
}



  return (
    <div id="WrapperLeaderBoard">
      {/* <DownTime /> */}
      {/* {mapLeaderboardData()} */}
      
    </div>
  );
} // end of LeaderBoard

export default LeaderBoard;
