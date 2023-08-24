import { NavLink } from "react-router-dom"
import SignOut from "./SignOut";



function Nav({user, setUser}){

    console.log('This is user', user)

//There is a default class called  active class on a NavLink 
const logoLoc ="../Images/logo.svg"

// if (user ===undefined){
//     return(
//         <div>
//             <h3>Loading</h3>
//         </div>
//     )
// }

return (
    <div className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to='/today'>Todays Games</NavLink>
        <img className="logo" src={logoLoc}></img>
        <NavLink to='/leaderboard'>LeaderBoard</NavLink>
        <NavLink to={`/user/${user.username}`}>{user.username}'s' User Page</NavLink>
        <SignOut user={user} setUser={setUser} />
    </div>
)
}

export default Nav

//<Link className="liveLink" to={`/TodaysGame/${gamePk}`}> Click Live game!</Link>}