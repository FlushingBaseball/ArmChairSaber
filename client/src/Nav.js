import { NavLink } from "react-router-dom"
import SignOut from "./SignOut";

function Nav({user, setUser, isLoggedIn, setIsLoggedIn}){

const logoLoc ="../Images/logo.svg"

return (
    <div className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to='/today'>Todays Games</NavLink>
        <NavLink to='/player/'>Players</NavLink>
        <img className="logo" src={logoLoc}></img>
        <NavLink to='/leaderboard'>LeaderBoard</NavLink>
        {isLoggedIn ? <NavLink to={`/user/${user.username}`} user={user}>{user.username}</NavLink> : null }
        {isLoggedIn ? <SignOut user={user} setUser={setUser}/> : <NavLink to='/login'>Login</NavLink> }
    </div>
)
}

export default Nav

