import { useState, useEffect } from "react";
import UserResults from "./UserResults";
import UserSettingsPanel from "./UserSettingsPanel";
import UserSummary from "./UserSummary";
import { useUser } from '../Context/UserContext';

function UserHome() {
  const [currentProfilepic, setCurrentProfilepic] = useState(0);
  const [showSettings, setShowSettings] = useState(true);
  const {user} = useUser()
  

  useEffect(()=>{
    if (user !==null) {
      const userPicNum = Number(user.profilePic)
      setCurrentProfilepic(userPicNum)
    }
  },[user])




  useEffect(()=>{
     console.log(user)
  },[user])

  return (
    <div id="WrapperUserHome">
      <h1 id="welcome">Welcome home {user.username}</h1>
      <UserSummary
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        currentProfilepic={currentProfilepic}
      />
      <UserResults />
      {showSettings ? (
        <UserSettingsPanel
        currentProfilepic={currentProfilepic}
        setCurrentProfilepic={setCurrentProfilepic}  
        />
        
      ) : null}
    </div>
  );
}

export default UserHome;
