export default function SlotMachine(){

const choiceObject = {
  "Montreal": 1,
  "Nashville": 2,
  "Portland": 3,
  "Salt Lake": 4,
  "Oakland": 5,
  "Orlando": 6,
  "Charlotte": 7,
  "Charleston": 8,
  "Raleigh": 9,
  "San Antonio": 10,
  "Dallas": 11,
  "Vancouver": 12,
}


/**
 * This is not a static image! on a touch screen pull the level down with your
 * finger then release, using a mouse click and drag downwards then release
 * *Accessble opton foucs the wight and press enter or space"
 */

  function leverPull(){
    const num = Object.keys(choiceObject).length
    console.log(num)



    for (const [key, value] of Object.entries(choiceObject)){



    }
  }


  return (
    <div className="Wrapper-Slot-Machine">
        <button id="slotPull" onClick={leverPull}>Pull me</button>
        {/* <span className="pullResult">{}</span> */}
    </div>
  )
}
