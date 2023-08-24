function LiveBoxScore({...dataLiveGame}){

    return(
        <div className="boxElement">
            <table className="BoxScore">
                <tbody>
                <tr>
                    <th></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>R</th>
                    <th>H</th>
                    <th>E</th>
                </tr>
                <tr>
                    <th><img className="boxLogo" src={`/Images/logos/${dataLiveGame.gameData.teams.away.id}.svg`}></img></th>
                    <th>{dataLiveGame.liveData.linescore.innings[0] ? dataLiveGame.liveData.linescore.innings[0].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[1] ? dataLiveGame.liveData.linescore.innings[1].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[2] ? dataLiveGame.liveData.linescore.innings[2].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[3] ? dataLiveGame.liveData.linescore.innings[3].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[4] ? dataLiveGame.liveData.linescore.innings[4].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[5] ? dataLiveGame.liveData.linescore.innings[5].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[6] ? dataLiveGame.liveData.linescore.innings[6].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[7] ? dataLiveGame.liveData.linescore.innings[7].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[8] ? dataLiveGame.liveData.linescore.innings[8].away.runs : " "}</th>
                    <th>{dataLiveGame.liveData.boxscore.teams.away.teamStats.batting.runs}</th>
                    <th>{dataLiveGame.liveData.boxscore.teams.away.teamStats.batting.hits}</th>
                    <th>{dataLiveGame.liveData.boxscore.teams.away.teamStats.fielding.errors}</th>
                </tr>
                <tr>
                    <th><img className="boxLogo" src={`/Images/logos/${dataLiveGame.gameData.teams.home.id}.svg`}></img></th>
                    <th>{dataLiveGame.liveData.linescore.innings[0] ? dataLiveGame.liveData.linescore.innings[0].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[1] ? dataLiveGame.liveData.linescore.innings[1].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[2] ? dataLiveGame.liveData.linescore.innings[2].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[3] ? dataLiveGame.liveData.linescore.innings[3].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[4] ? dataLiveGame.liveData.linescore.innings[4].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[5] ? dataLiveGame.liveData.linescore.innings[5].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[6] ? dataLiveGame.liveData.linescore.innings[6].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[7] ? dataLiveGame.liveData.linescore.innings[7].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.linescore.innings[8] ? dataLiveGame.liveData.linescore.innings[8].home.runs : " "}</th>
                    <th>{dataLiveGame.liveData.boxscore.teams.home.teamStats.batting.runs}</th>
                    <th>{dataLiveGame.liveData.boxscore.teams.home.teamStats.batting.hits}</th>
                    <th>{dataLiveGame.liveData.boxscore.teams.home.teamStats.fielding.errors}</th>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LiveBoxScore