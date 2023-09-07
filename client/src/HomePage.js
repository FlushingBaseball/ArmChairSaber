import { useNavigate } from 'react-router-dom';

function HomePage(){

    const navigate = useNavigate();

/**
 * 
 * @param {the page name you want to navigate to} id 
 *
 */
function handleTileClick(id){
  navigate(`/${id}`)
}



    // return(
    //     <div className="flexParent">
    //             <div role="button" className="homeTile" onClick={handleAdvancedPitchingClick}>
    //                 <span className='navSpan'>Advanced Pitching Sabermetrics </span>
    //             </div>
    //             <div role="button" className="homeTile" onClick={handleAdvancedBattingClick}> 
    //                 <span className='navSpan'>Advanced Batting Sabermetrics</span>
    //             </div>
    //             <div role="button" className="homeTile" onClick={handleMapClick}>
    //                 <span className='navSpan'> (not working) Team Map</span>
    //             </div>
    //             <div role="button" className="homeTile" onClick={handlePredictClick}>
    //                 <span className='navSpan'>Predict todays games</span>
    //             </div> 
    //             <div role="button" className="homeTile" onClick={handleLeaderboardClick}>
    //                 <span className='navSpan'>Prediction Leaderboards</span>
    //             </div>
    //             <div role="button" className="homeTile" onClick={handleAdvancedFieldingClick}>
    //                 <span className='navSpan'>Advanced Feilding</span>
    //             </div>
    //             <div role="button" className="homeTile" onClick={handleTestClick}>
    //                 <span className='navSpan'> Testing </span>
    //             </div>
    //             <div role="button" className="homeTile" onClick={handleLeaderClick}>
    //                 <span className='navSpan'>Leauge Leaders</span>
    //             </div>
    //             <div role="button" className="homeTile">
    //                 <span className='navSpan'> (Nothing yet div) Educational Material</span>
    //             </div>
    //     </div>
    // )

/**
 * Switched from clickable Div's to buttons. Accessibility is better and the styling challenge is rough but funny to dig into
 */

    return(
    <div className="flexParent">
        <button className='homeTile' onClick={() => handleTileClick("advancedPitching")}>
            Advanced Pitching Sabermetrics 
        </button>

        <button className='homeTile' onClick={() => handleTileClick("advancedBatting")}>
            Advanced Batting Sabermetrics
        </button>

        <button className='homeTile' onClick={() => handleTileClick("TeamMap")}> 
            not working
        </button>

        <button className='homeTile' onClick={() => handleTileClick("today")}>
            Predict todays games
        </button>

        <button className='homeTile' onClick={() => handleTileClick("Leaderboard")}>
            Predictions Leaderboard
        </button>

        <button className='homeTile' onClick={() => handleTileClick("advancedFielding")}>
            Advanced Fielding
        </button>

        <button className='homeTile' onClick={() => handleTileClick("test")}>
            Testing / one day educational material
        </button>

        <button className='homeTile' onClick={() => handleTileClick("LeagueLeaders")}>
            League Leaders
        </button>

        <button className='homeTile' onClick={()=> handleTileClick("Nothing")}>
            Nothing yet btn Educational Material
        </button>
    </div>
    )
}

export default HomePage
