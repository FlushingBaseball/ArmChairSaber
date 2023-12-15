import { useState, useEffect } from "react";

export default function Standings({ selectedTeam }) {
  const [standingData, setStandingData] = useState();

//byLeague
//byOrganization
//byDivision



  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2023&standingsTypes=regularSeason,wildCard`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setStandingData(data);
      });
  }, []);

  useEffect(() => {
    console.log("in use Effect standingData")
    console.log(standingData);
  }, [standingData]);

  if (standingData === ''){
    return(
      <h1>...Loading</h1>
    )
  }

  function handleSort() {}

  function mapStandings(updatedData) {
    if (updatedData === undefined) return null;
  
    const tables = updatedData.records.map((recordGrouping) => {
      const rows = recordGrouping.teamRecords.map((team) => (
        <tr key={team.team.id}>
          <th><img src={`https://www.mlbstatic.com/team-logos/${team.team.id}.svg`} alt={team.team.name} /></th>
          <th>{team.team.name}</th>
          <th>{team.wins}</th>
          <th>{team.losses}</th>
          <th>{team.winningPercentage}</th>
          <th>{team.streak.streakCode}</th>
          <th>{team.runDifferential}</th>
        </tr>
      ));
  
      return (
        <table id="standingsTable" key={Math.random()}>
          <thead>
            <tr>
              <th className="teamLogoTh"></th>
              <th className="team-th">Team</th>
              <th>Wins</th>
              <th>Loses</th>
              <th>%</th>
              <th>Streak</th>
              <th>Run Differential</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    });
  
    return tables;
  }
  

  return (
    <div className="WrapperStandings">
      <h1>Leauge Standings</h1>
      {mapStandings(standingData)}


    </div>
  );
}
