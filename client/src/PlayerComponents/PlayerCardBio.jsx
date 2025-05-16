import {handlePlayerImageError} from '../UtilityFunctions/UtilityFunctions'

export default function PlayerCardBio({ searchPlayer, playerData }) {
  const fielderImage = searchPlayer
    ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${searchPlayer}/headshot/silo/current`
    : "/Images/default-batter.svg";


  return (
    <div className="WrapperPlayerCardBio">
      <div id="ImageName">
        <h3 id="playerName">{playerData.people[0].firstLastName}</h3>
        <img id="PlayerCardImage"
         src={fielderImage}
         onError={(e) => handlePlayerImageError(e.target, searchPlayer)}
         ></img>
      </div>
      <div className="WrapperBioText">
        <div className="BioGrouping">
          <span className="Biofield">Age: </span>
          <span className="bioSpan">{playerData.people[0].currentAge}</span>
        </div>
        <div className="BioGrouping">
          <span className="Biofield">Height:</span>
          <span className="bioSpan">{playerData.people[0].height}</span>
        </div>
        <div className="BioGrouping">
          <span className="Biofield">Weight:</span>
          <span className="bioSpan">{playerData.people[0].weight}</span>
        </div>
        <div className="BioGrouping">
          <span className="Biofield">Drafted:</span>
          <span className="bioSpan">{playerData.people[0].draftYear}</span>
        </div>
        <div className="BioGrouping">
          <span className="Biofield">Birth Date:</span>
          <span className="bioSpan">{playerData.people[0].birthDate}</span>
        </div>

        <div className="BioGrouping">
          <span className="Biofield">Birth Place:</span>
          <span className="bioSpan">
            {`${playerData.people[0].birthCity ? playerData.people[0].birthCity : ''}
             ${playerData.people[0].birthStateProvince ? playerData.people[0].birthStateProvince : ''}
              ${playerData.people[0].birthCountry ? playerData.people[0].birthCountry : ''} `}
          </span>
        </div>

        <div className="BioGrouping">
          <span className="Biofield">Bats:</span>
          <span className="bioSpan">
            {playerData.people[0].batSide.description}
          </span>
        </div>

        <div className="BioGrouping">
          <span className="Biofield">Nickname:</span>
          <span className="bioSpan">{` ${
            playerData.people[0].nickName
              ? playerData.people[0].nickName
              : "None Recorded"
          } `}</span>
        </div>

        <div className="BioGrouping">
          <span className="Biofield">MLB debut:</span>
          <span className="bioSpan">{playerData.people[0].mlbDebutDate}</span>
        </div>

        <div className="BioGrouping">
          <span className="Biofield">Jersey Number:</span>
          <span className="bioSpan">{playerData.people[0].primaryNumber}</span>
        </div>

        <div className="BioGrouping">
          <span className="Biofield">Position:</span>
          <span className="bioSpan">
            {`${playerData.people[0].primaryPosition.type} ${playerData.people[0].primaryPosition.abbreviation}`}
          </span>
        </div>
      </div>
    </div>
  );
}
