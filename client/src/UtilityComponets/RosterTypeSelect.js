export default function RosterTypeSelect({setSelectedRoster, selectedRoster}){


  function handleRosterChange(event){
    const newRosterValue = String(event.target.value)
    setSelectedRoster(newRosterValue)
    console.log("The Selected Roster value is ", newRosterValue)
}



return (
  <div className="WrapperRosterSelect">
      <select className="selectteamBat"
              id="RosterSelect"
              value={selectedRoster}
              onChange={handleRosterChange}
              >
        <option value={'40Man'}>40 Man</option>
        <option value={'active'}>Active</option>
        <option value={'depthChart'}>Depth Chart</option>
        <option value={'coach'}>Coaches</option>
        <option value={'fullSeason'}>Full Season</option>
        <option value={'fullRoster'}>Full All Levels Roster</option>
        {/* <option value={'nonRosterInvitees'}>Non Roster Invitees</option> */}
        {/* <option value={'allTime'}>All Time</option> */}
      {/* <option value={'gameday'}>Gameday</option> */}
      </select>
  </div>
)



}

