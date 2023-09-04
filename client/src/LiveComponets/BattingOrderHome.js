import { useState } from "react"


function BattingOrderHome({...dataLiveGame}){

const players = {}
const battingOrderHome =[]



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
         

                function createBattingOrderHomeNames(){

                    for (let i = 0; i<dataLiveGame.liveData.boxscore.teams.home.battingOrder.length; i++){
                        for ( const playerEntry in players){
                            // console.log(playerEntry)
                            if (dataLiveGame.liveData.boxscore.teams.home.battingOrder[i] == players[playerEntry]){
                                battingOrderHome.push(playerEntry)
                            // console.log(battingOrderAway)
                            }
                        }
                    }

                }
                createBattingOrderHomeNames()
            

                
            
            return(
                  <div className="homeLineups">
                    <div className="lineup">
                    <h3>Home Lineup</h3>                       
                            {battingOrderHome.map((batter)=>{
                                return(
                                    <span
                                     key={batter}
                                      className={`lineupBatter ${batter === dataLiveGame.liveData.linescore.offense.batter.fullName ? 'BatterActive' : ''}`}
                                      >
                                        { batter }</span>
                                )
                            })}                       
                    </div>  
                 </div>
    )

}

export default BattingOrderHome
