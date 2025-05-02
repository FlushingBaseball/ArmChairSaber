import { useState, useEffect } from "react";

    /**
     * TODO give users the option what standings to display be default
     * TODO expand options to display all team affiliates
     */

export default function Standings({ selectedTeam }) {
  const [standingData, setStandingData] = useState();

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2025&standingsTypes=regularSeason,wildCard&hydrate=division`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setStandingData(data);
      });
  }, []);

  useEffect(() => {
    console.log(standingData);
  }, [standingData]);

  if (standingData === ''){
    return(
      <h1>...Loading</h1>
    )
  }


  function mapStandings(updatedData) {
    if (updatedData === undefined) return null;
      const teamRelevantStandings = [];
      const otherStandings = [];

    for (const record of updatedData.records) {
      const containsSelectedTeam = record.teamRecords.some(teamRecord => 
        teamRecord.team.id === selectedTeam
      )
      if (containsSelectedTeam){
        teamRelevantStandings.push(record)
      }
      else {
        otherStandings.push(record)
      }
    }

    const sortedRecords = [...teamRelevantStandings, ...otherStandings];



  
    const tables = sortedRecords.map((recordGrouping) => {
      const rows = recordGrouping.teamRecords.map((team) => (
        <tr className={selectedTeam === team.team.id ? "Standings-Highlight-Team" : null} key={team.team.id}>
          <td className="Standings-Table-Data" id="Standings-Logo-Table-Header">
            <img id="Standings-Logo"
                 src={`/api/team_logo_images/${team.team.id}_old_score.webp`}
                 alt={team.team.name} /></td>
          <td className="Standings-Table-Data" id="teamNameTh">{team.team.name}</td>
          <td className="Standings-Table-Data">{team.wins}</td>
          <td className="Standings-Table-Data">{team.losses}</td>
          <td className="Standings-Table-Data">{team.winningPercentage}</td>
          <td className="Standings-Table-Data">{team.streak.streakCode}</td>
          <td className="Standings-Table-Data">{team.runDifferential}</td>
        </tr>
      ));
  
      return (
        <div className="Single-Standing-Wrapper">
          <div className="League-Name-Span">
          {recordGrouping.division.nameShort ? recordGrouping.division.nameShort : "Wild Card"}
            </div>
          <table className="Standings-Table" key={`${recordGrouping.division.id} + ${recordGrouping.teamRecords[0].team.id}`}>
            <thead id="standingsHead">
              <tr>
                <th className="Team-Logo-Table-Header"></th>
                <th className="Standings-Table-Header">Team</th>
                <th className="Standings-Table-Header">Wins</th>
                <th className="Standings-Table-Header">Loses</th>
                <th className="Standings-Table-Header">%</th>
                <th className="Standings-Table-Header">Streak</th>
                <th className="Standings-Table-Header">Run Differential</th>
              </tr>
            </thead>
            <tbody id="standingsBody">{rows}</tbody>
          </table>
        </div>
      );
    });
  
    return tables;
  }
  

  return (
    <div className="WrapperStandings">
      <div className="Standings-Header-Wrapper">
        <img
          className="Standings-Old-Score-Logo"
          src="/api/team_logo_images/logo_old_score.webp"
          alt="Orange LCD dot matrix baseball in a Napoleonic Hat"
        />
          <span className="League-Standings-Header">League Standings</span>
        <img
          className="Standings-Old-Score-Logo"
          src="/api/team_logo_images/logo_old_score.webp"
          alt="Orange LCD dot matrix baseball in a Napoleonic Hat"
        />
      </div>
      {mapStandings(standingData)}
    </div>
  );
}
