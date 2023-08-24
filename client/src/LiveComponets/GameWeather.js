
function GameWeather({...dataLiveGame}){
    
    return (
        <div className="gameWeather">
            <span className="glanceSpan">Live Game Weather</span>
            <span className="glanceSpan">{`Condition: ${dataLiveGame.gameData.weather.condition} `}</span>
            <span className="glanceSpan">{`Temperature: ${dataLiveGame.gameData.weather.temp} `}</span>
            <span className="glanceSpan">{`Wind: ${dataLiveGame.gameData.weather.wind} `}</span>
        </div>

    )
}
export default GameWeather