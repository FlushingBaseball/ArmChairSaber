import {useState, useEffect} from "react"

function UserHome({user}){
console.log('user in userHOme is', user)

// const userWins = user.totalGuessesCorrect;
// const userLoses = user.totalGuessesIncorrect;
const [userInfo, SetUserInfo] = useState('')


useEffect(()=>{
  fetch(`/users/${user.id}`)
  .then((resp)=>resp.json())
  .then((data)=>{
    SetUserInfo(data)
  })
},[])

useEffect(()=>{
  console.log(userInfo)
},[userInfo])


function mapPredictions(){


 return user.User_Predictions.map((prediction) =>{
      return(
        <div className="WrapperSinglePrediction">
            <span className="predictionSpan">{`You Guessed ${prediction.predictedWinnerId}
             would win ${prediction.game_Id}
             and ${prediction.actualWinnerId} Won
             `}
            
            </span>

        </div>
      )
  })
}

  return (
    <div>
      <h1>Welcome home {user.username}</h1>
      <h4>Your  {user.User_Predictions.length} predictions</h4>
      <h4>You guess correctly "cant put anything here untill resolutions are fixed" % of the time</h4>
      <h4>You have made {user.totalGuessesCorrect} Correct predictions</h4>
      <h4>You have made {user.totalGuessesIncorrect} Incorrect predictions</h4>
      {mapPredictions()}
    </div>
  )
}

export default UserHome