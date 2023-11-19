import { useEffect, useState } from "react";

function LeagueLeaders() {
  const [fetchedGameData, setFetchedGameData] = useState("");
  const [selectedCata, setSelectedCata] = useState("wildPitch");

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=${selectedCata}&sportId=1&limit=20&season=2023&fields=leagueLeaders,leaders,rank,value,team,name,league,name,person,id,fullName`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setFetchedGameData(data.leagueLeaders[0].leaders);
      });
  }, [selectedCata]);

  function handleCataChange(event) {
    const newCataValue = event.target.value;
    setSelectedCata(newCataValue);
  }

  function mapPlayer() {
    if (fetchedGameData.length > 1) {
      return fetchedGameData.map((player) => (
        <div key={player.person.fullName} className="leauge-Leader-Card">
          <img
            alt={player.person.fullName}
            className="leauge-Leader-Image"
            src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/silo/current`}
          ></img>
          <span className="ABSpan">{`Leauge: ${player.league.name} `}</span>
          <span className="ABSpanName">{player.person.fullName}</span>
          <span className="ABSpan">{`${selectedCata
            .split(/(?=[A-Z])/)
            .join(" ")
            .toUpperCase()} : ${player.value}`}</span>
        </div>
      ));
    }
  }

  return (
    <div>
      <h1 id="leaugeHeader">Leauge Leaders</h1>
      <div className="WrapperadvancedBatter">
        <select
          className="selectteamBat"
          id="selectedCata"
          value={selectedCata}
          onChange={handleCataChange}
        >
          <option value={"homeRuns"}>Home Runs</option>
          <option value={"stolenBases"}>Stolen Bases</option>
          <option value={"wildPitch"}>Wild Pitches</option>
          <option value={"catcherEarnedRunAverage"}>Catcher ERA </option>
          <option value={"errors"}>Errors</option>
          <option value={"balk"}>Balks</option>
          <option value={"blownSaves"}>Blown Saves</option>
          <option value={"assists"}>Assists</option>
          <option value={"shutouts"}>Shutouts</option>
          <option value={"sacrificeBunts"}>Sacrifice Bunts</option>
          <option value={"sacrificeFlies"}>Sacrifice Flies</option>
          <option value={"runs"}>Runs</option>
          <option value={"groundoutToFlyoutRatio"}>
            Groundout To Flyout %
          </option>
          <option value={"battingAverage"}>Batting Average</option>
          <option value={"groundOuts"}>Ground Outs</option>
          <option value={"numberOfPitches"}>Total Pitches Seen</option>
          <option value={"onBasePercentage"}>On Base %</option>
          <option value={"caughtStealing"}>Caught Stealing</option>
          <option value={"triplePlays"}>Triple Plays</option>
          <option value={"walksPer9Inn"}>Walks Per 9</option>
          <option value={"winPercentage"}>Win %</option>
        </select>
        {mapPlayer()}
      </div>
    </div>
  );
}

export default LeagueLeaders;
