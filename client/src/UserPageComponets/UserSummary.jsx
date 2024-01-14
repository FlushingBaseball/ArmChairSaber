export default function UserSummary({showSettings, setShowSettings}){

  function handleSettingsClick(){
    setShowSettings((showSettings)=>!showSettings)

  }


  return (
    <div className="WrapperUserSummary">
      <i className="fa fa-cog" onClick={handleSettingsClick} aria-hidden="true"></i>

    </div>
  )
}