export default function StatGroupButtons({setSelectedStatGroup,setSelectedStatType}){

  let requestedStatgroups = [];
  let requestedStatTypes = []

  function handleStatButtonGroupClick(event){
    requestedStatgroups.push(String(event.target.value))
    // console.log("Stat Group Btn Was clicked")
    // console.log(requestedStatgroups);

  }

  function handleStatButtonTypeClick(event){
    // console.log('Stat Button Type was clicked')
    // console.log(requestedStatTypes);
    requestedStatTypes.push(String(event.target.value))

  }

  function handleSearchButtonClick(){
    setSelectedStatGroup(String(requestedStatgroups))
    setSelectedStatType(String(requestedStatTypes))
  }
  

  return (
    <div className="WrapperStatGroupButtons">
                 

      <button
        className="StatSearchBtn"
        onClick={handleSearchButtonClick}
        > { <i id="searchIcon" className="fa fa-search "></i> }
       &nbsp; SEARCH
      </button>

      <h3>Stat Groups</h3>

      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'hitting'}
       >
        Hitting
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'pitching'}
       >
        Pitching
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'fielding'}
       >
        Fielding
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'catching'}
       >
        Catching
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'running'}
       >
        Running
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'game'}
       >
        Game
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'team'}
       >
        Team
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonGroupClick}
       value={'streak'}
       >
        Streak
       </button>
      
       <h3> Batting Stat Types </h3>
       <div className="WrapperHittingTypeButtons">
          <button
          className="statGroupButton"
          onClick={handleStatButtonTypeClick}
          value={'sabermetrics'}
          >
            sabermetrics
          </button>
          <button
          className="statGroupButton"
          onClick={handleStatButtonTypeClick}
          value={'seasonAdvanced'}
          >
            Season Advanced
          </button>
          <button
          className="statGroupButton"
          onClick={handleStatButtonTypeClick}
          value={'rankingsByYear'}
          >
            rankingsByYear
          </button>
       </div>
    </div>
  )



}