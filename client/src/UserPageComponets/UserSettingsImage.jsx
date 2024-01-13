export default function UserSettingsImage() {



  function handleImageClick(i){
    const userProfilePictureId = {profilePic: {i}}
    console.log(`Image ${i} was clicked`)
    /**
     * fetch(`/api/users/${user.id},{
     * method: 'PATCH',
     * headers: {
     *  'Content-Type' : 'application/json',
     * },
     * body: JSON.stringify(userProfilePictureId)
     * }`)
     */

  }



  function mapProfileImages() {
    const images = [];
    for (let i = 1; i < 9; i++) {
      images.push(
        <img
          className="settingsImageOption"
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
