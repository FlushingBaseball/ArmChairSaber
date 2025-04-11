import { NavLink } from "react-router-dom";
import SignOut from "./SignOut";
import { useUser } from './Context/UserContext';


function Nav() {
  const {user} = useUser();

  const logoLoc = "../Images/LOGOv4.svg";

  return (
    <div className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/today">Todays Games</NavLink>
      <NavLink to="/player/">Players</NavLink>
      <img
        className="logo"
        alt="life sized baseball in and old French Napoleonic Generals hat"
        src={logoLoc}
      ></img>
      <NavLink to="/leaderboard">LeaderBoard</NavLink>
      {user ? (
        <NavLink to={`/user/${user.username}`}>
          {user.username.length > 15
            ? user.username.substring(0, 9) + "..."
            : user.username}
        </NavLink>
      ) : null}
      {user ? (
        <SignOut/>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
}

export default Nav;
