
import { useState } from "react"


function BattingOrderAway({...dataLiveGame}){

const players = {}
const battingOrderAway = []



    function findPlayers(){
        for (const player in dataLiveGame.gameData.players){
            const playerObj = dataLiveGame.gameData.players[player];
            players[playerObj.fullName] = playerObj.id
        //    console.log(players)
        }
    }


    findPlayers()


    if (Object.keys(players).length === 0){
        return (
            <h1>...loading</h1>
            )
        }
        


                
            function createBattingOrderAwayNames(){

                for (let i = 0; i<dataLiveGame.liveData.boxscore.teams.away.battingOrder.length; i++){
                    for ( const playerEntry in players){
                        // console.log(playerEntry)
                        if (dataLiveGame.liveData.boxscore.teams.away.battingOrder[i] == players[playerEntry]){
                            battingOrderAway.push(playerEntry)
                        // console.log(battingOrderAway)
                        }
                    }
                }
            }

                    createBattingOrderAwayNames()               
            return(
                  <div className="awayLineups">
                    <div className="lineup">
                        <h3>Away Lineup</h3>

                                {battingOrderAway.map((batter)=>{
                                    return(
                                        <span key={batter} className="lineupBatter">{ batter }</span>
                                    )
                                })}
                    </div>
                 </div>

    )

}

export default BattingOrderAway
