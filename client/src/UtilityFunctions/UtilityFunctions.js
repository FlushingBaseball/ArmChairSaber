export function handleImageError(img, playerid){
    //clearing the inital onError so if the Milb photo isn't found either there's no infinite loop
    img.onError = null;
    img.src = `https://midfield.mlbstatic.com/v1/people/${playerid}/milb/100`;
    // New onError so the default is shown if the Milb isn't found after the first error is handled
    img.OnError = function () {
      img.src = "/Images/default-batter.svg";
    };
}
