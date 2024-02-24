import { useState, useEffect } from "react";
import { handleImageError } from "../UtilityFunctions/UtilityFunctions";
import BatLoader from "../UtilityComponets/BatLoader";

export default function FreeAgents() {
  const [displaySigned, setDisplaySigned] = useState("unsigned")
  const [freeAgentData, setFreeAgentData] = useState();
  const [signedFreeAgents, setSignedFreeAgents] = useState([]);
  const [unSignedFreeAgents, setUnSignedFreeAgents] = useState([]);

  useEffect(() => {
    fetch(`https://statsapi.mlb.com/api/v1/people/freeAgents?season=2023`)
    .then((resp) => resp.json())
    .then( data =>{
      setFreeAgentData(data.freeAgents)
    });
  }, []);

    
  useEffect(()=>{
    console.log(freeAgentData)
    if(freeAgentData !== undefined){
      console.log("calling sort")
      sortFreeAgents(freeAgentData)

    }
    // console.log(signedFreeAgents)
    // console.log(unSignedFreeAgents)
  },[freeAgentData])
  

  if (freeAgentData === undefined){
    return <BatLoader />
  }



  function sortFreeAgents(freeAgentData){
    console.log("this is freeAgentData", freeAgentData)
    const filteredArray = freeAgentData.reduce((acc, player) => {
      console.log(player)

      if (player.newTeam.hasOwnProperty("id")){
        console.log("it had id")
        acc.signedFreeAgents.push(player)
      }
      else {
        acc.unSignedFreeAgents.push(player)
      }
      return acc
    }, {signedFreeAgents: [], unSignedFreeAgents: []});

    setSignedFreeAgents(filteredArray.signedFreeAgents);
    setUnSignedFreeAgents(filteredArray.unSignedFreeAgents)
  }



  function handleTypeChange(event){
    setDisplaySigned(event.target.value)
  }
  return <div className="WrapperFreeAgents">
    <h1 className="FreeAgents">Free Agents</h1>

    <div id="WrapperRadioGroup">
      <label>
        <input 
          type="radio"
          value={"unsigned"}
          checked={displaySigned === "unsigned"}
          onChange={(event)=>handleTypeChange(event)}
        />
        Unsigned Free Agents
      </label>
      <label>
        <input 
          type="radio"
          value={"signed"}
          checked={displaySigned === "signed"}
          onChange={(event)=>handleTypeChange(event)}
        />
        Signed Free Agents
      </label>
    </div>

    {displaySigned === "unsigned" ? unSignedFreeAgents.map((player)=>(
      <div className="Agent-Wrapper">
        <div className="agentName" key={player.player.id}>{player.player.fullName}</div>
        <img id="og-team-logo" src={`./Images/logos/${player.originalTeam.id}.svg`} alt={`${player.originalTeam.name} logo`} />
        <img id='agent-arrow' src="./Images/UtilityIcons/arrow.webp" alt=""  />
      </div>
    )) : signedFreeAgents.map((player)=>(
      <div className="Agent-Wrapper">
        <div className="agentName" key={player.player.id}>{player.player.fullName}</div>
        <img id="og-team-logo" src={`./Images/logos/${player.originalTeam.id}.svg`} alt={`${player.originalTeam.name} logo`} />
        <img id='agent-arrow' src="./Images/UtilityIcons/arrow.webp" alt=""  />
        <img id="og-team-logo" src={`./Images/logos/${player.newTeam.id}.svg`} alt={`${player.originalTeam.name} logo`} />
      </div>
    )) }
    

  </div>;
}

// homeImageSrc = teams.home.probablePitcher
// ? `https://midfield.mlbstatic.com/v1/people/${teams.home.probablePitcher.id}/milb/100`
// : "/Images/default-batter.svg";

// homeTeamImageSrc = `./Images/logos/${teams.home.team.id}.svg`;
