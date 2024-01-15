export default function UserSetting ({settingCategory, userId, settingOptionsObject }){


  //settingOptionsObject={era: 'era', fip: 'fip', SIERA, 'skills interactive era' }

  function mapOptions(settingOptionsObject){
    const radioButtons = [];


    for (const settingName in settingOptionsObject ){
      radioButtons.push(
        <div key={settingName} className="SettingRadioWrapper">
          <input type="radio" id={settingName} name={settingCategory} value={settingOptionsObject[settingName]} />
          <label htmlFor={settingName}>{settingOptionsObject[settingName]} </label>
        </div>
      );  
    }
    return radioButtons;
  }


//  function handleUserSettingChange(settingField){
//     // console.log(i)
//     // console.log(currentProfilepic)
  
//     const idSelected = String(i)
//     const userProfilePictureId = {profilePic: idSelected}
//     console.log(`Image ${i} was clicked`)
    
//       fetch(`/api/users/${userId}`, {
//      method: 'PATCH',
//      headers: {
//       'Content-Type' : 'application/json',
//       },
//       body: JSON.stringify(userProfilePictureId)
//       })
//       .then((resp) =>{
//         if (!resp.ok){
//           throw new Error(`ERROR: STATS ${resp.status}`)
//         }
//         return resp.json();
//       })
//       .then((data) => {
//         console.log('User Profile picture patch success:', data)
//         setCurrentProfilepic(i)
//       })
//       .catch(error => {
//         console.error('Error during patching of Profile Pic', error)
//       })
//     }
     

  


  return (
    <div className="WrapperSetting">
      <h2 className="setting-header">{settingCategory}</h2>
      {mapOptions(settingOptionsObject)}
    </div>
  )
}