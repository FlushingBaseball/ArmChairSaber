export default function UserStreaks({user}){


  return(
    <div className="WrapperUserStreaks">
      <div className="StreakSummary">
      <span className="summarySpan">Longest Streak </span>
        {user.longestStreak}
      </div>
      <div className="StreakSummary">
      <span className="summarySpan">Current Streak </span>
        {user.currentStreak}
      </div>
    </div>
  )
}

