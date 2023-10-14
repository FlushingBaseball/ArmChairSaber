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
            Roster Resource
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
