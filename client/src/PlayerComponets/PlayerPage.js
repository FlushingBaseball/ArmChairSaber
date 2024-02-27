import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Search from "../UtilityComponets/Search";
import PlayerCardBio from "./PlayerCardBio";
import PlayerStats from "./PlayerStats";
import StatGroupButtons from "./StatGroupButtons";

import BatLoader from "../UtilityComponets/BatLoader";

export default function PlayerPage() {
  let { mlbAmId } = useParams();

  /* Picking a random good player on startup, the endpoint got locked down after hitting one default player too many times in a month*/
  const randomPlayerArray = ["665742", "660670", "624413", "605141", "543037", "660271", "673540", "628317", "547943", "668939", "547180", "596019","646240", "514888","571448","605135" ];
  const randomStartingPlayer = Math.floor(Math.random() * randomPlayerArray.length);
  /*If there's no palyer id in the url paramaters (there is when this page is accessed by clicking on a player in roster for example) */
  const initialPlayerId = mlbAmId ? mlbAmId : randomPlayerArray[randomStartingPlayer];
  const [searchPlayer, setSearchPlayer] = useState(initialPlayerId);

  const [playerData, setPlayerData] = useState("");
  const [displayMethod, setDisplayMethod] = useState("displayCareer")
  
  // const apiEndpoint =  `https://statsapi.mlb.com/api/v1/people/${searchPlayer}?&season=2023&hydrate=stats(group=[${selectedStatGroup}],type=[${selectedStatType}])`;
  
    const [apiEndpoint, setApiEndpoint] = useState(`https://statsapi.mlb.com/api/v1/people/*****?&season=2023&hydrate=stats(group=[],type=[career])`)
  
  
  function makeEndpoint(searchPlayer, apiEndpoint){
    console.log("ingredient search player", searchPlayer)
    const craftedEndpoint = apiEndpoint.replace("*****", searchPlayer)
    console.log("crafted endpoint is", craftedEndpoint)
    return craftedEndpoint
  }


  useEffect(() => {
    console.log("making a fetch")
    const endpoint = makeEndpoint(searchPlayer, apiEndpoint)
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((data) => {
        setPlayerData(data);
      })
      .catch((error) => {
        console.error("an error occured", error);
      });
  }, [searchPlayer, apiEndpoint]);
  // // }, [searchPlayer, apiEndpoint]);

  useEffect(() => {
    console.log("player data is", playerData)
    console.log("Search Player:", searchPlayer)
  }, [playerData, searchPlayer]);

  if (playerData == "") {
    return <BatLoader/>;
  }

  return (
    <div className="PlayerWrapper">
      <div className="GroupTopRow">
        <Search
          setSearchPlayer={setSearchPlayer}
        />
      </div>
      <div className="MiddleRow">
        <PlayerCardBio
          searchPlayer={searchPlayer}
          playerData={playerData}
        />
        <StatGroupButtons
          setApiEndpoint={setApiEndpoint}
          searchPlayer={searchPlayer}
          setDisplayMethod={setDisplayMethod}
        />
      </div>
      <PlayerStats 
        searchPlayer={searchPlayer}
        playerData={playerData}
        displayMethod={displayMethod}
      />
    </div>
  );
}
