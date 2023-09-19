export default function PlayerStats({playerData}){

const statCollection = [];

function makeStats(){

  for (let i =0; i<playerData.people[0].stats.length; i++){
    console.log('Right now we are in stat', i)
    for (const feild in playerData.people[0].stats[0].splits[0].stat){
      statCollection.push(
        <div className="StatWrapper" key={feild}>
          <span className="StatFeild" >
            {feild.split(/(?=[A-Z])/).join(" ").toUpperCase()}
          </span>
          <span>{playerData.people[0].stats[0].splits[0].stat[feild]}</span>
        </div>
      )
      // console.log(feild)
    } 
  }
  return statCollection
  }









  return (
    <div className="WrapperPlayerStats">
               
      {makeStats()}
    </div>
  )
} 