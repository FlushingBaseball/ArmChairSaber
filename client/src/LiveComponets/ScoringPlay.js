function ScoringPlay({...dataLiveGame}){

    function mapScoringPlays(){

        if (dataLiveGame.liveData.plays.scoringPlays){
           return dataLiveGame.liveData.plays.scoringPlays.map((sPlay, index) => (
                // console.log(dataLiveGame.liveData.plays.allPlays[sPlay].result.description)

              
                    <div key={index}>
                       <span className="score">{`${dataLiveGame.liveData.plays.allPlays[sPlay].result.homeScore}-${dataLiveGame.liveData.plays.allPlays[sPlay].result.awayScore}`}</span>
                       <span className="ScoringPlays">{dataLiveGame.liveData.plays.allPlays[sPlay].result.description}</span> 
                    </div>
           ));
        }
        else{

        }


    }
    

    return(
        <div className="WrapperScoringPlays">
            <h2 className="scoreheader">Scoring Plays</h2>
            {mapScoringPlays()}
        </div>
    )
}

export default ScoringPlay