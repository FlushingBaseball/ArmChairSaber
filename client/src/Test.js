import { useEffect, useState } from "react"

function Test(){

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
  
  // Format the date as "month/day/year"
    const formattedDate = `${month}/${day}/${year}`;

    // const game_Pk = '717096' ;
    const [fetchedGameData, setFetchedGameData] = useState('');

    useEffect(()=>{
        //hit leader board
        
        // fetch(`https://statsapi.mlb.com/api/v1.1/game/${game_Pk}/feed/live`)
        // fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk=${game_Pk}`)
        // fetch(``)
        
        // fetch(`https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=hitting&teamId=117`)
        
        // fetch(`https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=pitching&teamId=${112}`)
        // fetch(`https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=hits&sportId=1&limit=20&season=2023&fields=leagueLeaders,leaders,rank,value,team,name,league,name,person,fullName`)


        // fetch(`https://statsapi.mlb.com/api/v1/schedule?date=${formattedDate}&sportId=11&hydrate=probablePitcher(note)&fields=dates,date,games,gamePk,gameDate,status,abstractGameState,teams,away,home,isWinner,leagueRecord,losses,pct,wins,score,team,id,name,probablePitcher,id,fullName,note`)

        // fetch('https://statsapi.mlb.com/api/v1/sports/1/players?season=2023')
        .then((resp) => resp.json())
        .then(data => {setFetchedGameData(data.people)
            console.log('data should be below')        
        })
             },[])



    useEffect(()=>{
        console.log(fetchedGameData)
        if (fetchedGameData.length > 1){
            //     console.log('were in length')
            //  populatePlayers()
        }
    },[fetchedGameData])


    // function handleTeamChange(event){
    //     const newTeamValue = parseInt(event.target.value)
    //     setSelectedTeam(newTeamValue)
    //     setTeamLogo(newTeamValue)
    // }
    
    

// function populatePlayers(){
//    console.log( typeof fetchedGameData)
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





    return(
        <div>
            <h2>Testing Page</h2>

        </div>
    )
}

export default Test