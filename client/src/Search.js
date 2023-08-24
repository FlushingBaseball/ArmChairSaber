import { useState } from "react"

function Search({searchPlayer, setSearchPlayer, fetchedPlayers, setFetchedPlayers}){

const [query, setQuery] = useState('');


    if (fetchedPlayers.length < 3){
        return(<h1>...loading</h1>)
    }

    function handlePlayerDivClick(event){
        const clickId = event.target.getAttribute("div-player-id")
        setSearchPlayer(clickId)
    }

    const handleInputChange = (event) =>{
        setQuery(event.target.value.toLowerCase());
    };

    const filteredPlayers =  fetchedPlayers.filter(player => 
        player.firstLastName.toLowerCase().includes(query)
        );

    const maxResults =4;
    const displayedPlayers = filteredPlayers.slice(0, maxResults);


 
        // console.log(fetchedPlayers)
   

return (
    <div className="search">
        <input
            type="text"
            placeholder="Search by Player name"
            value={query}
            onChange={handleInputChange}
        />
        <div>
            {displayedPlayers.map(player => (
                <div key={player.id} div-player-id={player.mlbId} onClick={handlePlayerDivClick} >{player.firstLastName}</div>
            ))}
            {displayedPlayers.length ==0 && <p>No results found.</p>}
        </div>
    </div>
)

}

export default Search