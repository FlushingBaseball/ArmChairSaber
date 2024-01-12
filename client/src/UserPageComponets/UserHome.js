import { useState, useEffect } from "react";
import UserResults from "./UserResults";
import UserStreaks from "./UserStreaks";
import UserSettingsPanel from "./UserSettingsPanel";

function UserHome({ user }) {
  // console.log('user in userHOme is', user)

  // const userWins = user.totalGuessesCorrect;
  // const userLoses = user.totalGuessesIncorrect;
  const [userInfo, SetUserInfo] = useState("");

  useEffect(() => {
    fetch(`/users/${user.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        SetUserInfo(data);
      });
  }, []);

  // useEffect(()=>{
  //   console.log(userInfo)
  // },[userInfo])

  return (
    <div id="WrapperUserHome">
      <h1 id="welcome">Welcome home {user.username}</h1>

      <UserResults user={user} />
      <UserStreaks user={user} />
      {/* <UserSettingsPanel /> */}
    </div>
  );
}

export default UserHome;
