import { useState, useEffect } from "react"
import Search from "../UtilityComponents/Search"
import FieldingCard from "./FieldingCard"

// CORS Issue: Savant has changed their CORS Policy: Will circle back soon

function FieldingSaber({searchPlayer, setSearchPlayer}){
    const [fieldingData, setfieldingData] = useState('')
    const [selectedSeason, setSelectedSeason] = useState(2023)
    // const [selectedPlayer, setSelectedPlayer] = useState(607043)

    let [totalDistance, setTotalDistance] = useState(1);
    let [longestDistance, setLongestDistance] = useState(-Infinity);

    let totalSpeed =1;
    let numPlays = 1;
    const [averageSpeed, setAverageSpeed] =useState(1);


    const fielderImage =searchPlayer ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${searchPlayer}/headshot/silo/current` : '/Images/default-batter.svg'

    const [fetchedPlayers, setFetchedPlayers] = useState('')
//2023 23.941 2023 28.599 2021 28.766
// 27.941 

//judge 27.509 2021 27.261 2023 26.441

    useEffect(()=>{
        setTotalDistance(0)
        setAverageSpeed(0)
        totalSpeed=0;
        numPlays=0;
        setLongestDistance(0)
        fetch(`https://baseballsavant.mlb.com/player-services/range?playerId=${searchPlayer}&season=${selectedSeason}&playerType=fielder`)
            .then((resp) => resp.json())
            .then(data => {setfieldingData(data)
            })
    },[searchPlayer,selectedSeason])


    useEffect(()=>{
        fetch('/api/players')
        .then( (resp)=> resp.json())
        .then((data) =>{
            setFetchedPlayers(data)
        })
    },[])
    
    
    useEffect(()=>{
        calculateFieldingMetrics()
    },[fieldingData])


function calculateFieldingMetrics(){
    for(let i =0; i<fieldingData.length; i++){
        
        for (const key in fieldingData[i]){
            if (key === 'sprint_speed'){
                totalSpeed += Number(fieldingData[i][key])
                numPlays +=1;
            }
            else if (key === 'distance'){
                let playDistance =  Number(fieldingData[i][key])
                // console.log(`numPlays: ${numPlays}`)
                setTotalDistance(totalDistance += playDistance) 
                if (longestDistance < playDistance){
                    setLongestDistance(playDistance)
                }
            }
            // if (key == 'sprint_speed'){
                //     // console.log(key)
                //     // console.log(key[i][key])
                //     Number(fieldingData[i][key]) > longestDistance ? longestDistance = Number(fieldingData[i][key]) : null
            //     totalDistance += Number(fieldingData[i][key])
            //     // console.log(`The Players Average Sprint Speed is ${totalSpeed/fieldingData.length}`)
            // }
            
        }
    }
    setAverageSpeed(totalSpeed/numPlays)
    // console.log(`85 total Speed: ${totalSpeed}`)
    // console.log(`86 total Distance: ${totalDistance}`)
    console.log(fieldingData)
}


    const handleSeasonChange = (event) =>{
        const {value} = event.target;
        setSelectedSeason(value)
        calculateFieldingMetrics()
    }





if(fieldingData.length < 1){
    return(
        <h1>Loading...</h1>
    )
}

    return(

        <div className="WrappersaberField">
            <div className="topLineWrapper">

        <div>
            <label htmlFor="seasonSelect">Select a Season:</label>
            <select id="seasonSelect" value={selectedSeason} onChange={handleSeasonChange}>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
            </select>
            <p>Selected Season: {selectedSeason}</p>
        </div>

        <div>
            <Search searchPlayer={searchPlayer} setSearchPlayer={setSearchPlayer} fetchedPlayers={fetchedPlayers} setFetchedPlayers={setFetchedPlayers} />
        </div>


            </div>

        <div>
        <FieldingCard fielderImage={fielderImage} fieldingData={fieldingData} averageSpeed={averageSpeed} totalDistance={totalDistance} longestDistance={longestDistance} />
        </div>
</div>

    )
}
export default FieldingSaber