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
            <span className='navSpan'>Advanced Pitching Sabermetrics </span>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("advancedBatting")}>
            <span className='navSpan'>Advanced Batting Sabermetrics </span>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("TeamMap")}> 
            <span className='navSpan'>(not working) Team Map </span>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("today")}>
            <span className='navSpan'>Predict todays games </span>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("Leaderboard")}>
            <span className='navSpan'>Prediction Leaderboards </span>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("advancedFielding")}>
            <span className='navSpan'>Advanced Feilding</span>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("test")}>
            <span className='navSpan'>Testing</span>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("LeagueLeaders")}>
            <span className='navSpan'>Leauge Leaders</span>
        </button>

        <button className='homeTile' >
            <span className='navSpan'>(Nothing yet btn) Educational Material</span>
        </button>
    </div>
    )
}

export default HomePage
