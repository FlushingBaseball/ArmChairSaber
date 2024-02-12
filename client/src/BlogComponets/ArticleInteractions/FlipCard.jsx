import { useState } from "react"
import {useSpring, a} from '@react-spring/web'

export default function FlipCard({frontText, backText}){

const [flipped, setFlipped] = useState(false)
const {transform, opacity} = useSpring({
  opacity: flipped ? 1 : 0,
  transform: `perspective(600px) rotatex(${flipped ? 180 : 0}deg)`,
  config: {mass: 10, tension: 900, friction: 80},

})

  return (
    <div className="Wrapper-Flip-Card" onClick={() => setFlipped(state => !state)}>
      <a.div
        className="Flip-Card  Flip-Card-Front"
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      ><span className="FlipSpan">{frontText}</span></a.div>
      <a.div
        className="Flip-Card  Flip-Card-Back"
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      ><span className="FlipSpan">{backText}</span></a.div>
    </div>
  )
}

  