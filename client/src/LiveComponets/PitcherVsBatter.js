function PitcherVsBatter({...dataLiveGame}){
    return(
        <div className="WrapperPitcherVsBatter">
            <div className="matchup">
                <div className="PitcherVsBatter">
                    <span >{`Pitching: `}</span>
                    <span>{dataLiveGame.liveData.plays.currentPlay.matchup.pitcher.fullName}</span>
                    <img className="vsImage" src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${dataLiveGame.liveData.plays.currentPlay.matchup.pitcher.id}/headshot/silo/current`} alt=''></img>
                </div>
                        <div className="vs-text-container">
                            <span id="VS">VS</span>

                        </div>

                <div className="PitcherVsBatter">
                    <span>{`Batting: `}</span>
                    <span>
                    {dataLiveGame.liveData.linescore.offense.batter.fullName}
                    </span>
                    <img className="vsImage" src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${dataLiveGame.liveData.linescore.offense.batter.id}/headshot/silo/current`} alt=''></img>
                </div>

            </div>

            <div className="onDeckDiv">
                <span>
                    {`On Deck: `}
                </span>
                <span>
               {dataLiveGame.liveData.linescore.offense.inHole.fullName}
                </span>
                <img className="OnDeck" src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${dataLiveGame.liveData.linescore.offense.inHole.id}/headshot/silo/current`} alt='On deck batter'></img>
            </div>


        </div>
    )
}

export default PitcherVsBatter