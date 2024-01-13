export default function UserSettingsImage({userProfilePicId, userId}) {

console.log(userId)
console.log(userProfilePicId)

  function handleImageClick(i){
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
      })
      .catch(error => {
        console.error('Error during patching of Profile Pic', error)
      })
     

  }



  function mapProfileImages() {
    const images = [];
    for (let i = 1; i < 9; i++) {
      images.push(
        <img
          className={`settingsImageOption ${Number(userProfilePicId) === i ? "currentProPic" : null}`}
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
      <h1>Choose a profile photo</h1>
      {mapProfileImages()}
    </div>
  );
}
