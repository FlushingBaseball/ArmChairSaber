import { useState, useEffect } from "react";

function LeaderBoard(){
    
    const [unResPredictions, setUnResPredictions] = useState([]);

    
            useEffect(()=>{
                fetch('/predictionsNotResolved')
                .then((resp)=> resp.json())
                .then(data => {
                    setUnResPredictions(data)
                    handleUnResolvedPredictions(unResPredictions)
                })
            },[])
    
    
            function handleUnResolvedPredictions(array){
                array.forEach(entry =>{
                    console.log("this is entry in the Master Function before handleWinner Known", entry)
                    handleWinnerKnown(entry)
                    // if (entry.actualWinnerId !==null){
                    //     if (entry.actualWinnerId === entry.predictedWinnerId){
                    //         //update user's totalGuessesCorrect + 1
                    //         //update user's currentStreak + 1
                    //         // currentStreak
                    //         // check if current Streak is higher than longestStreak if so update longest streak, if not do nothing
                    //         //mark prediction as resolved 
                    //     }
                    //     else if (entry.actualWinnerId !== entry.predictedWinnerId){
                    //         //update user's totalGuessesIncorrect + 1
                    //         // set currentStreak to zero
                    //         // mark prediction as resoved
                    //     }
                    // } // end of entries that have actualWinner not null
                })
            } // end of function handleUnResPredictions
    

            function patchUserBasedOnPrediction(prediction, patchedUser){
                console.log("got to patch user")
                console.log("Prediction", prediction)
                console.log("patchedUser", patchedUser)


                fetch(`/users/${prediction.user_Id}`,{
                        method: 'PATCH',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(patchedUser)
                })
                .then((resp) =>{
                    if (!resp.ok){
                        throw new Error(`Failed to update item`)
                    }
                    return resp.json()
                })
                .then((data)=> {
                    console.log("Updated user:", data)
                })
            }



            function handleWinnerKnown(prediction){
                console.log('this is prediction in handleWinnerknown', prediction)
                if (prediction.actualWinnerId !==null){


                    if (prediction.actualWinnerId === prediction.predictedWinnerId){
                        console.log("The actual and predicted winners matched")
                        if (Number(prediction.user.currentStreak) + 1 > prediction.user.longestStreak){
                            console.log("The new streak is larger")
                            let patchedUser = {
                                totalScore: prediction.user.totalScore += 10,
                                currentStreak: prediction.user.currentStreak += 1,
                                totalGuessesCorrect: prediction.user.totalGuessesCorrect +=1,
                                longestStreak: prediction.user.longestStreak +=1 
                            }
                           patchUserBasedOnPrediction(prediction,patchedUser)
                        }
                        else {
                            console.log("The old streak is larger")
                            let patchedUser = {
                                totalScore: prediction.user.totalScore += 10,
                                currentStreak: prediction.user.currentStreak += 1,
                                totalGuessesCorrect: prediction.user.totalGuessesCorrect +=1,
                            }
                            patchUserBasedOnPrediction(prediction,patchedUser)
                        }
                    }
                    else{
                        console.log("the guess was incorrect")
                        let patchedUser = {
                            totalScore: prediction.user.totalScore -=10,
                            currentStreak: 0,
                            totalGuessesIncorrect: prediction.user.totalGuessesIncorrect +=1   
                        }
                        patchUserBasedOnPrediction(prediction,patchedUser)
                    }
                        

                 
                            let resolvedPrediction = {
                                isResolved: true
                            };
                            console.log("we made it past the first .then")


                             fetch (`/predictions/${prediction.id}`,{
                                method: 'PATCH',
                                headers:{
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(resolvedPrediction)
                            })
                            .then((resp) =>{
                                if (!resp.ok){
                                    throw new Error('Failed to update Prediction')
                                }
                                return resp.json();
                            })
                            .then((data)=> {
                                console.log("updated prediction", data)
                            })






                }
                    // if Actual winner is not known im just gonna return for now
                    else {
                        return 
                    }

                }

                return (
                    <div>
                        <h1>Testing</h1>
                    </div>
                

                )
                
                }
                
                export default LeaderBoard
                
                    // <div id="leaderBoard">
                    //     <div className="cata">
                    //         <h2 className="leaderBoardCata">Leaders ID</h2>
                    //         <h2 className="LeaderBoardCata">Correct %</h2>
                    //         <h2 className="LeaderBoardCata"># predicitons</h2>
                    //     </div>
                    //     {leaderboard.map((user, index) => (
                          
                    //             <div className="leaderEntry" key={index}>{`Rank ${index+1}: ${user.username} - ${user.percentage.toFixed(2)}% correct predictions - ${user.totalPredictions} predictions made`}</div>
                             
                    //     )
                        
                    // )}
                
                    // </div>
                
                

            
                    //         // function patchPrediction(respOkData){
            //         //     console.log(respOkData)
            
            //         //     const patchedPrediction ={
            //         //         actualWinnerId: respOkData.gameWinner_id,
            //         //         actualLoserId:  respOkData.gameLoser_id
            //         //     }
            //         //     console.log('had this game')
            //         //     console.log(patchedPrediction)
            
            //         //     fetch(`/predictions/${predictionData[i].id}`, {
            //         //         method: 'PATCH',
            //         //         headers:{
            //         //             'Content-Type': 'application/json',
            //         //         },
            //         //         body: JSON.stringify(patchedPrediction)
            //         //        })
            //         //        .then((resp) =>{
            //         //         if (!resp.ok) {
            //         //             throw new Error('Failed to update item')
            //         //         }
            //         //         return resp.json();
            //         //        })
            //         //        .then((data) => {
            //         //         console.log("updated item:", data);
            //         //        })
            //         // }










            








// const [predictionData, setPredictionData] = useState([]);
// const [predictiveLeaders, setPredictiveLeaders] = useState([]);
// const [users, setUsers] = useState([]);

        // useEffect(()=>{

        //     fetch('/predictions')
        //     .then((resp) => resp.json())
        //     .then(data =>{ setPredictionData(data)
        
        //     });
        

//         },[])


//         useEffect(()=>{
//             fetch('./leaders')
//             .then((resp)=> resp.json())
//             .then(data =>{setPredictiveLeaders(data) })
//         },[])

//         useEffect(()=>{
//             fetch('./users')
//             .then((resp)=> resp.json())
//             .then(data =>{setUsers(data) })
//         },[])


































// const userStats ={};
// predictionData.forEach(entry => {
//     // console.log('this is entry')
//     // console.log(entry)
//     const userId = entry.user.id;
//     const correctPrediction = entry.actualWinnerId === entry.predictedWinnerId;

//     if(!userStats[userId]){
//         userStats[userId] = {
//             username: entry.user.username,
//             totalPredictions: 0, 
//             correctPredictions: 0, 
//             percentage: 0,
//         };
//     }
//     userStats[userId].totalPredictions++;
//     userStats[userId].correctPredictions += correctPrediction ? 1 : 0;
// });

// const leaderboard = Object.values(userStats).map(stats => {
//     stats.percentage = (stats.correctPredictions / stats.totalPredictions) * 100;
//     return stats;
// });

// leaderboard.sort((a,b) => b.percentage -a.percentage);
    





// function resolvePredictions(predictionData){
//     for (let i =0; i<predictionData.length; i++){
//         if (predictionData[i].actualWinnerId === null){
//             fetch(`/games/${predictionData[i].game_Id}`)
//             .then(resp=> {
//                 if (!resp.ok){
//                     fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk=${predictionData[i].game_Id}`)
//                     .then((resp) => resp.json())
//                     .then(resp => {
//                         if (!resp.dates[0].games[0].teams.away.isWinner || !resp.dates[1] && resp.dates[1].games[0].teams.away.isWinner ){
//                            return Promise.reject("Game has no winner")
//                         }
//                     })
//                     .then(resp =>{
//                             console.log("this is the call to mlb resp", resp)
//                             console.log("made it past rejection")
                        
                        

//                         if ( resp.dates[0].games[0].teams.away.isWinner === true || (resp.dates[1] && resp.dates[1].games[0].teams.away.isWinner === true) ){

//                             const newGame ={

//                                     gamePk: predictionData[i].game_Id,
//                                     gameWinner_id: resp.dates[0].games[0].teams.away.team.id,
//                                     gameLoser_id:  resp.dates[0].games[0].teams.home.team.id

//                             }

//                         //    predictionData[i].actualWinnerId = resp.dates[0].games[0].teams.away.team.id
//                            fetch(`/games/${predictionData[i].game_Id}`, {
//                             method: 'POST',
//                             headers:{
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify(newGame)
//                            })
//                            .then((resp) =>{
//                             if (!Response.ok) {
//                                 throw new Error('Failed to post new game')
//                             }
//                             return Response.json();
//                            })
//                            .then((data) => {
//                             console.log("posted game:", data);
//                            })
//                         }
                        
//                         else if ( resp.dates[0].games[0].teams.home.isWinner === true || ( resp.dates[1] && resp.dates[1].games[0].teams.home.isWinner === true) ){
                        
//                             const newGame ={

//                                 gamePk: predictionData[i].game_Id,
//                                 gameWinner_id: resp.dates[0].games[0].teams.home.team.id,
//                                 gameLoser_id:  resp.dates[0].games[0].teams.away.team.id

//                         }
                        
//                         //    predictionData[i].actualWinnerId = resp.dates[0].games[0].teams.home.team.id
//                         fetch(`/games/${predictionData[i].game_Id}`, {
//                             method: 'POST',
//                             headers:{
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify(newGame)
//                            })
//                            .then((resp) =>{
//                             if (!resp.ok) {
//                                 throw new Error('Failed to post new game')
//                             }
//                             return resp.json();
//                            })
//                            .then((data) => {
//                             console.log("posted game:", data);
//                            })
//                         }
                        
//                     })  
                    
                    
                    
//                     .catch(err => console.error(err));
//                 }


//                 else if (resp.ok){
//                     let respOkData = resp.json()

//                     // return resp.json()
//                     patchPrediction(respOkData)
//                 }
                
                


//             }) 

//                 function patchPrediction(respOkData){
//                     console.log(respOkData)

//                     const patchedPrediction ={
//                         actualWinnerId: respOkData.gameWinner_id,
//                         actualLoserId:  respOkData.gameLoser_id
//                     }
//                     console.log('had this game')
//                     console.log(patchedPrediction)

//                     fetch(`/predictions/${predictionData[i].id}`, {
//                         method: 'PATCH',
//                         headers:{
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(patchedPrediction)
//                        })
//                        .then((resp) =>{
//                         if (!resp.ok) {
//                             throw new Error('Failed to update item')
//                         }
//                         return resp.json();
//                        })
//                        .then((data) => {
//                         console.log("updated item:", data);
//                        })
//                 }

            // .then( (data) => {

            //         console.log(data)

            //         const patchedPrediction ={
            //             actualWinnerId: data.gameWinner_id,
            //             actualLoserId:  data.gameLoser_id
                
            //     }

               
            //     // .then(resp => resp.json())
            //     console.log('had this game')
            //     // '/predictions/<int:id>'

            //     console.log(patchedPrediction)


            //     fetch(`/predictions/${predictionData[i].id}`, {
            //                     method: 'PATCH',
            //                     headers:{
            //                         'Content-Type': 'application/json',
            //                     },
            //                     body: JSON.stringify(patchedPrediction)
            //                    })
            //                    .then((resp) =>{
            //                     if (!resp.ok) {
            //                         throw new Error('Failed to update item')
            //                     }
            //                     return resp.json();
            //                    })
            //                    .then((data) => {
            //                     console.log("updated item:", data);
            //                    })

            //   }) 
    //     } //end if winner null
    // }   //end for loop 

// }       //end resolve predictions




// useEffect(()=>{
//     if (predictionData.length > 0){
//         // console.log('predicitons', predictionData)
//         resolvePredictions(predictionData)
//     }

// }, [predictionData]);






// useEffect(()=>{

//     fetch('/predictions')
//     .then((resp) => resp.json())
//     .then(data =>{ setPredictionData(data)
//         console.log(predictionData)
       
//     })
   

// },[]) //'/games'


// if (predictionData == []){
//     return(
//         <h1>Loading....</h1>
//     )
// }
// if (users == []){
//     return(
//         <h1>Loading....</h1>
//     )
// }

// function mapResults(predictionData){
//     predictionData.map(prediction =>{
//         <h3>{actualWinnerId}</h3>
//     })
// }


// console.log(leaderboard)



