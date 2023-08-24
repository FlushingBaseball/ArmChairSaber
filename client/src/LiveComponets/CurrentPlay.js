function CurrentPlay({...dataLiveGame}){

    return(
        <div className="currentPlay">
            <span className="playSpan">{`The Play is ${dataLiveGame.liveData.plays.currentPlay.about.isComplete = true ? "Complete" : "In Progress"}`}</span>
            <span className="playSpan">{dataLiveGame.liveData.plays.currentPlay.result ? dataLiveGame.liveData.plays.currentPlay.result.description : "In Progress"}</span>
            <span className="playSpan">{dataLiveGame.liveData.plays.currentPlay.result ? dataLiveGame.liveData.plays.currentPlay.result.event : "In Progress"}</span>
        </div>
    )
}

export default CurrentPlay