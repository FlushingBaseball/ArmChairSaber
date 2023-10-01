import { scaleLinear } from '@visx/scale'
import { Circle } from '@visx/shape';



function LivePitchDataVis({...dataLiveGame}){



  const data =  [];

  for(let i =0; i<dataLiveGame.liveData.plays.currentPlay.playEvents.length; i++){
  
      if (dataLiveGame.liveData.plays.currentPlay.playEvents[i].isPitch === true){
        // console.log(dataLiveGame.liveData.plays.currentPlay.playEvents[i])
          data.push(dataLiveGame.liveData.plays.currentPlay.playEvents[i].pitchData.coordinates)
      }
  
  
  }
  
  console.log(data)
  
    
    const width = 200;
    const height = 200; 
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    
    const minDomain = -48;
    const maxDomain = 48;
    const maxRange = Math.min(width, height) - margin.top - margin.bottom;
  
    const feetToGraphUnits = feet => (feet * maxRange) / maxDomain;

    const xScale = scaleLinear({
      domain: [minDomain, maxDomain],
      range: [-maxRange / 2, maxRange],
    });
    
    const yScale = scaleLinear({
      domain: [minDomain, maxDomain],
      range: [-height , height],
    });
  
  
  
  
  
    const formattedData = data.map(({ pX, pZ }) => ({ pX, pZ }));
    console.log(formattedData)


  return(
        <div className='WrapperPitchingvis'>
        {dataLiveGame.liveData.plays.currentPlay.matchup.batSide.code === 'L' ? ( <img className='batterImg' src='/Images/lhb.svg'></img>) : null}
      <div className='pitchVis'>
      <svg className='strikezone' width={width} height={height}>
        {/* X-axis */}
        <line
            x1={width / 2} // Start from the center
            y1={height - margin.bottom}
            x2={width / 2} // End at the center
            y2={height - margin.bottom}
            stroke="black"
          />


        {/*Y*/}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="black" />

        {/* Square outline */}

        <line x1={margin.left} y1={margin.top} x2={margin.left + maxRange} y2={margin.top} stroke="black" />
        <line x1={margin.left + maxRange} y1={margin.top} x2={margin.left + maxRange} y2={height - margin.bottom} stroke="black" />
        <line x1={margin.left + maxRange} y1={height - margin.bottom} x2={margin.left} y2={height - margin.bottom} stroke="black" />
        <line x1={margin.left} y1={height - margin.bottom} x2={margin.left} y2={margin.top} stroke="black" />


        {/*  INNER BOX GANG GANGGGGG */}
        <line
          x1={width / 2 - maxRange * 0.3}
          y1={margin.top + maxRange * 0.2}
          x2={width / 2 + maxRange * 0.3}
          y2={margin.top + maxRange * 0.2}
          stroke="black"
        />
        <line
          x1={width / 2 + maxRange * 0.3}
          y1={margin.top + maxRange * 0.2}
          x2={width / 2 + maxRange * 0.3}
          y2={height - margin.bottom - maxRange * 0.2}
          stroke="black"
        />
        <line
          x1={width / 2 + maxRange * 0.3}
          y1={height - margin.bottom - maxRange * 0.2}
          x2={width / 2 - maxRange * 0.3}
          y2={height - margin.bottom - maxRange * 0.2}
          stroke="black"
        />
        <line
          x1={width / 2 - maxRange * 0.3}
          y1={height - margin.bottom - maxRange * 0.2}
          x2={width / 2 - maxRange * 0.3}
          y2={margin.top + maxRange * 0.2}
          stroke="black"
        />


        {formattedData.map((point, index) => (
          <Circle
          key={index}
          cx={xScale(feetToGraphUnits(point.pX))}
          cy={yScale(feetToGraphUnits(point.pZ))}
          r={5} 
          fill={dataLiveGame.liveData.plays.currentPlay.playEvents[index].details.isStrike ? "red" : "blue"}
          />
          ))}
      </svg>
      {/* {console.log(data)}
      {console.log(formattedData)} */}
    {dataLiveGame.liveData.plays.currentPlay.matchup.batSide.code === 'R' ? ( <img className='batterImg' src='/Images/rhb.svg'></img>) : null}
    </div>






        </div>
      






      )

}

export default LivePitchDataVis