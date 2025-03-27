import { useState, useEffect } from "react";
import UserResults from "./UserResults";
import UserSettingsPanel from "./UserSettingsPanel";
import UserSummary from "./UserSummary";

// function UserHome({ user }) {
function UserHome() {
  const [userInfo, SetUserInfo] = useState("");
  const [currentProfilepic, setCurrentProfilepic] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  useEffect(() => {
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          SetUserInfo(user);
          if (user.profilePic != false){
            const tempNum = Number(user.profilePic)
            setCurrentProfilepic(tempNum);
          }
        });
      }
    });
  }, []);

  // useEffect(()=>{
  //    console.log(userInfo)
  // },[userInfo])

  return (
    <div id="WrapperUserHome">
      <h1 id="welcome">Welcome home {userInfo.username}</h1>
      <UserSummary
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        currentProfilepic={currentProfilepic}
      />
      <UserResults user={userInfo} />
      {showSettings ? (
        <UserSettingsPanel
        userId={userInfo.id}
        currentProfilepic={currentProfilepic}
        setCurrentProfilepic={setCurrentProfilepic}  
        
        />
        
      ) : null}
    </div>
  );
}

export default UserHome;
