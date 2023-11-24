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
            Rolling Pitching Metrics by Team
            <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>

        <button className='homeTile panel-button' onClick={() => handleTileClick("advancedBatting")}>
             Rolling Batting Metrics by Team
             <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("TeamMap")}> 
            Roster Resource
            <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("today")}>
            Predict Today's Games
            <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>
        
        <button className='homeTile' onClick={() => handleTileClick("player")}>
            Sabermetrics
            <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("Leaderboard")}>
            Predictions Leaderboard
            <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>


        <button className='homeTile' /* onClick={() => handleTileClick("test")} */>
            Blog
            <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>

        <button className='homeTile' onClick={() => handleTileClick("LeagueLeaders")}>
            League Leaders
             <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial4.svg'></img>
        </button>

        <button className='homeTile' onClick={()=> handleTileClick("FAQ")}>
            FAQ
            <img  
             className='homeIcon'
             src='Images/HomePageIcons/trial5.svg'></img>
        </button>
    </div>
    )
}

export default HomePage
