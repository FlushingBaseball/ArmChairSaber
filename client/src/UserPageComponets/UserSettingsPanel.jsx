export default function UserSettingsPanel(){

  return (
    <div className="WrapperUserSettingsPanel">
      <div className="Setting">
        <div className="SettingSpan"></div>
        <div className="radio">
          <label>
            <input name="favPitchingStat" type="radio" value="fip" checked={true} />
            ERA
          </label>
          <label>
            <input name="favPitchingStat" type="radio" value="fip" checked={true} />
            FIP
          </label>
          <label >
            <input name="favPitchingStat" type="radio" value="fip" checked={true} />
            SIERA
          </label>
        </div>
      </div>
        
    </div>
  )
  
}