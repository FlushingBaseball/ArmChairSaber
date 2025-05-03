import { useNavigate } from "react-router-dom"
import { useState } from "react"
//on hover show something
//add a nav link to navigate to the stats page
//use it in transaction and articles
function PlayerNameComponent({playerId, playerName }){
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <span 
      className={`Player-Name-Component`}
      onMouseEnter={()=>{setIsHovered(!isHovered)}}
      onMouseLeave={()=>{setIsHovered(!isHovered)}}
      onClick={()=>{navigate(`/player/${String(playerId)}`)}}
    >
      {playerName}
    </span>
  )
}

export default PlayerNameComponent;