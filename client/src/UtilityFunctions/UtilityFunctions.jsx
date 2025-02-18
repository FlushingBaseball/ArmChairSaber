export function handlePlayerImageError(img, playerid){
    //clearing the inital onError so if the Milb photo isn't found either there's no infinite loop
    img.onError = null;
    img.src = `https://midfield.mlbstatic.com/v1/people/${playerid}/milb/100`;
    // New onError so the default is shown if the Milb isn't found after the first error is handled
    img.OnError = function () {
      img.src = "/Images/default-batter.svg";
    };
}

export function handleTeamLogoError(img, teamId){
  console.log("in handle team  logo error")
  img.onError = null;
  img.src = `/api/${teamId}.svg`
  // New onError so the default team logo is shown if I don't have it on the backend
  img.OnError = function(){
    img.src = `api/default-team-logo.svg`
  };
}





//  let homeTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
//let awayTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.away.team.id}.svg`;