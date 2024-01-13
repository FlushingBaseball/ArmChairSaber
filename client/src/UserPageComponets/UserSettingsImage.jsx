export default function UserSettingsImage(){

  function mapProfileImages(){
    const images = [];
    for (let i =1; i<9; i++){
      images.push(<img className="settingsImageOption" key={i} alt="neon user avatar" loading="lazy" src={`/Images/profilePics/p${i}.webp`}></img>)
      
    }
    return images
  }


  return(
    <div className="WrapperChooseImage">
      <h1>Choose a profile photo</h1>
            {mapProfileImages()}
    </div>
  )
}