function LivePitchData ({...dataLiveGame}){

  function mapPitches(){
        // console.log(dataLiveGame.liveData.plays.currentPlay.playEvents)
        return(
            dataLiveGame.liveData.plays.currentPlay.playEvents.map((play)=>{
                if (play.isPitch === true){
                  return(
                        <div key={play.pitchData.breaks.spinRate ? play.pitchData.breaks.spinRate : play.pitchData.coordinates  } className="PitchWrapper">
                            <div className='PitchType'>
                                <span className='PitchDescription'>{play.details.type && play.details.type.hasOwnProperty('description') ? play.details.type.description : null}</span>
                                <span className={`PitchCall ${play.details.isBall ? "CalledBall" : "" }`}>{play.details.call.description}</span>
                            </div>
                            
                            <div className='PitchBreak'>
                                <span className="LivePitch">{`Break angle: ${play.pitchData.breaks.breakAngle}`}</span>
                                <span className="LivePitch">{`Spin Direction: ${play.pitchData.breaks.spinDirection}`}</span>
                                <span className="LivePitch">{`Spin Rate: ${play.pitchData.breaks.spinRate}`}</span>
                            </div>
                            <div className='PitchVelo'>
                                <span className="LivePitch">{`Start Speed: ${play.pitchData.startSpeed}`}</span>
                                <span className="LivePitch">{`End Speed: ${play.pitchData.endSpeed}`}</span>
                            </div>
    
                        </div>
                  )
                }
                    //Return ? based on warning? 
            })
        )
}
    return(
        <div className='pitches'>
            {mapPitches()}
        </div>
    )
}

export default LivePitchData