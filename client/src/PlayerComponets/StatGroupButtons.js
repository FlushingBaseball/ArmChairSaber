export default function StatGroupButtons(){

  let requestedStatgroups = [];

  function handleStatButtonClick(value){
    requestedStatgroups.push(value.toString() +",")
    console.log("I Was clicked", requestedStatgroups)
    console.log(requestedStatgroups);

  }
  

  return (
    <div className="WrapperStatGroupButtons">
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'sabermetrics'}
       >
        Sabermetrics
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'sabermetrics'}
       >
        Sabermetrics
       </button>
      <button
       className="statGroupButton"
       onClick={handleStatButtonClick}
       value={'sabermetrics'}
       >
        Sabermetrics
       </button>
    </div>
  )



}