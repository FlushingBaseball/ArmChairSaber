export default function PlayerCardBio({searchPlayer, playerData}){

  const fielderImage =searchPlayer ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${searchPlayer}/headshot/silo/current` : '/Images/default-batter.svg'


  return (
    <div className="WrapperPlayerCardBio">
        <img id="PlayerCardImage" src={fielderImage}></img>
        {console.log('This is player data people[0]',playerData.people[0])}
        {/* <span>{playerData.people[0].active}</span> */}
        <h3>{playerData.people[0].firstLastName}</h3>
        <span className="bioSpan">{`Age: ${playerData.people[0].currentAge}`}</span>
        <span className="bioSpan">{`Drafted: ${playerData.people[0].draftYear}`}</span>
        <span className="bioSpan">{`Birth Date: ${playerData.people[0].birthDate}`}</span>
        <span className="bioSpan">{`Birth Place: ${playerData.people[0].birthCity}`}</span>
        <span className="bioSpan">{`${playerData.people[0].birthStateProvince}`}</span>
        <span className="bioSpan">{`Bats: ${playerData.people[0].batSide.description}`}</span>
        <span className="bioSpan">{`Bats: ${playerData.people[0].batSide.description}`}</span>
        <span className="bioSpan">{`Bats: ${playerData.people[0].batSide.description}`}</span>
        {}
    </div>
  )
  }
