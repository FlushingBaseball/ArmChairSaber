export default function StatGroupButtons({setSelectedStatType}){

  let requestedStatgroups = [];

  function handleStatButtonClick(value){
    requestedStatgroups.push(value +",")
    console.log("I Was clicked")
    console.log(requestedStatgroups);

  }
  

  return (
    <div className="WrapperStatGroupButtons">
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'hitting'}
       >
        Sabermetrics
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'pitching'}
       >
        pitching
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'fielding'}
       >
        fielding
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'catching'}
       >
        Catching
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'running'}
       >
        Running
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'game'}
       >
        Game
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'team'}
       >
        Team
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'streak'}
       >
        Streak
       </button>
    </div>
  )



}