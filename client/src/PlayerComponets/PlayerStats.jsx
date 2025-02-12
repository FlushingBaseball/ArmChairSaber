import BatLoader from "../UtilityComponets/BatLoader";

export default function PlayerStats({ playerData, displayMethod, searchPlayer }) {



  const displayMethods = {
    displayCareer: function(playerData){
      let statCollection = [];

      for (let i = 0; i < playerData.people[0].stats.length; i++) {
        statCollection.push(
          <h3 className="statHeader"
            key={'person'+ Math.random()}
          >
            {playerData.people[0].stats[i].type.displayName
              .split(/(?=[A-Z])/)
              .join(" ")
              .toUpperCase()}
          </h3>
        );
        for (const field in playerData.people[0].stats[i].splits[0].stat) {
          statCollection.push(
            <div className="StatWrapper" key={`stat-${i}-${field}-${playerData.people[0].stats[i].splits[0].season}`}>
              <span className="StatFeild">
                {field
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .toUpperCase()}
              </span>
              <span className="StatDataSpan">
                {playerData.people[0].stats[i].splits[0].stat[field]}
              </span>
            </div>
          );
        }
      }
      return statCollection;
    },
    displayYearByYear: function(playerData){
      let statCollection = [];

      for (let i = 0; i < playerData.people[0].stats.length; i++) {
        statCollection.push(
          <h3 className="statHeader" key={"person" + Math.random()}>
            {playerData.people[0].stats[i].type.displayName
              .split(/(?=[A-Z])/)
              .join(" ")
              .toUpperCase()}
          </h3>
        );
  
        for (let j = 0; j < playerData.people[0].stats[i].splits.length; j++) {

          statCollection.push(
            <h3 id="season-stat-header" key={"person" + Math.random()}>
              {playerData.people[0].stats[i].splits[j].season ? `${playerData.people[0].stats[i].splits[j].season} ${playerData.people[0].stats[i].splits[j].team.name}` : null}
            </h3>
          );
          if (Object.keys(playerData.people[0].stats[i].splits[j].stat).length < 1){
            statCollection.push(<span>No qualifying data this season</span>)
          }
          else{
            for (const field in playerData.people[0].stats[i].splits[j].stat) {
              statCollection.push(
                <div className="StatWrapper" key={`stat-${i}-${field}-${playerData.people[0].stats[i].splits[j].season}`}>
                  <span className="StatFeild">
                    {field
                      .split(/(?=[A-Z])/)
                      .join(" ")
                      .toUpperCase()}
                  </span>
                  <span className="StatDataSpan">
                    {typeof(playerData.people[0].stats[i].splits[j].stat[field]) === "object" ? "NA" : playerData.people[0].stats[i].splits[j].stat[field]}
                  </span>
                </div>
              );
            }
          }
        }

      }

      return statCollection;

    }
  }



  function makeStats(displayMethod, playerData) {

    if (!playerData.people[0].stats) {
      return <BatLoader />;
    }
    
    const chosenDisplayMethod = displayMethods[displayMethod];

    if (chosenDisplayMethod) {
      return  chosenDisplayMethod(playerData);
    }
    else{
      console.error(`Display method issue ${displayMethod}`)
      return <BatLoader />
    }

  }

  return <div className="WrapperPlayerStats">{makeStats(displayMethod, playerData)}</div>;
}
