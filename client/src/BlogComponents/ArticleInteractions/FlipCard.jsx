import { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import { handlePlayerImageError } from "../../UtilityFunctions/UtilityFunctions";

export default function FlipCard({ frontText, backText, playerId, playerName}) {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotatex(${flipped ? 180 : 0}deg)`,
    config: { mass: 10, tension: 900, friction: 80 },
  });

  const playerImage = `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${playerId}/headshot/silo/current`;

  return (
    <div
      className="Wrapper-Flip-Card"
      onClick={() => setFlipped((state) => !state)}
      >
      <a.div
        className="Flip-Card  Flip-Card-Front"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <span id="player-flipcard-name">{playerName}</span>
        {playerId ? (
          <img
          id="Flip-Card-Image"
          src={playerImage}
          onError={(e) => handlePlayerImageError(e.target, playerId)}
          ></img>
          ) : null}
        <span className="FlipSpan">{frontText}</span>
      </a.div>
      <a.div
        className="Flip-Card  Flip-Card-Back"
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
      >
        <span className="FlipSpan">{backText}</span>
      </a.div>
    </div>
  );
}
