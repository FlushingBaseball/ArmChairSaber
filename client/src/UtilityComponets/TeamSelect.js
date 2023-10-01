/**
 * Declare SelectedTeam/set in above componet
 * Maybe also delcare TeamLogo if you want to? 
 * @returns 
 */


export default function TeamSelect  ({setSelectedTeam, setTeamLogo, selectedTeam}){


  function handleTeamChange(event){
    const newTeamValue = parseInt(event.target.value)
    setSelectedTeam(newTeamValue)
    setTeamLogo(newTeamValue)
}





  return (
<div className="WrapperTeamSelect">
  <select className="selectteamBat" id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                  <option value={108}>Los Angeles Angels</option>
                  <option value={109}>Arizona Diamondbacks</option>
                  <option value={110}>Orioles</option>
                  <option value={111}>Red Sox</option>
                  <option value={112}>Cubs</option>
                  <option value={113}>Reds</option>
                  <option value={114}>Indians</option>
                  <option value={115}>Rockies</option>
                  <option value={116}>Tigers</option>
                  <option value={117}>Astros</option>
                  <option value={118}>Royals</option>
                  <option value={119}>Dodgers</option>
                  <option value={120}>Nationals</option>
                  <option value={121}>Mets</option>
                  <option value={133}>Athletics</option>
                  <option value={134}>Pirates</option>
                  <option value={135}>Padres</option>
                  <option value={136}>Mariners</option>
                  <option value={137}>Giants</option>
                  <option value={138}>Cardinals</option>
                  <option value={139}>Rays</option>
                  <option value={140}>Rangers</option>
                  <option value={141}>Blue Jays</option>
                  <option value={142}>Twins</option>
                  <option value={143}>Phillies</option>
                  <option value={144}>Braves</option>
                  <option value={145}>White Sox</option>
                  <option value={146}>Marlins</option>
                  <option value={147}>Yankees</option>
                  <option value={158}>Brewers</option>
              </select>
</div>
  )
}