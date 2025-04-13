import { useState, useEffect } from "react";

export default function NetworkLoader() {
  const [badLoad, setBadLoad] = useState(false);

  useEffect(() => {
    const timerBeforeBadLoad = setTimeout(() => {
      setBadLoad(true);
    }, 13000);

    // so it only runs once
    return () => clearTimeout(timerBeforeBadLoad);
  }, []);

  return (
    <div className="WrapperBatLoader">
      {badLoad ? (
        <div className="WrapperBadLoad">
          <h1 id="bad-load-header">
            Sorry Your Request Could not be completed
          </h1>
          <img id="playerStatsError" src="/Images/UtilityIcons/ERRORv1.svg"></img>
        </div>
      ) : (
        <div className="anime-background">

        {/* <div className="streak" style="top: 10%; width: 4px; height: 2px; animation-delay: 0s; animation-duration: 0.8s;"></div>
        <div className="streak" style="top: 20%; width: 6px; height: 3px; animation-delay: 0.1s; animation-duration: 1s;"></div>
        <div className="streak" style="top: 30%; width: 5px; height: 2px; animation-delay: 0.3s; animation-duration: 0.9s;"></div>
        <div className="streak" style="top: 40%; width: 4px; height: 2px; animation-delay: 0.2s; animation-duration: 0.8s;"></div>
        <div className="streak" style="top: 50%; width: 7px; height: 3px; animation-delay: 0.5s; animation-duration: 1.1s;"></div>
        <div className="streak" style="top: 60%; width: 4px; height: 2px; animation-delay: 0.4s; animation-duration: 0.7s;"></div>
        <div className="streak" style="top: 70%; width: 5px; height: 2px; animation-delay: 0.6s; animation-duration: 0.9s;"></div>
        <div className="streak" style="top: 80%; width: 6px; height: 3px; animation-delay: 0.3s; animation-duration: 1s;"></div>
        <div className="streak" style="top: 15%; width: 5px; height: 2px; animation-delay: 0.5s; animation-duration: 0.8s;"></div>
        <div className="streak" style="top: 25%; width: 6px; height: 3px; animation-delay: 0.7s; animation-duration: 0.9s;"></div>
     */}
        {/* <div className="flash"></div> */}
    
        <div className="center-content">
          <img src="Images/UtilityIcons/networkLoader.svg" alt="Baseball player staring down a anamorphic computer " />
       
        </div>
      </div>
      )}
    </div>
  );
}
