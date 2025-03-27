import {useState, useEffect} from 'react'


/**
 * Hook to fetch user predictions from backend and cache them in the browser
 * so I don't have to 
 * @param {string}  id - The user's ID or maybe username
 * @param {*}  
 */

export function useUserBrowserCache(userId, submissionType){
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = `user_${userId}_${submissionType}_submissions`;

  

}
































export function handlePlayerImageError(img, playerid){
    //clearing the inital onError so if the Milb photo isn't found either there's no infinite loop
    img.onerror = null;
    // Check the milb api for the players photo
    img.src = `https://midfield.mlbstatic.com/v1/people/${playerid}/milb/100`;
    // New onError so the default is shown if the Milb isn't found after the first error is handled
    img.onerror = function () {
      console.log("2nd fallback onerror Default  player image call")
      img.src = "/Images/default-batter.svg";
    };
}

export function handleTeamLogoError(img, teamId, teamName){
  fetch(`/api/team_logo_images/${teamId}.svg`)
  .then((response) =>{
    if (!response.ok){
      img.src = `/api/team_logo_images/default-team-logo.svg`
      console.log(`${teamName} logo not found on backend teamId is ${teamId}`);
    }
    else {
      img.src = response.url
    }
  })







  // console.log("in handle team  logo error")
  // img.onerror = null;

  // //Calling my flask /api/ for stored team images
  // img.onerror = function(){
  //   img.onerror = null;
  //   img.src = `/api/default-team-logo.svg?t=${Date.now()}`
  //   console.log(img)
  //   console.log("2nd fallback onerror Default logo call")
  //   console.log("new")
  //   console.log(img)
  // };

  // img.src = `/api/${teamId}.svg?t=${Date.now()}`
  // New onError so the default team logo is shown if I don't have it on the backend
}



//  let homeTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.home.team.id}.svg`;
//let awayTeamImageSrc = `https://www.mlbstatic.com/team-logos/${teams.away.team.id}.svg`;