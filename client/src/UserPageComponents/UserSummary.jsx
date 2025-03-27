export default function UserSummary({showSettings, setShowSettings, currentProfilepic}){

  function handleSettingsClick(){
    setShowSettings((showSettings)=>!showSettings)

  }


  return (
    <div className="WrapperUserSummary">
      <img id="UserSummaryImage" src={`/api/profile_pictures/p${currentProfilepic}.webp`} alt="userSelectedAVI" />
      <i className="fa fa-cog" onClick={handleSettingsClick} aria-hidden="true"></i>

    </div>
  )
}