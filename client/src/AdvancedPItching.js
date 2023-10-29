import { useEffect, useState } from "react"

//wins
//wild ptiches
//walks per 9
//percentages of pitches that are strikes
//pitches per inning
// era over past 10 apperances
//batters faces
// ground outs to air outs
//undefined batters hit by pitches


function AdvancedPitching(){
    const [fetchedGameData, setFetchedGameData] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(121);
    const [teamLogo, setTeamLogo] = useState(121)
    const TeamImageSrc=`./Images/logos/${teamLogo}.svg`;

    useEffect(()=>{
        fetch(`https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=pitching&teamId=${selectedTeam}`)
        .then((resp) => resp.json())
        .then(data => {
            setFetchedGameData(data.stats[0].splits)
        })
    },[selectedTeam])


    if (!fetchedGameData.length){
        return (<h1>Loading...</h1>)
    }


    function handleTeamChange(event){
        const newTeamValue = parseInt(event.target.value)
        setSelectedTeam(newTeamValue)
        setTeamLogo(newTeamValue)
    }



function mapPlayer(){
    if (fetchedGameData.length > 1){
        return  fetchedGameData.map(user => (
            <div key={user.player.id} className="batterCard">
                <img className={`batterImg10 Colors${teamLogo}`} alt={`Headshot of ${user.player.fullName}`} src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${user.player.id}/headshot/silo/current`}></img>
                <span className="ABSpanName">{user.player.fullName}</span>
                <span className="ABSpan">{`${user.stat.wins} : Wins`}</span>
                <span className="ABSpan">{`${user.stat.wildPitches} : Wild Pitches`}</span>
                <span className="ABSpan">{`${user.stat.walksPer9Inn} : Walks Per 9 Innings `}</span>
                <span className="ABSpan">{`${user.stat.strikePercentage} : Percentage of Pitches that are strikes`}</span>
                <span className="ABSpan">{`${user.stat.pitchesPerInning} : Pitches Per Inning`}</span>
                <span className="ABSpan">{`${user.stat.era} :  ERA over the past 10 apperances`}</span>
                <span className="ABSpan">{`${user.stat.battersFaced} : Batters Faced`}</span>
                <span className="ABSpan">{`${user.stat.groundOutsToAirouts} : Ground outs to Air outs`}</span>
                <span className="ABSpan">{`${user.stat.hitByPich} : batters hit by pitches`}</span>
                <span className="ABSpan">{`${user.stat.hitsPer9Inn} : Hits per 9`}</span>
                <span className="ABSpan">{`${user.stat.whip} Walks and Hits per inning pitched`}</span>
                <span className="ABSpan">{`${user.stat.slg} Slugging against`}</span>
            </div>
        ))
    }
}
          


return (

<div className="WrapperadvancedBatter">
<select className="AdvancedSelect"value={selectedTeam} onChange={handleTeamChange}>
                <option value={108}>Los Angeles Angels</option>
                <option value={109}>Arizona Diamondbacks</option>
                <option value={110}>Orioles</option>
                <option value={111}>Red Sox</option>
                <option value={112}>Cubs</option>
                <option value={113}>Reds</option>
                <option value={114}>Indians</option>
                <option value={115}>Rockies</option>
                <option value={116}>Tigers</option>
                <option value={117}>Astros</option>
                <option value={118}>Royals</option>
                <option value={119}>Dodgers</option>
                <option value={120}>Nationals</option>
                <option value={121}>Mets</option>
                <option value={133}>Athletics</option>
                <option value={134}>Pirates</option>
                <option value={135}>Padres</option>
                <option value={136}>Mariners</option>
                <option value={137}>Giants</option>
                <option value={138}>Cardinals</option>
                <option value={139}>Rays</option>
                <option value={140}>Rangers</option>
                <option value={141}>Blue Jays</option>
                <option value={142}>Twins</option>
                <option value={143}>Phillies</option>
                <option value={144}>Braves</option>
                <option value={145}>White Sox</option>
                <option value={146}>Marlins</option>
                <option value={147}>Yankees</option>
                <option value={158}>Brewers</option>
            </select>
<div className="displayWrap">
    <img className="batterTeamDisplay" alt={'Team Logo'} src={TeamImageSrc}></img>
    <h1 className="headerBat">Advanced Pitching Metrics by team</h1>
    <h3 className="headerBat">Rolling Ten Day average</h3>
</div>
    {mapPlayer()}
</div>

)

}

export default AdvancedPitching