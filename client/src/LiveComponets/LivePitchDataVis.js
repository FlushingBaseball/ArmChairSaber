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
  
  
  
    
    const width = 200;
    const height = 200; 
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    
    const minDomain = 0;
    const maxDomain = 300;
    const maxRange = Math.min(width, height) - margin.left - margin.right;
  
    const xScale = scaleLinear({
      domain: [minDomain, maxDomain],
      range: [margin.left, margin.left + maxRange],
    });
    
    const yScale = scaleLinear({
      domain: [minDomain, maxDomain],
      range: [height - margin.bottom, height - margin.bottom - maxRange],
    });
  
  
  
  
  
    const formattedData = data.map(({ x, y }) => ({ x, y }));



  return(
        <div className='WrapperPitchingvis'>
        {dataLiveGame.liveData.plays.currentPlay.matchup.batSide.code === 'L' ? ( <img className='batterImg' src='/Images/lhb.svg'></img>) : null}
      <div className='pitchVis'>
      <svg className='strikezone' width={width} height={height}>
        {/* X-axis */}
        <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="black" />


        {/*Y*/}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="black" />

        {/* Square outline */}
        <line x1={margin.left} y1={margin.top} x2={margin.left + maxRange} y2={margin.top} stroke="black" />
        <line x1={margin.left + maxRange} y1={margin.top} x2={margin.left + maxRange} y2={height - margin.bottom} stroke="black" />
        <line x1={margin.left + maxRange} y1={height - margin.bottom} x2={margin.left} y2={height - margin.bottom} stroke="black" />
        <line x1={margin.left} y1={height - margin.bottom} x2={margin.left} y2={margin.top} stroke="black" />

        {/*  INNER BOX GANG GANGGGGG */}
        <line x1={margin.left + maxRange * 0.2} y1={margin.top + maxRange * 0.2} x2={margin.left + maxRange * 0.8} y2={margin.top + maxRange * 0.2} stroke="black" />
        <line x1={margin.left + maxRange * 0.8} y1={margin.top + maxRange * 0.2} x2={margin.left + maxRange * 0.8} y2={height - margin.bottom - maxRange * 0.2} stroke="black" />
        <line x1={margin.left + maxRange * 0.8} y1={height - margin.bottom - maxRange * 0.2} x2={margin.left + maxRange * 0.2} y2={height - margin.bottom - maxRange * 0.2} stroke="black" />
        <line x1={margin.left + maxRange * 0.2} y1={height - margin.bottom - maxRange * 0.2} x2={margin.left + maxRange * 0.2} y2={margin.top + maxRange * 0.2} stroke="black" />


        {formattedData.map((point, index) => (
          <Circle
          key={index}
          cx={xScale(point.x)}
          cy={yScale(point.y)}
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