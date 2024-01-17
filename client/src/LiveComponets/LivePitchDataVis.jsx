import { scaleLinear } from "@visx/scale";
import { Circle } from "@visx/shape";

function LivePitchDataVis({ ...dataLiveGame }) {
  const data = [];

  // Taking all "pitch" events from play events in general
  for (let i = 0; i < dataLiveGame.liveData.plays.currentPlay.playEvents.length; i++) {
    if (
      dataLiveGame.liveData.plays.currentPlay.playEvents[i].isPitch === true
    ) {
      // console.log(dataLiveGame.liveData.plays.currentPlay.playEvents[i])
      // console.log(
      //   dataLiveGame.liveData.plays.currentPlay.playEvents[i].pitchData
      // );
      data.push(
        dataLiveGame.liveData.plays.currentPlay.playEvents[i].pitchData
          .coordinates
      );
    }
  }

    //Using the players own particular strike zone based on their height and leg length
  const strikeZoneTop =
    dataLiveGame.liveData.plays.currentPlay.matchup.strikeZoneTop !== undefined
      ? dataLiveGame.liveData.plays.currentPlay.matchup.strikeZoneTop
      : 3.49;

  const strikeZoneBottom =
    dataLiveGame.liveData.plays.currentPlay.matchup.strikeZoneBottom !==
    undefined
      ? dataLiveGame.liveData.plays.currentPlay.matchup.strikeZoneBottom
      : 1.601;

  const strikeZoneTopInches = strikeZoneTop * 12;
  const strikeZoneBottomInches = strikeZoneBottom * 12;






  const width = 150;
  const height = 150;
  const margin = { top: 5, right: 5, bottom: 5, left: 5 };

  const minDomain = -200;
  const maxDomain = 200;
  const maxRange = Math.min(width, height) - margin.top - margin.bottom;

  const feetToGraphUnits = (feet) => (feet * maxRange) / maxDomain;

  const pitchDataXScale = scaleLinear({
    domain: [minDomain, maxDomain],
    range: [-maxRange, maxRange],
  });

  const pitchDataYScale = scaleLinear({
    domain: [minDomain, maxDomain],
    range: [-height, height],
  });

    // Formatting the pitch data to get rid of the different 3D axis if included 
  const formattedData = data.map(({ x, y }) => ({
    x: pitchDataXScale(x),
    y: pitchDataYScale(y),
  }));

  return (
    <div className="WrapperPitchingvis">
      {dataLiveGame.liveData.plays.currentPlay.matchup.batSide.code === "L" ? (
        <img
          className="batterImg"
          alt="Left handed batter"
          src="/Images/lhb.svg"
        ></img>
      ) : null}
      <div className="pitchVis">
        <svg className="strikezone" width={width} height={height}>
          {/* X-axis */}
          <line
            x1={width / 2} // Start from the center
            y1={height - margin.bottom}
            x2={width / 2} // End at the center
            y2={height - margin.bottom}
            stroke="black"
          />

          {/*Y*/}
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke="black"
          />

          {/* OUTER BOX FOR STRIKEZONE CONTEXT*/}

          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left + maxRange}
            y2={margin.top}
            stroke="black"
          />
          <line
            x1={margin.left + maxRange}
            y1={margin.top}
            x2={margin.left + maxRange}
            y2={height - margin.bottom}
            stroke="black"
          />
          <line
            x1={margin.left + maxRange}
            y1={height - margin.bottom}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke="black"
          />
          <line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={margin.left}
            y2={margin.top}
            stroke="black"
          />

          {/* INNER BOX FOR STRIKEZONE */}
          <line
            x1={width / 2 - maxRange * 0.3}
            y1={margin.top + feetToGraphUnits(strikeZoneTopInches)}
            x2={width / 2 + maxRange * 0.3}
            y2={margin.top + feetToGraphUnits(strikeZoneTopInches)}
            stroke="black"
          />
          <line
            x1={width / 2 + maxRange * 0.3}
            y1={margin.top + feetToGraphUnits(strikeZoneTopInches)}
            x2={width / 2 + maxRange * 0.3}
            y2={
              height - margin.bottom - feetToGraphUnits(strikeZoneBottomInches)
            }
            stroke="black"
          />
          <line
            x1={width / 2 + maxRange * 0.3}
            y1={
              height - margin.bottom - feetToGraphUnits(strikeZoneBottomInches)
            }
            x2={width / 2 - maxRange * 0.3}
            y2={
              height - margin.bottom - feetToGraphUnits(strikeZoneBottomInches)
            }
            stroke="black"
          />
          <line
            x1={width / 2 - maxRange * 0.3}
            y1={
              height - margin.bottom - feetToGraphUnits(strikeZoneBottomInches)
            }
            x2={width / 2 - maxRange * 0.3}
            y2={margin.top + feetToGraphUnits(strikeZoneTopInches)}
            stroke="black"
          />

          <polygon
            points={`
           ${width / 2 - maxRange * 0.3},${
              margin.top + feetToGraphUnits(strikeZoneTopInches)
            }
             ${width / 2 + maxRange * 0.3},${
              margin.top + feetToGraphUnits(strikeZoneTopInches)
            }
             ${width / 2 + maxRange * 0.3},${
              height - margin.bottom - feetToGraphUnits(strikeZoneBottomInches)
            }
             ${width / 2 - maxRange * 0.3},${
              height - margin.bottom - feetToGraphUnits(strikeZoneBottomInches)
            }
          `}
            fill="rgba(177, 213, 120, 0.12)"
          />

          {formattedData.map((point, index) => (
            <Circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={5}
              fill={
                dataLiveGame.liveData.plays.currentPlay.playEvents[index]
                  .details.ballColor
              }
            />
          ))}
        </svg>

        {/* {console.log(data)}
        {console.log(formattedData)} */}
        {dataLiveGame.liveData.plays.currentPlay.matchup.batSide.code ===
        "R" ? (
          <img
            className="batterImg"
            alt="Right handed batter"
            src="/Images/rhb.svg"
          ></img>
        ) : null}
      </div>
    </div>
  );
}

export default LivePitchDataVis;
