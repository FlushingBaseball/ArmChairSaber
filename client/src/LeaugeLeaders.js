import { useEffect, useState } from "react"

function LeagueLeaders(){

const [fetchedGameData, setFetchedGameData] = useState('');
const [selectedCata, setSelectedCata] = useState('wildPitch')


    useEffect(()=>{
        fetch(`https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=${selectedCata}&sportId=1&limit=20&season=2023&fields=leagueLeaders,leaders,rank,value,team,name,league,name,person,id,fullName`)
        .then((resp) => resp.json())
        .then(data => {
            setFetchedGameData(data.leagueLeaders[0].leaders)
        })

    },[selectedCata])

    function handleCataChange(event){
        const newCataValue = event.target.value
        setSelectedCata(newCataValue)
    }

    function mapPlayer(){

        if (fetchedGameData.length > 1){
        
        
            return  fetchedGameData.map(player => (
                <div key={player.person.fullName} className="batterCard">
                    <img alt={`$Photo of ${player.person.fullName}`} className="batterImg10" src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/silo/current`}></img>
                    <span className="ABSpan">{`Leauge: ${player.league.name} `}</span>
                    <span className="ABSpan">{`${player.team.name}`}</span>
                    <span className="ABSpanName">{player.person.fullName}</span>
                    <span className="ABSpan">{`${selectedCata.split(/(?=[A-Z])/).join(" ").toUpperCase()} : ${player.value}`}</span> 
                </div>
            ))
        
        }
        
        
        }
               

return(
    <div>
        <h1>Leauge Leaders</h1>
        <div className="WrapperadvancedBatter">
<select className="selectteamBat" id="selectedCata" value={selectedCata} onChange={handleCataChange}>
                <option value={"homeRuns"}>Home Runs</option>
                <option value={"stolenBases"}>StolenBases</option>
                <option value={"wildPitch"}>Wild Pitch</option>
                <option value={"catcherEarnedRunAverage"}>Catcher ERA </option>
                <option value={"errors"}>Errors</option>
                <option value={"balk"}>Balks</option>
            </select>
            {mapPlayer()}
            </div>
    </div>
)

}

export default LeagueLeaders