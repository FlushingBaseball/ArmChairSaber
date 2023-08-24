import { useState, useEffect } from "react";

function LeaderBoard(){

const [predictionData, setPredictionData] = useState([]);
const [predictiveLeaders, setPredictiveLeaders] = useState([]);
const [users, setUsers] = useState([]);

        useEffect(()=>{

            fetch('/predictions')
            .then((resp) => resp.json())
            .then(data =>{ setPredictionData(data)
        
            });
        

        },[])


        useEffect(()=>{
            fetch('./leaders')
            .then((resp)=> resp.json())
            .then(data =>{setPredictiveLeaders(data) })
        },[])

        useEffect(()=>{
            fetch('./users')
            .then((resp)=> resp.json())
            .then(data =>{setUsers(data) })
        },[])





const userStats ={};
predictionData.forEach(entry => {
    console.log('this is entry')
    console.log(entry)
    const userId = entry.user.id;
    const correctPrediction = entry.actualWinnerId === entry.predictedWinnerId;

    if(!userStats[userId]){
        userStats[userId] = {
            username: entry.user.username,
            totalPredictions: 0, 
            correctPredictions: 0, 
            percentage: 0,
        };
    }
    userStats[userId].totalPredictions++;
    userStats[userId].correctPredictions += correctPrediction ? 1 : 0;
});

const leaderboard = Object.values(userStats).map(stats => {
    stats.percentage = (stats.correctPredictions / stats.totalPredictions) * 100;
    return stats;
});

leaderboard.sort((a,b) => b.percentage -a.percentage);
    





function resolvePredictions(predictionData){
    for (let i =0; i<predictionData.length; i++){
        if (predictionData[i].actualWinnerId === null){
            fetch(`/games/${predictionData[i].game_Id}`)
            .then(resp=> {
                if (!resp.ok){
                    fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk=${predictionData[i].game_Id}`)
                    .then((resp) => resp.json())
                    .then(resp =>{
                            console.log(resp)


                        if ( resp.dates[0].games[0].teams.away.isWinner === true || (resp.dates[1] && resp.dates[1].games[0].teams.away.isWinner === true) ){

                            const newGame ={

                                    gamePk: predictionData[i].game_Id,
                                    gameWinner_id: resp.dates[0].games[0].teams.away.team.id,
                                    gameLoser_id:  resp.dates[0].games[0].teams.home.team.id

                            }

                        //    predictionData[i].actualWinnerId = resp.dates[0].games[0].teams.away.team.id
                           fetch(`/games/${predictionData[i].game_Id}`, {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newGame)
                           })
                           .then((resp) =>{
                            if (!Response.ok) {
                                throw new Error('Failed to post new game')
                            }
                            return Response.json();
                           })
                           .then((data) => {
                            console.log("posted game:", data);
                           })
                        }
                        
                        else if ( resp.dates[0].games[0].teams.home.isWinner === true || ( resp.dates[1] && resp.dates[1].games[0].teams.home.isWinner === true) ){
                        
                            const newGame ={

                                gamePk: predictionData[i].game_Id,
                                gameWinner_id: resp.dates[0].games[0].teams.home.team.id,
                                gameLoser_id:  resp.dates[0].games[0].teams.away.team.id

                        }
                        
                        //    predictionData[i].actualWinnerId = resp.dates[0].games[0].teams.home.team.id
                        fetch(`/games/${predictionData[i].game_Id}`, {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newGame)
                           })
                           .then((resp) =>{
                            if (!Response.ok) {
                                throw new Error('Failed to post new game')
                            }
                            return Response.json();
                           })
                           .then((data) => {
                            console.log("posted game:", data);
                           })
                        }
                        
                    })               
                  }


                else if (resp.ok){
                    return resp.json()
                }
                
               


            }) 
            .then( (data) => {

                    console.log(data)

                    const patchedPrediction ={
                        actualWinnerId: data.gameWinner_id
                
                }

               
                // .then(resp => resp.json())
                console.log('had this game')
                // '/predictions/<int:id>'

                console.log(patchedPrediction)


                fetch(`/predictions/${predictionData[i].id}`, {
                                method: 'PATCH',
                                headers:{
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(patchedPrediction)
                               })
                               .then((resp) =>{
                                if (!resp.ok) {
                                    throw new Error('Failed to update item')
                                }
                                return resp.json();
                               })
                               .then((data) => {
                                console.log("updated item:", data);
                               })

              }) //end else if not okay
        }
    }   //end for loop 

}       //end resolve predictions




useEffect(()=>{
    if (predictionData.length > 0){
        console.log('predicitons', predictionData)
        resolvePredictions(predictionData)
    }

}, [predictionData]);






// useEffect(()=>{

//     fetch('/predictions')
//     .then((resp) => resp.json())
//     .then(data =>{ setPredictionData(data)
//         console.log(predictionData)
       
//     })
   

// },[]) //'/games'


if (predictionData == []){
    return(
        <h1>Loading....</h1>
    )
}
if (users == []){
    return(
        <h1>Loading....</h1>
    )
}

// function mapResults(predictionData){
//     predictionData.map(prediction =>{
//         <h3>{actualWinnerId}</h3>
//     })
// }


console.log(leaderboard)


return (

    <div id="leaderBoard">
        <div className="cata">
            <h2 className="leaderBoardCata">Leaders ID</h2>
            <h2 className="LeaderBoardCata">Correct %</h2>
            <h2 className="LeaderBoardCata"># predicitons</h2>
        </div>
        {leaderboard.map((user, index) => (
          
                <div className="leaderEntry" key={index}>{`Rank ${index+1}: ${user.username} - ${user.percentage.toFixed(2)}% correct predictions - ${user.totalPredictions} predictions made`}</div>
             
        )
        
    )}

    </div>


)

}

export default LeaderBoard

