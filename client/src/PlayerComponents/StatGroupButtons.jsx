import { useState } from "react";
import StatGroupButton from "./StatGroupButton";

export default function StatGroupButtons({
  searchPlayer,
  setApiEndpoint,
  setDisplayMethod
}) {

  const [selectedButton, setSelectedButton] = useState("Career");

  function handleStatButtonClick(event, label, statDisplayMethod ) {
    setApiEndpoint(event.target.value)
    setSelectedButton(label)
    setDisplayMethod(statDisplayMethod)
  }

  return (
    <div className="WrapperStatGroupButtons">
      <h3 id="stat-button-header">Stat Groups</h3>

      <StatGroupButton
        value={`https://statsapi.mlb.com/api/v1/people/*****?&season=2023&hydrate=stats(group=[],type=[career])`}
        onClick={handleStatButtonClick}
        label={"*Career"}
        isSelected={selectedButton ==='Career'}
        statDisplayMethod={"displayCareer"}
      />
      <StatGroupButton
        value={`https://statsapi.mlb.com/api/v1/people/*****?hydrate=stats(group=[hitting],type=[yearByYear])`}
        onClick={handleStatButtonClick}
        label={"Hitting by year"}
        isSelected={selectedButton ==='Hitting by year'}
        statDisplayMethod={"displayYearByYear"}
      />
      <StatGroupButton
        value={`https://statsapi.mlb.com/api/v1/people/*****?hydrate=stats(group=[pitching],type=[yearByYear])`}
        onClick={handleStatButtonClick}
        label={"Pitching by year"}
        isSelected={selectedButton ==='Pitching by year'}
        statDisplayMethod={"displayYearByYear"}
      />
      <StatGroupButton
        value={`https://statsapi.mlb.com/api/v1/people/*****?hydrate=stats(group=[fielding],type=[yearByYear])`}
        onClick={handleStatButtonClick}
        label={"Fielding by year"}
        isSelected={selectedButton ==='Fielding by year'}
        statDisplayMethod={"displayYearByYear"}
      />

      {/* <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"hitting"}
      >
        Hitting
      </button>
      <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"pitching"}
      >
        Pitching
      </button>
      <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"fielding"}
      >
        Fielding
      </button>
      <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"catching"}
      >
        Catching
      </button>
      <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"running"}
      >
        Running
      </button>
      <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"game"}
      >
        Game
      </button>
      <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"team"}
      >
        Team
      </button>
      <button
        className="statGroupButton"
        onClick={handleStatButtonClick}
        value={"streak"}
      >
        Streak
      </button>

        <button
          className="statGroupButton"
          onClick={handleStatButtonClick}
          value={"sabermetrics"}
        >
          sabermetrics
        </button>
        <button
          className="statGroupButton"
          onClick={handleStatButtonClick}
          value={"seasonAdvanced"}
        >
          Season Advanced
        </button> */}
        <StatGroupButton
        value={`https://statsapi.mlb.com/api/v1/people/*****?&season=2023&hydrate=stats(group=[career],type=[rankingsByYear])`}
        onClick={handleStatButtonClick}
        label={"Rankings by Year"}
        isSelected={selectedButton ==='Rankings by Year'}
        statDisplayMethod={"displayYearByYear"}
      />
      
    </div>
  );
}
