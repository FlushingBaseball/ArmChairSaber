export default function LeagueSelect({ handleSportSelect, selectedSportId }) {

  /**
   * The leagues which are active change's alot throughout the season
   * This may not seem DRY but dynamicly generating these from a set list
   * doesn't suit my need. 
   */
  return (
    <div className="leagueSelect">
      <button
        className={`leagueSelectButton ${
          selectedSportId === "17" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("22")}
      >
        College Baseball
      </button>
      <button
        className={`leagueSelectButton ${
          selectedSportId === "17" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("17")}
      >
        Winter Leagues
      </button>
      <button
        className={`leagueSelectButton ${
          selectedSportId === "1" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("1")}
      >
        MLB
      </button>

      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "11" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("11")}
      >
        AAA
      </button> */}
      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "12" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("12")}
      >
        AA
      </button> */}
      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "13" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("13")}
      >
        A+
      </button> */}
      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "14" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("14")}
      >
        A
      </button> */}
      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "16" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("16")}
      >
        ROK
      </button> */}
    </div>
  );
}
