import { useEffect, useState } from "react"
import TableComponent from "./UtilityComponets/TableComponent"

function Test(){

    const [xData, setxData] = useState('')


   
    /**
     * Leaderboard Structure test
    */

//    let fetchedPredictionData = '';
   
// function fetchedPrediction(){
//     fetch('/nextUnresolvedPrediction')
//     .then((resp) => {
//         if (!resp.ok){
//             throw new Error("Error Response Recieved")
//         }
//         return resp.json()
//     })
//     .then((data) => {
//         fetchedPredictionData=data
//     })
//     .then( () =>{
//         handlePrediction(fetchedPredictionData)
//         fetchedPrediction()
//     })
//     .catch((error)=> {
//         console.error("Error", error)
//     });
// }

// function handlePrediction(prediction){
//     console.log("this is the preiction to process", prediction)
// }









    //     .then((resp) => resp.json())
    //     .then(data => {setFetchedGameData(data)
    //         console.log('data should be below')        
    //     })
    //          },[])

    // const currentDate = new Date();
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const year = currentDate.getFullYear();
  
  // Format the date as "month/day/year"
    // const formattedDate = `${month}/${day}/${year}`;

    // const game_Pk = '717096' ;
    
    //     //hit leader board
    
    //     // fetch(`https://statsapi.mlb.com/api/v1.1/game/${game_Pk}/feed/live`)
    
    //     // fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk=${game_Pk}`)
    //     // fetch(``)
    
    //     // fetch(`https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=hitting&teamId=117`)
    
    //     // fetch(`https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=pitching&teamId=${112}`)
    
    //     // fetch(`https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=hits&sportId=1&limit=20&season=2023&fields=leagueLeaders,leaders,rank,value,team,name,league,name,person,fullName`)
    
    
    //     // fetch(`https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=11&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`)
    
    //     // fetch(`https://statsapi.mlb.com/api/v1/people?personsids=683146,643446&season=2023&hydrate=hydrations`)
    //     // fetch(`https://statsapi.mlb.com/api/v1/people/683146?hydrate=stats(group=hitting,season=2023)`)
    //     // fetch(`https://statsapi.mlb.com/api/v1/statTypes`)
    //     // fetch(`http://statsapi.mlb.com/api/v1/teams/121/roster/Active?season=2023&hydrate=person(stats(group=[hitting,pitching],type=[sabermetrics,advanced])%3A%29`)
    //     // fetch(`https://statsapi.mlb.com/api/v1/people/592450?&season=2023&hydrate=stats(group=[sabermetrics],type=[hydrate],season=2023)`)
    //     fetch(`https://statsapi.mlb.com/api/v1/people/592450?&season=2023&hydrate=stats(group=[],type=[career],season=2023)`)
    // fetch(`https://statsapi.mlb                           season=2023&hydrate=stats(group=[sabermetrics],type=[${selectedStatType}],season=2023)`)
    
    
    //  Batty 683146
    //  Mcneil 643446
    //  Lindor 596019
    // Megill 656731
    // judge 592450
    
    /**
     * [hitting] seasonAdvanced, hotColdZones, expectedStatistics, career
     * Pitching 
    */
    //        const [fetchedGameData, setFetchedGameData] = useState('');
           
    //        useEffect(()=>{
    //            fetch('https://statsapi.mlb.com/api/v1/sports/1/players?season=2021')
    //            .then((resp) => resp.json())
    //            .then(data => {setFetchedGameData(data.people)
    //                console.log('data should be below')        
    //            })
    //                 },[])


    // useEffect(()=>{
    //     console.log(fetchedGameData)
    //     if (fetchedGameData.length < 1){
    //             console.log('no players yet')
    //         }
    //         else if (fetchedGameData.length > 1){
    //             console.log(" fuck yeah")
    //             populatePlayers()
    //     }
    // },[fetchedGameData])


    // function handleTeamChange(event){
    //     const newTeamValue = parseInt(event.target.value)
    //     setSelectedTeam(newTeamValue)
    //     setTeamLogo(newTeamValue)
    // }
    
    

// function populatePlayers(){
// //    console.log( typeof fetchedGameData)
//     console.log('inside populate Players')
//     fetchedGameData.forEach(player =>{

    
//             const newPlayer = {
//                 age: player.currentAge,
//                 currentTeamId: player.currentTeam.id ,
//                 firstLastName: player.firstLastName,
//                 MLBAMID: player.id
//             };
//             console.log(`posted Player is:`)
//             console.log(newPlayer)
            
//             fetch('/players', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type' : 'application/json',
//                 },
//                 body: JSON.stringify(newPlayer)
//             })
//             .then((response) =>{
//                 if (!response.ok){
//                     throw new Error('Network response was not okay')
//                 }
//                 return response.json();
//             })
//     }) 
// }

  
useEffect(()=>{
  fetch(`https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=pitching&teamId=121`)
  .then((resp)=> resp.json())
  .then((data)=>setxData(data))
},[])




    return(
        <div>
            <h2 >Testing Page</h2>
            <h4>Various tests are commented out</h4>
            {/* {fetchedPrediction()} */}

            <h2>Populate Players</h2>
            {/* {populatePlayers()} */}
            <TableComponent xData={xData}/>

        </div>
    )
}

export default Test