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

  /**
   * Switched from clickable Div's to buttons. Accessibility is better and the styling challenge is rough but funny to dig into
   */

  return (
    <div className="flexParent">
      <button
        className="homeTile"
        onClick={() => handleTileClick("advancedPitching")}
      >
        Rolling Pitching Metrics by Team
        <img
          className="homeIcon"
          src="Images/HomePageIcons/PITCHINGv2.svg"
          alt="Man throwing ball"
        ></img>
      </button>

      <button
        className="homeTile panel-button"
        onClick={() => handleTileClick("advancedBatting")}
      >
        Rolling Batting Metrics by Team
        <img
          className="homeIcon"
          src="Images/HomePageIcons/BATTINGv3.svg"
          alt="Man batting ball"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("TeamMap")}>
        Roster Resource
        <img
          className="homeIcon"
          src="Images/HomePageIcons/Done1.svg"
          alt="Group of players from behind looking at floating math symbols"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("today")}>
        Predict Today's Games
        <img
          className="homeIcon"
          src="Images/HomePageIcons/done2.svg"
          alt="Manager taking notes on dugout railing"
        ></img>
      </button>

      <button className="homeTile" onClick={() => handleTileClick("player")}>
        Sabermetrics
        <img
          className="homeIcon"
          src="Images/HomePageIcons/hpSaber.svg"
          alt="Back of mans head looking at math"
        ></img>
      </button>

      <button
        className="homeTile"
        onClick={() => handleTileClick("Leaderboard")}
      >
        Predictions Leaderboard
        <img
          className="homeIcon"
          src="Images/HomePageIcons/LEADERv2.svg"
          alt="Mascots watching TV togeather"
        ></img>
      </button>

      <button
        className="homeTile" /* onClick={() => handleTileClick("test")} */
      >
        Blog
        <img
          className="homeIcon"
          src="Images/HomePageIcons/BLOGv3.svg"
          alt="man running to catch sinking fly ball"
        ></img>
      </button>

      <button
        className="homeTile"
        onClick={() => handleTileClick("LeagueLeaders")}
      >
        League Leaders
        <img
          className="homeIcon"
          src="Images/HomePageIcons/hpLeaugeLeaders.svg"
          // src="Images/HomePageIcons/hpLeaugeLeaders.svg"
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
