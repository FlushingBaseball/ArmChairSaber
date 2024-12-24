import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  /**
   *
   * @param {the page name you want to navigate to} id
  *
  */
  function handleTileClick(id) {
    navigate(`/${id}`);
  }

  return (
    <div className="flexParent">

  <button
    className="homeTile"
    onClick={() => handleTileClick("Leaderboard")}
  >
    Predictions Leaderboard
    <img
      className="homeIcon"
      src="Images/HomePageIcons/LEADERBOARDv2.svg"
      alt="Mascots watching TV togeather"
    ></img>
  </button>


      <button
        className="homeTile panel-button"
        onClick={() => handleTileClick("rolling-metrics")}
      >
        Rolling Player Metrics By Team
        <img
          className="homeIcon"
          src="Images/HomePageIcons/BATTINGv3.svg"
          alt="Man batting ball"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("rosters")}>
        Roster Resource
        <img
          className="homeIcon"
          src="Images/HomePageIcons/ROSTERv5.svg"
          alt="Group of players from behind looking at floating math symbols"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("today")}>
        Predict Today's Games
        <img
          className="homeIcon"
          src="Images/HomePageIcons/PREDICTv3.svg"
          alt="Manager taking notes on dugout railing"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("player")}>
        Sabermetrics
        <img
          className="homeIcon"
          src="Images/HomePageIcons/SABERv4.svg"
          alt="Back of mans head looking at math"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("blog")} >
        Blog
        <img
          className="homeIcon"
          src="Images/HomePageIcons/BLOGv5.svg"
          alt="man running to catch sinking fly ball"
        ></img>
      </button>

      <button
        className="homeTile"
        // onClick={() => handleTileClick("advancedPitching")}
      >
        Advanced Pitching Tools *Regular Season 2024
        <img
          className="homeIcon"
          src="Images/HomePageIcons/PITCHINGv3.svg"
          alt="Baseball player and agent fielding phone calls"
        ></img>
      </button>
      {/* <button
        className="homeTile"
        // onClick={() => handleTileClick("advancedPitching")}
      >
        Free Agency
        <img
          className="homeIcon"
          src="Images/HomePageIcons/FREE-AGENTv2.svg"
          alt="Baseball player and agent fielding phone calls"
        ></img>
      </button> */}

      <button
        className="homeTile"
        onClick={() => handleTileClick("league-leaders")}
      >
        League Leaders
        <img
          className="homeIcon"
          src="Images/HomePageIcons/LEAGUEv2.svg"
          alt="Men Running up stairs"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("FAQ")}>
        FAQ
        <img
          className="homeIcon"
          src="Images/HomePageIcons/FAQv3.svg"
          alt="Overwhelmed Baseball mascot with math symbols swirling around it"
        ></img>
      </button>
    </div>
  );
}

export default HomePage;
