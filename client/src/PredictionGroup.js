import { useState } from "react"

function PredictionGroup({game, user, key, setPredictedWinner}){


const [selectedValue, setSelectedValue] = useState('')
const [notSelectedValue, setNotSelectValue] = useState(undefined)
const [submitNotSignedIn, setSubmitNotSignedIn] = useState(false)

const checkValue1 = Number(game.teams.home.team.id);
const checkValue2 = Number(game.teams.away.team.id);

function handleTeamSelectRadioChange (event) {
    setSelectedValue(event.target.value)

    if (Number(event.target.value) === checkValue1){
        setNotSelectValue(checkValue2)
    }
    else if (Number(event.target.value) === checkValue2){
        setNotSelectValue(checkValue1)
    }
    else{
        console.Error("Neither team Id made it into NotSelectValue")
    }

};



function handlePredictionSubmit (){

    if (user===null){
        alert("You need to sign in to submit predictions")
        setSubmitNotSignedIn(true);
        setTimeout(() => setSubmitNotSignedIn(false), 2000);
    }
    else {
        const newGame = {
            gamePk: game.gamePk,
            gameWinner_id: null,
            gameLoser_id: null
        }
        fetch(`/api/games/${game.gamePk}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(newGame)
        })
        .then((resp) => {
            if (!resp.ok){
                resp.json()
                .then(errorData=>{
                    console.error(errorData);
                    return errorData
                })
            }
            else if (resp.ok){
                resp.json()
                .then((data)=>{
                    console.log(data)
                })
    
            }
        })
    
    
    
    
    
    
    
    
        const postPrediction = {
            game_Id: game.gamePk,
            user_Id: user.id,
            predictedWinnerId: Number(selectedValue),
            predictedLoserId: Number(notSelectedValue)
        };
        console.log(`postPrediction is:`)
        console.log(postPrediction)
        
        fetch('/predictions', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(postPrediction)
        })
        .then((response) =>{
            if (!response.ok){
    
                if (response.status === 422){
                    return response.json().then(errorData=>{
                        console.error(errorData);
                        return errorData
                    })
                } 
                else if (response.status === 400){
                    return response.json().then(errorData =>{
                        console.error(errorData);
                        return errorData
                    })
                }
                else {
                    return response.json().then(errorData =>{
                        console.error(errorData);
                        return errorData
                    })
                }
            }
            else if (response.ok){
                fetch(`/users/${user.id}`, {
                    method: 'PATCH',
                    headers:{
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    totalNumGuesses : user.totalNumGuesses += 1
                })
            })
            .then((resp) =>{
                if (!resp.ok) {
                    throw new Error('Failed to update user total num predictions')
                }
                return resp.json();
            })
            .then((data) => {
                console.log("updated user:", data);
    
               })
                         }
    
            return response.json();
    
        })
        .then(response => {
            
            setPredictedWinner(response.predictedWinnerId)
            console.log(`Selected Value: ${selectedValue}`)
    })
    
        .catch(error =>{
            console.error('a weird error occurred exiting promise chain:', error)
        })


    }

}

    return (
        <div className={`predictiveinfoGroup ${submitNotSignedIn ? "invalidEntry" : null}`}>
            <div className="WrapperPredictionRadios">
                <label
                className="radioButtonLabel"
                >
                    <input 
                        className="radioButton"
                        type="radio"
                        name={key}
                        value={game.teams.home.team.id}
                        checked={selectedValue === `${game.teams.home.team.id}`}
                        onChange={handleTeamSelectRadioChange}
                    />
                   {game.teams.home.team.name}
            </label>
                <label
                className="radioButtonLabel"
                >
                    <input
                        className="radioButton" 
                        type="radio"
                        name={key}
                        value={game.teams.away.team.id}
                        checked={selectedValue === `${game.teams.away.team.id}`}
                        onChange={handleTeamSelectRadioChange}
                    />
                    {game.teams.away.team.name}
                 </label>
            </div>
            <br />
            <button
                 onClick={handlePredictionSubmit}
                 className="SubmitButton"
                 
                 >
                    Submit Predictions
                </button>
        </div>

    );

}


export default PredictionGroup