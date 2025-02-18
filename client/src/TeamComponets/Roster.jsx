import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handlePlayerImageError } from "../UtilityFunctions/UtilityFunctions";
import BatLoader from "../UtilityComponets/BatLoader";

function Roster({ selectedTeam, selectedRoster }) {
  const [rosterData, setRosterData] = useState([]);
  const [catcherData, setCatcherData] = useState([]);
  const [infieldersData, setInfieldersData] = useState([]);
  const [outfieldersData, setOutfieldersData] = useState([]);
  const [designatedHitterData, setDesignatedHitterData] = useState([]);
  const [pitchersData, setPitchersData] = useState([]);

  const [injuredPlayerCount, setInjuredPlayerCount] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/teams/${selectedTeam}/roster/${selectedRoster}?hydrate=person(transactions,video,social)`
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        if (data.roster) {
          setRosterData(data.roster)
          sortRosterByPosition(data.roster)
        }
        else{
          alert("There's no data for this roster type as of now");
        }
      });
  }, [selectedTeam, selectedRoster]);

  if (!rosterData.length > 1) {
    return <BatLoader />;
  }

  function handlePlayerClick(value, player) {
    if (!player.position) {
      return null;
    }
    navigate(`/player/${String(value)}`);
  }

  function sortRosterByPosition(rosterData) {
    // console.log("this is rosterData", rosterData);
    const filteredRoster = rosterData.reduce(
      (acc, player) => {
        if (player.status.code && player.status.code ==="D60"){
            acc.injuredPlayerCount += 1;
        }

        if (player.position && player.position.type === "Infielder") {
          acc.infieldersData.push(player);
        } else if (player.position && player.position.type === "Outfielder") {
          acc.outfieldersData.push(player);
        } else if (
          (player.position && player.position.type === "Hitter") ||
          (player.position && player.position.type === "Two-Way Player")
        ) {
          acc.designatedHitterData.push(player);
        } else if (player.position && player.position.type === "Pitcher") {
          acc.pitchersData.push(player);
        } else if (player.position && player.position.type === "Catcher") {
          acc.catcherData.push(player);
        }
        return acc;
      },
      {
        catcherData: [],
        infieldersData: [],
        outfieldersData: [],
        designatedHitterData: [],
        pitchersData: [],
        injuredPlayerCount: 0,
      }
    );

    setCatcherData(filteredRoster.catcherData);
    setInfieldersData(filteredRoster.infieldersData);
    setOutfieldersData(filteredRoster.outfieldersData);
    setDesignatedHitterData(filteredRoster.designatedHitterData);
    setPitchersData(filteredRoster.pitchersData);
    setInjuredPlayerCount(filteredRoster.injuredPlayerCount);
  }


  function mapRoster(personArray) {
    if (rosterData.length > 1) {
      return personArray.map((player) => (
        <div
          className={`WrapperPlayer`}
          key={player.person.id}
          onClick={() => handlePlayerClick(player.person.id, player)}
        >
          <img
            src={
              selectedRoster !== "coach"
                ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/silo/current`
                : `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.person.id}/headshot/83/coach/current`
            }
            className={`Colors${selectedTeam}`}
            alt={player.person.fullName}
            id="playerPhoto"
            onError={(e) => handlePlayerImageError(e.target, player.person.id)}
          />
          <span className="playerJerseyNum">
            # {player.jerseyNumber ? player.jerseyNumber : "NA"}&nbsp;
          </span>
          <span className="playerName">{player.person.fullName}&nbsp;</span>
          <span className="playerPosition">
            {player.position ? player.position.name : ""}{" "}
          </span>
          &nbsp;
          <span id="playerAge">{`${player.person.currentAge}`}</span>&nbsp;
          <span className="playerStatus ">
            {player.status ? player.status.description : ""}{" "}
          </span>
          &nbsp;
          <div className="CoachTitle">{player.title ? player.title : ""}</div>
        </div>
      ));
    }
  }

  return (
    <div className={`WrapperRoster`}>
      {selectedRoster === "coach" ? (
        mapRoster(rosterData)
      ) : (
        <>
          <div className="RosterGrouping">
            <div className="WrapperRosterCount">
            <span className="rosterCount">{`${rosterData.length-injuredPlayerCount} / 40 Man spots full`}</span>
            <span className="rosterCount">{`With ${injuredPlayerCount} players on the 60 Day IL who do not use a roster spot`}</span>
              </div>
            <div className="RosterGrouping">
              <h2 className="RosterCata">Catchers</h2>
              {mapRoster(catcherData)}
            </div>
            <h2 className="RosterCata">Infielders</h2>
            {mapRoster(infieldersData)}
          </div>
          <div className="RosterGrouping">
            <h2 className="RosterCata">Outfielders</h2>
            {mapRoster(outfieldersData)}
          </div>
          {designatedHitterData.length ? <div className="RosterGrouping">
            <h2 className="RosterCata">Designated Hitters</h2>
             {mapRoster(designatedHitterData)}
          </div> : null }
          <div className="RosterGrouping">
            <h2 className="RosterCata">Pitchers</h2>
            {mapRoster(pitchersData)}
          </div>
        </>
      )}
    </div>
  );
}

export default Roster;



