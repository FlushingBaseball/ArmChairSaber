export default function PlayerCardBio({searchPlayer, playerData}){

  const fielderImage =searchPlayer ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${searchPlayer}/headshot/silo/current` : '/Images/default-batter.svg'


  return (
    <div className="WrapperPlayerCardBio">
        <img id="PlayerCardImage" src={fielderImage}></img>
        {console.log('This is player data',playerData)}
        <span>{playerData.people[0].active}</span>
    </div>
  )
  }
