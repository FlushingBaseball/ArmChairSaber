import {handleImageError} from '../UtilityFunctions/UtilityFunctions'

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
         onError={(e) => handleImageError(e.target, searchPlayer)}
         ></img>
      </div>
      <div className="WrapperBioText">
        {/* {console.log('This is player data people[0]',playerData.people[0])} */}
        <div className="BioGrouping">
          <span className="BioFeild">Age: </span>
          <span className="bioSpan">{playerData.people[0].currentAge}</span>
        </div>
        <div className="BioGrouping">
          <span className="BioFeild">Height:</span>
          <span className="bioSpan">{playerData.people[0].height}</span>
        </div>
        <div className="BioGrouping">
          <span className="BioFeild">Weight:</span>
          <span className="bioSpan">{playerData.people[0].weight}</span>
        </div>
        <div className="BioGrouping">
          <span className="BioFeild">Drafted:</span>
          <span className="bioSpan">{playerData.people[0].draftYear}</span>
        </div>
        <div className="BioGrouping">
          <span className="BioFeild">Birth Date:</span>
          <span className="bioSpan">{playerData.people[0].birthDate}</span>
        </div>

        <div className="BioGrouping">
          <span className="BioFeild">Birth Place:</span>
          <span className="bioSpan">
            {`${playerData.people[0].birthCity ? playerData.people[0].birthCity : ''}
             ${playerData.people[0].birthStateProvince ? playerData.people[0].birthStateProvince : ''}
              ${playerData.people[0].birthCountry ? playerData.people[0].birthCountry : ''} `}
          </span>
        </div>

        <div className="BioGrouping">
          <span className="BioFeild">Bats:</span>
          <span className="bioSpan">
            {playerData.people[0].batSide.description}
          </span>
        </div>

        <div className="BioGrouping">
          <span className="BioFeild">Nickname:</span>
          <span className="bioSpan">{` ${
            playerData.people[0].nickName
              ? playerData.people[0].nickName
              : "None Recorded"
          } `}</span>
        </div>

        <div className="BioGrouping">
          <span className="BioFeild">MLB debut:</span>
          <span className="bioSpan">{playerData.people[0].mlbDebutDate}</span>
        </div>

        <div className="BioGrouping">
          <span className="BioFeild">Jersey Number:</span>
          <span className="bioSpan">{playerData.people[0].primaryNumber}</span>
        </div>

        <div className="BioGrouping">
          <span className="BioFeild">Position:</span>
          <span className="bioSpan">
            {`${playerData.people[0].primaryPosition.type} ${playerData.people[0].primaryPosition.abbreviation}`}
          </span>
        </div>
      </div>
    </div>
  );
}
