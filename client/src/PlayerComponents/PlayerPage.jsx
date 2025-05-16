import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Search from "../UtilityComponents/Search";
import PlayerCardBio from "./PlayerCardBio";
import PlayerStats from "./PlayerStats";
import StatGroupButtons from "./StatGroupButtons";

import BatLoader from "../UtilityComponents/BatLoader";

export default function PlayerPage() {
  let { mlbAmId } = useParams();

  // TODO make this a function to grab a random id from the database, its fine now with just a few good players but ???
  const randomPlayerArray = [
    "665742",
    "660670",
    "691718",
    "624413",
    "605141",
    "543037",
    "660271",
    "673540",
    "628317",
    "695578",
    "547943",
    "666142",
    "663656",
    "669373",
    "676979",
    "668939",
    "682829",
    "547180",
    "596019",
    "646240",
    "514888",
    "571448",
    "605135",
    "656775",
  ];
  const randomStartingPlayer = Math.floor(
    Math.random() * randomPlayerArray.length
  );
  // If there's no player id in the url parameters
  const initialPlayerId = mlbAmId
    ? mlbAmId
    : randomPlayerArray[randomStartingPlayer];

  const [searchPlayer, setSearchPlayer] = useState(initialPlayerId);
  const [playerData, setPlayerData] = useState("");
  const [displayMethod, setDisplayMethod] = useState("displayCareer");

  const [apiEndpoint, setApiEndpoint] = useState(
    `https://statsapi.mlb.com/api/v1/people/*****?&season=2025&hydrate=stats(group=[],type=[career])`
  );

  function makeEndpoint(searchPlayer, apiEndpoint) {
    const craftedEndpoint = apiEndpoint.replace("*****", searchPlayer);
    return craftedEndpoint;
  }

  useEffect(() => {
    const endpoint = makeEndpoint(searchPlayer, apiEndpoint);
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((data) => {
        setPlayerData(data);
      })
      .catch((error) => {
        console.error("an error occurred", error);
      });
  }, [searchPlayer, apiEndpoint, displayMethod]);

  // useEffect(() => {
  //   console.log("player data is", playerData);
  // }, [playerData, searchPlayer, displayMethod]);

  if (playerData == "") {
    return <BatLoader />;
  }

  return (
    <div className="PlayerWrapper">
      <div className="GroupTopRow">
        <Search setSearchPlayer={setSearchPlayer} />
      </div>
      <div className="MiddleRow">
        <PlayerCardBio searchPlayer={searchPlayer} playerData={playerData} />
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
