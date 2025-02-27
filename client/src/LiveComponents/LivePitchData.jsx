function LivePitchData({ ...dataLiveGame }) {
  function mapPitches() {
    // console.log(dataLiveGame.liveData.plays.currentPlay.playEvents)
    return dataLiveGame.liveData.plays.currentPlay.playEvents.map((play, index) => {
      if (play.isPitch === true) {
        return (
          <div key={index} className="PitchWrapper">
            <div className="PitchType">
              <span className="PitchDescription">
                {play.details.type &&
                play.details.type.hasOwnProperty("description")
                  ? play.details.type.description
                  : null}
              </span>
              <span
                className={`PitchCall ${
                  play.details.isBall ? "CalledBall" : ""
                }`}
              >
                {play.details.call.description}
              </span>
            </div>

            <div className="PitchBreak">
              <span className="LivePitch">
                {play.pitchData.breaks &&
                play.pitchData.breaks.hasOwnProperty("breakAngle")
                  ? `Break angle: ${play.pitchData.breaks.breakAngle}`
                  : null}
              </span>
              <span className="LivePitch">
                {play.pitchData.breaks &&
                play.pitchData.breaks.hasOwnProperty("spinDirection")
                  ? `Spin Direction: ${play.pitchData.breaks.spinDirection}`
                  : null}
              </span>
              <span className="LivePitch">
                {play.pitchData.breaks &&
                play.pitchData.breaks.hasOwnProperty("spinRate")
                  ? `Spin Rate: ${play.pitchData.breaks.spinRate}`
                  : null}
              </span>
            </div>
            <div className="PitchVelo">
              <span className="LivePitch">
                {play.pitchData.breaks &&
                play.pitchData.breaks.hasOwnProperty("startSpeed")
                  ? `Start Speed: ${play.pitchData.startSpeed}`
                  : null}
              </span>
              <span className="LivePitch">
                {play.pitchData.breaks &&
                play.pitchData.breaks.hasOwnProperty("endSpeed")
                  ? `End Speed: ${play.pitchData.endSpeed}`
                  : null}
              </span>
            </div>
          </div>
        );
      }
      //Return ? based on warning?
    });
  }
  return <div className="pitches">{mapPitches()}</div>;
}

export default LivePitchData;
