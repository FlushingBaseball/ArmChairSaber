
function LiveCircles({...dataLiveGame}){

    return (
        <div className="WrapperLiveCircles">
                <div className="outGroup">
                    <span className="glanceSpan">{`${dataLiveGame.liveData.linescore.outs} Out(s)`}</span>
                        
                            <div id="outOne" className={dataLiveGame.liveData.linescore.outs >= 1 ? "StrikeMade" : null }></div>
                            <div id="outTwo" className={dataLiveGame.liveData.linescore.outs >= 2 ? "StrikeMade" : null }></div>
                            <div id="outThree" className={dataLiveGame.liveData.linescore.outs === 3 ? "StrikeMade" : null }></div>
                </div>

                <div className="strikeGroup">
                    <span className="glanceSpan">{`${dataLiveGame.liveData.linescore.strikes} Strike(s)`}</span>
                            <div id="strikeOne" className={dataLiveGame.liveData.linescore.strikes >= 1 ? "OutMade" : null }></div>
                            <div id="strikeTwo" className={dataLiveGame.liveData.linescore.strikes >= 2 ? "OutMade" : null }></div>
                            <div id="strikeThree"  className={dataLiveGame.liveData.linescore.strikes === 3 ? "OutMade" : null }></div>
                </div>
 
                <div className="ballGroup">
                    <span className="glanceSpan">{`${dataLiveGame.liveData.linescore.balls} Ball(s)`}</span>
                            <div id="ballOne" className={dataLiveGame.liveData.linescore.balls >= 1 ? "BallMade" : null }></div>
                            <div id="ballTwo" className={dataLiveGame.liveData.linescore.balls >= 2 ? "BallMade" : null }></div>
                            <div id="ballThree" className={dataLiveGame.liveData.linescore.balls >= 3 ? "BallMade" : null }></div>
                            <div id="ballFour" className={dataLiveGame.liveData.linescore.balls === 4 ? "BallMade" : null }></div>
                </div>
        </div>


           

    )
}


export default LiveCircles