import { useState, useEffect } from "react"

export default function Standings({selectedTeam}){

  const [standingData, setStandingData] = useState();

  useEffect(()=>{
    fetch(`https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=2023&standingsTypes=regularSeason,wildCard`)
    .then((resp)=>resp.json())
    .then((data)=>{
      setStandingData(data)
    })
  },[])

  useEffect(()=>{
    console.log(standingData)
  },[standingData])


  function handleSort(){


  }

  function mapStandings(standingData){

      setTimeout(()=>{
        console.log(standingData.records)

      }, "4000");

    // standingData.records.forEach(element => {
    //   console.log(element)
      
    // });

  }


  return(
    <div className="WrapperStandings">
      <h1>Leauge Standings</h1>
      {mapStandings(standingData)}



    </div>
  )
}