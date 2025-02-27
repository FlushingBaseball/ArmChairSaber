export default function UserStreaks({user}){


  return(
    <div className="WrapperUserStreaks">
      <div className="StreakSummary">
        <span className="streakSpan">Longest Streak </span>
        <div className="userDataSpan"> {user.longestStreak} </div>
      </div>
      <div className="StreakSummary">
        <span className="streakSpan">Current Streak </span>
        <div className="userDataSpan"> {user.currentStreak} </div>
      </div>
    </div>
  )
}

