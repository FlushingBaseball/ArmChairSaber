


function FieldingCard({fielderImage, feildingData, averageSpeed, totalDistance, longestDistance }){


    return(
        <div className="playerFieldCard">
            <div className="playerBioInfo">
                 <img className="fieldImg" src={fielderImage}></img>
                 <span class="bioSpan">Age:</span>
                 <span class="bioSpan">Position:</span>
                 <span class="bioSpan">Born:</span>

            </div>
            <div className="cardInfo">
                <div className="sprintSpeed">
                    <h3 className="saberSpan">{`${feildingData[0].name_display_first_last}'s Average Sprint Speed is`}</h3>
                    <h5 className="saberSpan">{`${averageSpeed.toFixed(3)} Feet Per Second`}</h5>
                    <span className="saberSpan">For Comparrison the Leauge Average is: ~27fps</span>
                    <span className="saberSpan">Usain Bolt's Record 100 Meter Dash is ~33.80fps</span>
                </div>

                <div className="distanceAndCatch">
                    <h3 className="saberSpan">{`${feildingData[0].name_display_first_last} Has covered `}</h3>
                    <h5 className="saberSpan">{`${totalDistance.toFixed(2)} Feet: In the outfeild`}</h5>
                    <h5 className="saberSpan">{`The Longest Distnace he's covered on a single play is ${longestDistance.toFixed(2)} Feet`}</h5>
                </div>
            </div>
    </div> 
    )
}


export default FieldingCard