function LiveBases({...dataLiveGame}){


    let runnerOnFirst = false;
    let runnerOnSecond = false;
    let runnerOnThird = false;
    let nameRunnerOnFirst = 'none';
    let nameRunnerOnSecond = 'none';
    let nameRunnerOnThird = 'none';

    if (dataLiveGame.liveData.linescore.offense.first){
        runnerOnFirst = true
        nameRunnerOnFirst = dataLiveGame.liveData.linescore.offense.first.fullName
    }
    if (dataLiveGame.liveData.linescore.offense.second){
        runnerOnSecond = true
        nameRunnerOnSecond = dataLiveGame.liveData.linescore.offense.second.fullName
    }
    if (dataLiveGame.liveData.linescore.offense.third){
        runnerOnThird = true
        nameRunnerOnThird = dataLiveGame.liveData.linescore.offense.third.fullName
    }



    return(
<div className="AllBaseInfoWrapper">
        <div className="Bases">
            <div id="firstBase" className={`base ${dataLiveGame.liveData.linescore.offense.first ? 'activeBase' : 'inactiveBase'}`}></div>
            <div id="secondBase" className={`base ${dataLiveGame.liveData.linescore.offense.second ? 'activeBase' : 'inactiveBase'}`}></div>
            <div id="thirdBase" className={`base ${dataLiveGame.liveData.linescore.offense.third ? 'activeBase' : 'inactiveBase'}`}></div>
        </div>
        <div>
            <h3>On Base</h3>
            <span className="onBaseSpan">{`On First: ${nameRunnerOnFirst} `}</span>
            <span className="onBaseSpan">{`On Second: ${nameRunnerOnSecond} `}</span>
            <span className="onBaseSpan">{`On Third: ${nameRunnerOnThird} `}</span>
        </div>
</div>

    )
}


export default LiveBases