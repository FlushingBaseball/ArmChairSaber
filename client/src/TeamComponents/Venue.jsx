import { useState, useEffect } from "react";
export default function Venue() {


  const [venueInfo, setVenueInfo] = useState();

  //Affiliates
  //https://statsapi.mlb.com/api/v1/teams/147/affiliates?season=2023

  //https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=2023&standingsTypes=regularSeason,wildCard

  // fetch(`https://statsapi.mlb.com/api/v1/venues?venueIds=15&hydrate=location,hydrations,images,video,trackingVersion,coachingVideo`)
  //trackingVersion
  useEffect(() => {
    fetch(`https://statsapi.mlb.com/api/v1/teams/147/affiliates?season=2023`)
      .then((resp) => resp.json())
      .then((data) => {
        setVenueInfo(data);
      });
  }, []);

  useEffect(() => {
    console.log(venueInfo);
  }, [venueInfo]);

  return (
    <div className="WrapperVenue">
      <h1>Venue</h1>
    </div>
  );
}
