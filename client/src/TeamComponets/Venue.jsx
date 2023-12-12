import { useState, useEffect } from "react"
export default function Venue(){

  const [venueInfo, setVenueInfo] = useState();


  /* 

0
: 
"relatedVenues"
1
: 
"parentVenues"
2
: 
"residentVenues"
3
: 
"relatedVenues(venue)"
4
: 
"parentVenues(venue)"
5
: 
"residentVenues(venue)"
6
: 
"location"
7
: 
"social"
8
: 
"relatedApplications"
9
: 
"timezone"
10
: 
"fieldInfo"
11
: 
"menu"
12
: 
"metadata"
13
: 
"performers"
14
: 
"images"
15
: 
"schedule"
16
: 
"nextSchedule"
17
: 
"previousSchedule"
18
: 
"ticketManagement"
19
: 
"xrefId"
20
: 
"video"
21
: 
"coachingVideo"
22
: 
"trackingVersion"
*/


  //trackingVersion
  useEffect(()=>{
    fetch(`https://statsapi.mlb.com/api/v1/venues?venueIds=15&hydrate=`)
    .then((resp) => resp.json())
    .then((data)=>{
        setVenueInfo(data)
    })
  },[])

  useEffect(()=>{
    console.log(venueInfo)
  },[venueInfo])

  return(
    <div className="WrapperVenue">
      <h1>Venue</h1>

    </div>
  )
}

