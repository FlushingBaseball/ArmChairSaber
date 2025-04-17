import { useState } from "react"
import {profilePictures} from '../Metadata/profilePictures.json' 
import { useUser } from "../Context/UserContext"

export default function UserSettingsImage({currentProfilepic, setCurrentProfilepic}) {
  const {user, refreshUserData} = useUser()

  function handleImageClick(imageIdToChange){
    const numberId = imageIdToChange.substring(1)
    if (numberId === Number(currentProfilepic)){
      console.log("picture already selected")
      return
    }
    const idSelected = String(numberId)
    const userProfilePictureId = {profilePic: idSelected}
    console.log(`Image ${numberId} was clicked`)
    
      fetch(`/api/users/${user.id}`, {
     method: 'PATCH',
     headers: {
      'Content-Type' : 'application/json',
      },
      body: JSON.stringify(userProfilePictureId)
      })
      .then((resp) =>{
        if (!resp.ok){
          throw new Error(`ERROR: STATUS ${resp.status}`)
        }
        return resp.json();
      })
      .then((data) => {
        console.log('User Profile picture patch success:', data)
        setCurrentProfilepic(numberId)
        refreshUserData()

      })
      .catch(error => {
        console.error('Error during patching of Profile Pic', error)
      })
  }

  
  return (
    <div className="WrapperChooseImage">
      <h3 id="choosePhoto">CHOOSE A PROFILE PHOTO</h3>
{Object.entries(profilePictures).map(([groupName, images]) => (
    <div key={groupName}>
      <h3 id="profilePicturesGroupHeader">{groupName}</h3>
      {images.map(image => (
        <img
          className={`settingsImageOption ${Number(currentProfilepic) === Number(image.id.substring(1)) ? "currentProPic" : "notCurrentPic"}`}
          key={image.id}
          src={`/api/profile_pictures/${image.id}_thumb.webp`}
          alt={"profile picture"}
          loading="lazy"
          onClick={()=>{handleImageClick(image.id)}}
        />
      ))}
    </div>
  ))}
    </div>
  );
}
