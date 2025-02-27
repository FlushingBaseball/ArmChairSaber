import { useState, useEffect } from "react";
import BatLoader from "./BatLoader"

function Search({searchPlayer, setSearchPlayer }){

const [fetchedPlayers, setFetchedPlayers] = useState("");
const [query, setQuery] = useState('');


useEffect(() => {
  const fetchSearchData = () => {
    fetch("/api/players")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Network response wasn't okay`);
        }
        return resp.json();
      })
      .then((data) => {
        setFetchedPlayers(data);
      })
      .catch((error) => {
        console.error("Error fetching search players", error);
        setTimeout(fetchSearchData, 1000);
      });
  };
  fetchSearchData();
}, []);

    if (fetchedPlayers.length < 3){
        return <BatLoader />
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

return (
    <div className="search">
        <div className="SearchBarRow">
            <i id="searchIcon" className="fa fa-search fa-2x"></i>
            <input
                id="searchInput"
                type="text"
                placeholder="Search by Player name"
                value={query}
                onChange={handleInputChange}
            />
        </div>
        <div>
            {displayedPlayers.map(player => (
                <div key={player.id} className="displayedSearchOption" div-player-id={player.mlbId} onClick={handlePlayerDivClick} >{player.firstLastName}</div>
            ))}
            {displayedPlayers.length ===0 && <p>No results found.</p>}
        </div>
    </div>
)

}

export default Search