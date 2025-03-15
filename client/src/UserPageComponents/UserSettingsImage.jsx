import { useState } from "react"

export default function UserSettingsImage({currentProfilepic, setCurrentProfilepic, userId}) {

  function handleImageClick(i){
    // console.log(i)
    // console.log(currentProfilepic)
    if (i === Number(currentProfilepic)){
      console.log("picture already selected")
      return
    }
    const idSelected = String(i)
    const userProfilePictureId = {profilePic: idSelected}
    console.log(`Image ${i} was clicked`)
    
      fetch(`/api/users/${userId}`, {
     method: 'PATCH',
     headers: {
      'Content-Type' : 'application/json',
      },
      body: JSON.stringify(userProfilePictureId)
      })
      .then((resp) =>{
        if (!resp.ok){
          throw new Error(`ERROR: STATS ${resp.status}`)
        }
        return resp.json();
      })
      .then((data) => {
        console.log('User Profile picture patch success:', data)
        setCurrentProfilepic(i)
      })
      .catch(error => {
        console.error('Error during patching of Profile Pic', error)
      })
     

  }



  function mapProfileImages() {
    const images = [];
    for (let i = 1; i < 20; i++) {
      images.push(
        <img
          className={`settingsImageOption ${Number(currentProfilepic) === i ? "currentProPic" : "notCurrentPic"}`}
          key={i}
          alt="neon user avatar"
          loading="lazy"
          src={`/Images/profilePics/p${i}.webp`}
          onClick={()=>{handleImageClick(i)}}
        ></img>
      );
    }
    return images;
  }

  return (
    <div className="WrapperChooseImage">
      <h3 id="choosePhoto">CHOOSE A PROFILE PHOTO</h3>
      <div className="picOptions">
        {mapProfileImages()}
      </div>
    </div>
  );
}
