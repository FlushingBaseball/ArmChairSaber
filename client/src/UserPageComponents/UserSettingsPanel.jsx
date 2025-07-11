import TeamSelect from "../UtilityComponents/TeamSelect";
import UserSettingsImage from "./UserSettingsImage";
import UserSetting from "./UserSetting";
import { useUser } from "../Context/UserContext";

import { useState, useEffect } from "react";


export default function UserSettingsPanel({currentProfilepic, setCurrentProfilepic}){
  const [selectedTeam, setSelectedTeam ] = useState()
  const {user, refreshUserData} = useUser() 

  //   useEffect(()=>{
  //     console.log(selectedTeam)

  // },[selectedTeam])


// const favPitchingStat = {
//   ERA : "Earned Run Average",
//   xERA : "Expected Earned Run Average",
//   FIP : "Fielding Independent Pitching",
//   xFIP : "Expected Fielding Independent Pitching",
//   SIERA : "Skills Interactive ERA",
// }


useEffect(()=>{
  console.log(user)
  console.log(`selected team is ${selectedTeam}`)
  console.log(`user.favorite_team is ${user.favorite_team}`)
  if ( (Number(user.favorite_team) !== selectedTeam || user.favorite_team ===null) && selectedTeam !== undefined) {
    updateUserField("favorite_team", Number(selectedTeam))
  }
  
},[selectedTeam])


function updateUserField(field, value){
  console.log("update User field fired")
  console.log(field, value)
  const fieldUpdateData = {[field]: value}
  console.log(fieldUpdateData)
  fetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fieldUpdateData)
  })
    .then((resp) => {
      if (!resp.ok){
        throw new Error(`Error: Status ${resp.status}`)
      }
      return resp.json();
    })
    .then((data) =>{
      console.log(`field ${field} was updated`, data)
      refreshUserData()
    })
    .catch((error)=>{
      console.error(`Failed to updated field ${field}`)
    })
  }
  

  return (
    <div className="WrapperUserSettingsPanel">
      <h2 id="SettingsWrapperHeader">SETTINGS</h2>
      <span>Choose your favorite team</span>
      <span className="explanation">After selecting a team, features will default to your favorite team, instead of mine</span>
      <TeamSelect selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam}/>
      <UserSettingsImage
          currentProfilepic={currentProfilepic}
          setCurrentProfilepic={setCurrentProfilepic}
        />

      {/*<UserSetting settingCategory={"Pitching Value"} settingOptionsObject={favPitchingStat} /> */}

        
    </div>
  )
  
}