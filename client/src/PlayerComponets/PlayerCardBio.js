export default function PlayerCardBio({searchPlayer, playerData}){

  const fielderImage =searchPlayer ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${searchPlayer}/headshot/silo/current` : '/Images/default-batter.svg'


  return (
    <div className="WrapperPlayerCardBio">
        <img id="PlayerCardImage" src={fielderImage}></img>
        {console.log('This is player data people[0]',playerData.people[0])}
        {/* <span>{playerData.people[0].active}</span> */}
        <h3>{playerData.people[0].firstLastName}</h3>
        <span className="bioSpan">{`Age: ${playerData.people[0].currentAge} `}</span>
        <span className="bioSpan">{`Height: ${playerData.people[0].height} `}</span>
        <span className="bioSpan">{`Weight: ${playerData.people[0].weight} `}</span>
        <span className="bioSpan">{`Drafted: ${playerData.people[0].draftYear} `}</span>

        <span className="bioSpan">{`Birth Date: ${playerData.people[0].birthDate} `}</span>
        <div className="WrapperBirth">
          <span className="bioSpan">{`Birth Place: ${playerData.people[0].birthCity} `}</span>
          <span className="bioSpan">{`${playerData.people[0].birthStateProvince} `}</span>
          <span className="bioSpan">{`${playerData.people[0].birthCountry} `}</span>
        </div>

        <span className="bioSpan">{`Bats: ${playerData.people[0].batSide.description} `}</span>
        <span className="bioSpan">{`Nickname: ${playerData.people[0].nickName ? playerData.people[0].nickName : 'None Recorded' } `}</span>
        <span className="bioSpan">{`First MLB game: ${playerData.people[0].mlbDebutDate} `}</span>

        <span className="bioSpan">{`Jersey Number: ${playerData.people[0].primaryNumber} `}</span>
        <span className="bioSpan">{`Position: ${playerData.people[0].primaryPosition.type} `}</span>
        <span className="bioSpan">{`${playerData.people[0].primaryPosition.abbreviation} `}</span>
        
    </div>
  )
  }
