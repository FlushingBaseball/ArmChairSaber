function LeaderBoard(){



    // Major issue is now that we keep asking for unresolved games untill there no more
    // if a game is inProgress or inPreview were going to keep asking about if forever
    //also a game that hasn't been completed prediction was marked as resolved and graded with winners assigned, 
    //this must be because of the use of else? and not if else???

     /**
      * fetchedPrediction is called in the returned JSX
      *     handleUnResolvedPredictions is called on that fetched prediction
      *         if winner is known:
      *             handleWinnerKnown is called
      *                 patchUserBasedOnPrediction is called which updates the users Score,Streak,etc
      *                 patchPrediction is called: to set the prediction to resolved
      *                 
      *                 
      *         if winner is not known:
      *             handleWinnerNotKnown is called which calls the backend for the gamePK:
      *                 if the back end doesn't have it:
                            handleMLBResponse is called: which takes the MLB response and edits the predictions to have ActualWinner and ActualLoser
                                patchPrediction: recieves the prediction and patches is
                                postNewGame: recieves the game for the database
                        
                        if the backend Does have it:

      *                     
      *    Further Development / re-rewrite in the offseason

      */
    
    let fetchedPredictionData = '';

    async function fetchedPrediction() {
        try {
            const resp = await fetch('/nextUnresolvedPrediction');
            if (!resp.ok) {
                throw new Error("Error Response Received");
            }

            const data = await resp.json();
            if (!data) {
                return;
            }

            handleUnResolvedPredictions(data);
            await fetchedPrediction(); //  fetching until no more
        } catch (error) {
            console.error("Error", error);
        }
    }
    
    
    
    function handleUnResolvedPredictions(fetchedPredictionData){
        console.log("this is URP in handleUnResolvedPredictions", fetchedPredictionData)
        if (fetchedPredictionData.actualWinnerId !==null){
            handleWinnerKnown(fetchedPredictionData)
        }
        else{
            handleWinnerNotKnown(fetchedPredictionData)
        }
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

                            patchPrediction(prediction, resolvedPrediction)
                            // console.log("we made it past the first .then")



                } // End of Winner Not Null 
                
                // if Actual winner is not known im just gonna return for now
                    else {
                        return 
                    }
                } // end of handleWinnerKnown


                function patchPrediction(prediction, patchedPrediction){
                    console.log("In Patch Prediction")
                    console.log("This is prediction", prediction)
                    console.log("This is patchedPrediction", patchedPrediction)
                    fetch (`/predictions/${prediction.id}`,{
                        method: 'PATCH',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(patchedPrediction)
                    })
                    .then((resp) =>{
                        if (!resp.ok){
                            throw new Error('Failed to update Prediction')
                        }
                         resp.json()
                    })
                    .then(data=> {
                        console.log("updated prediction", data)
                    })

                }
                
                function handleWinnerNotKnown(fetchedPredictionData){
                    if (fetchedPredictionData.actualWinnerId === null){
                        console.log("In handleWinnerNotKnown")
                        fetch(`/games/${fetchedPredictionData.game_Id}`)
                        .then((resp) =>{
                            if (!resp.ok){
                                console.log("didn't have this game on backend")
                                fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&gamePk=${fetchedPredictionData.game_Id}`)
                                .then((resp)=> resp.json())
                                .then(resp =>{
                                    console.log("This is the mlb response", resp)
                                    /**
                                        This is checking if the property even exists, if a team has lost it still has this property, but marked to false
                                        hence why checking if the property exists is sufficent to see if the game is complete and to end processing if a winner isn't offical
                                        the second date is incase of games that are resumed at a latter date etc
                                     */
                                    if (!resp.dates[0].games[0].teams.away.isWinner && (resp.dates[1] && !resp.dates[1].games[0].teams.away.isWinner)){
                                        return Promise.reject("Game has no winner, Promise Rejected")
                                    }
                                    else {
                                        return resp
                                    }
                                })
                                .then((resp) => {
                                    console.log("Game Has a winner on MLB data", resp)
                                    handleMLBResponse(resp,fetchedPredictionData )
                                })

                            }
                            else if (resp.ok){
                                console.log("Had This Game on backend: Calling patchPrediction with the Data");
                                resp.json()
                                .then((backendRespOkData) =>{
                                    const backEndPatchedPrediction={
                                        actualWinnerId: backendRespOkData.gameWinner_id,
                                        actualLoserId:  backendRespOkData.gameLoser_id
                                    }
                                    patchPrediction(fetchedPredictionData, backEndPatchedPrediction)
                                })
                                .catch((error) =>{
                                    console.error("error with JSON response:", error)
                                })
                            }
                        })
                    }
                }






                
                function handleMLBResponse(resp,fetchedPredictionData){
                    console.log("got to handleMLBResponse", resp)

                    //check if it's a multidate game
                   if (resp.dates[1]){
                    console.log("Multi date game")
                    if (resp.dates[1].games[0].teams.away.isWinner === true){
                        console.log("away was the winner")
                        let updatedPrediction = {
                            actualWinnerId: resp.dates[1].games[0].teams.away.id,
                            actualLoserId: resp.dates[1].games[0].teams.home.id,
                        };
                        let newGame ={
                            gamePk: resp.dates[1].games[0].gamePk,
                            gameWinner_id: resp.dates[1].games[0].teams.away.team.id,
                            gameLoser_id:  resp.dates[1].games[0].teams.home.team.id
                    }

                        patchPrediction(fetchedPredictionData, updatedPrediction)
                        postNewGame(newGame)

                    }
                    else{
                        console.log("Home was the winner")
                        let updatedPrediction = {
                            actualWinnerId: resp.dates[1].games[0].teams.home.id,
                            actualLoserId: resp.dates[1].games[0].teams.away.id,
                        };
                        let newGame ={
                            gamePk: resp.dates[1].games[0].gamePk,
                            gameWinner_id: resp.dates[1].games[0].teams.home.team.id,
                            gameLoser_id:  resp.dates[1].games[0].teams.away.team.id
                    }

                        patchPrediction(fetchedPredictionData, updatedPrediction)
                        postNewGame(newGame)

                    }
                   }//end of multi day game cases
                   else {
                    console.log("game took place over one day")
                    if (resp.dates[0].games[0].teams.away.isWinner === true){
                        console.log("away was the winner")
                        let updatedPrediction = {
                            actualWinnerId: resp.dates[0].games[0].teams.away.id,
                            actualLoserId: resp.dates[0].games[0].teams.home.id,
                        };
                        let newGame ={
                            gamePk: resp.dates[0].games[0].gamePk,
                            gameWinner_id: resp.dates[0].games[0].teams.away.team.id,
                            gameLoser_id:  resp.dates[0].games[0].teams.home.team.id
                    }

                        patchPrediction(fetchedPredictionData, updatedPrediction)
                        postNewGame(newGame)

                    }
                    else{
                        console.log("home was the winner")
                        let updatedPrediction = {
                            actualWinnerId: resp.dates[0].games[0].teams.home.id,
                            actualLoserId: resp.dates[0].games[0].teams.away.id,
                        };
                        let newGame ={
                            gamePk: resp.dates[0].games[0].gamePk,
                            gameWinner_id: resp.dates[0].games[0].teams.home.team.id,
                            gameLoser_id:  resp.dates[0].games[0].teams.away.team.id
                    }
                        patchPrediction(fetchedPredictionData, updatedPrediction)
                        postNewGame(newGame)
                    }
                   } //end of single game
                } //end of handleMLBResponse



                    function postNewGame(newGame){
                        console.log("in postNewGame this is newGame", newGame)
                        fetch(`/games/${newGame.gamePk}`, {
                            method: 'POST',
                            headers:{
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(newGame)
                                })
                        .then((resp) =>{
                            if (!resp.ok) {
                                throw new Error('Failed to post new game')
                            }
                            return resp.json();
                        })
                        .then((data) => {
                            console.log("posted game:", data);
                        })
                        .catch((err) => console.error(err));
                    }
                                        










                return (
                    <div>
                        <h1>Testing ability to grade predictions</h1>
                        {fetchedPrediction()}
                    </div>
                )
                
            } // end of LeaderBoard
                
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
    






                        
                        /** Pick back up here */
        



// useEffect(()=>{
//     if (predictionData.length > 0){
//         // console.log('predicitons', predictionData)
//         resolvePredictions(predictionData)
//     }

// }, [predictionData]);







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



