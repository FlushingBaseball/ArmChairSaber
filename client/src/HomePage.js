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
            Predict Today's Games
        </button>

        <button className='homeTile' onClick={() => handleTileClick("Leaderboard")}>
            Predictions Leaderboard
        </button>

        <button className='homeTile' /*onClick={() => handleTileClick("advancedFielding")}*/>
            Advanced Fielding Unavailable *Relaunching Spring 2024
        </button>

        <button className='homeTile' onClick={() => handleTileClick("test")}>
            Blog *Launching November 2023
        </button>

        <button className='homeTile' onClick={() => handleTileClick("LeagueLeaders")}>
            League Leaders
        </button>

        <button className='homeTile' onClick={()=> handleTileClick("FAQ")}>
            FAQ
        </button>
    </div>
    )
}

export default HomePage
