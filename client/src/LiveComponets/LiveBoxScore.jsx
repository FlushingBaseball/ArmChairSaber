function LiveBoxScore({...dataLiveGame}){


// function makeTable(team){
//     if (dataLiveGame.liveData.linescore.innings){
//         return  dataLiveGame.liveData.linescore.innings.map((inning, index) =>{
//             <td key={index}>{ dataLiveGame.liveData.linescore.innings[index].away.runs}</td>
//         })
//     }
// }


    return(
        <div className="boxElement">
            <table className="BoxScore">
                <thead className="live-box-score-head">
                    <tr className="live-box-score-row">
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
                </thead>
                <tbody>
                <tr>
                    <td><img alt="Team Logo" className="boxLogo" src={`/Images/logos/${dataLiveGame.gameData.teams.away.id}.svg`}></img></td>
                    <td>{dataLiveGame.liveData.linescore.innings[0] ? dataLiveGame.liveData.linescore.innings[0].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[1] ? dataLiveGame.liveData.linescore.innings[1].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[2] ? dataLiveGame.liveData.linescore.innings[2].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[3] ? dataLiveGame.liveData.linescore.innings[3].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[4] ? dataLiveGame.liveData.linescore.innings[4].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[5] ? dataLiveGame.liveData.linescore.innings[5].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[6] ? dataLiveGame.liveData.linescore.innings[6].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[7] ? dataLiveGame.liveData.linescore.innings[7].away.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[8] ? dataLiveGame.liveData.linescore.innings[8].away.runs : " "}</td>
                    {/* {makeTable()} */}
                    <td>{dataLiveGame.liveData.boxscore.teams.away.teamStats.batting.runs}</td>
                    <td>{dataLiveGame.liveData.boxscore.teams.away.teamStats.batting.hits}</td>
                    <td>{dataLiveGame.liveData.boxscore.teams.away.teamStats.fielding.errors}</td>
                </tr>
                <tr>
                    <td><img  alt="Team Logo" className="boxLogo" src={`/Images/logos/${dataLiveGame.gameData.teams.home.id}.svg`}></img></td>
                    <td>{dataLiveGame.liveData.linescore.innings[0] ? dataLiveGame.liveData.linescore.innings[0].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[1] ? dataLiveGame.liveData.linescore.innings[1].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[2] ? dataLiveGame.liveData.linescore.innings[2].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[3] ? dataLiveGame.liveData.linescore.innings[3].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[4] ? dataLiveGame.liveData.linescore.innings[4].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[5] ? dataLiveGame.liveData.linescore.innings[5].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[6] ? dataLiveGame.liveData.linescore.innings[6].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[7] ? dataLiveGame.liveData.linescore.innings[7].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.linescore.innings[8] ? dataLiveGame.liveData.linescore.innings[8].home.runs : " "}</td>
                    <td>{dataLiveGame.liveData.boxscore.teams.home.teamStats.batting.runs}</td>
                    <td>{dataLiveGame.liveData.boxscore.teams.home.teamStats.batting.hits}</td>
                    <td>{dataLiveGame.liveData.boxscore.teams.home.teamStats.fielding.errors}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LiveBoxScore