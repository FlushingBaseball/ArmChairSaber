export default function LeagueSelect({ handleSportSelect, selectedSportId }) {

  /**
   * The leagues which are active change's a lot throughout the season
   * This may not seem DRY but dynamically generating these from a set list
   * doesn't suit my needs. 
   * 
   * It may actually suit my needs now that I found more documentation
   * 
   * 
   * 1 mlb
   * 11 AAA
   * 12 AA
   * 13 A+
   * 14 A
   * 16 ROK
   * 17 Winter Leagues
   * 21 Minors
   * 23 indy
   * 32 Korean
   * 31 Nippon
   * 51 int baseball
   * 509 int baseball 18u
   * 510 int baseball 16 under
   * 6005 inter baseball amateur 
   * 22 college 
   * 586 high school
   * 
   */
  return (
    <div className="leagueSelect">
      <button
        className={`leagueSelectButton ${
          selectedSportId === "1" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("1")}
      >
        MLB
      </button>


    


      <button
        className={`leagueSelectButton ${
          selectedSportId === "11" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("11")}
        >
        AAA
      </button>

      <button
        className={`leagueSelectButton ${
          selectedSportId === "12" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("12")}
        >
        AA
      </button>

      <button
        className={`leagueSelectButton ${
          selectedSportId === "13" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("13")}
        >
        A+
      </button>

      <button
        className={`leagueSelectButton ${
          selectedSportId === "14" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("14")}
        >
        A
      </button>

      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "16" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("16")}
        >
        ROK
      </button> */}

{/* out of season */}
      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "17" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("17")}
        >
        Winter Leagues
      </button> */}



        {/**College includes some draft leauges   APP/DL */}
      <button
        className={`leagueSelectButton ${
          selectedSportId === "22" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("22")}
      >
        College
      </button>
      

{/*       
      <button
        className={`leagueSelectButton ${
          selectedSportId === "23" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("23")}
      >
        INDY
      </button> */}
      
      {/***Leagues that are weird /not worth showing? */}
      {/*
        //amateur draft league in the dominican republic? 
      <button
        className={`leagueSelectButton ${
          selectedSportId === "6005" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("6005")}
      >
        INDY
      </button>
       */}


      {/**Leagues that have never shown me games*/}
      {/* <button
        className={`leagueSelectButton ${
          selectedSportId === "31" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("31")}
        >
        Japanese League
      </button>

      <button
        className={`leagueSelectButton ${
          selectedSportId === "32" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("32")}
      >
      Korean League
    </button> */}

{/* <button
        className={`leagueSelectButton ${
          selectedSportId === "21" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("21")}
        >
        Minor Leagues ??
      </button>

  */}
          {/* <button
            className={`leagueSelectButton ${
              selectedSportId === "51" ? "activeSport" : null
            }`}
            onClick={() => handleSportSelect("51")}
          >
            INT
          </button>
           */}

    </div>
  );
}
