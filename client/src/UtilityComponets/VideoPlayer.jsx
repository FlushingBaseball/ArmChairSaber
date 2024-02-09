
export default function VideoPlayer({videoSource, videoType, capText}){



  return (
    <div className="Wrapper-Video-Player">
      <video
        id="Armchair-Video"
       controls controlsList="nofullscreen nodownload noremoteplayback">
        <source src={`/Videos/${videoSource}`} type={`video/${videoType}`}/>
        {/* <autoplay />
        <mute />
         */}
      </video>
      <span id="vidSpan">{capText}</span>
    </div>
  )
}


<source src={`/Videos/hill3.mp4`} type="video/mp4" />
