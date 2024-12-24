//no games reason?
export default function NoGamesToday({formattedDate, selectedSportId}){


  function getLeague(key){
    const leagueMap = new Map([
      ["17", "Winter Leagues"],
      ["1", "MLB"],
      ["11", "AAA"],
      ["12", "AA"],
      ["13", "A+"],
      ["14", "A"],
      ["16", "Rookie Ball"],
      ["22", "College"],
      ["31", "NPB"],
      ["32", "KBO"],
      ["23", "INDY BALL"]
    ]);
    return leagueMap.get(key) || "unkown";
  }

  return(
    <div className="Wrapper-No-Games">
        <span id="noGameHeader">{`There are no games scheduled today ${formattedDate} at the ${getLeague(selectedSportId)} level`}</span>
        <img id="noGameImage" alt="Grounds crew members getting the field ready for games" src="/Images/spring-no-games.jpg"></img>
    </div>
  )
}

