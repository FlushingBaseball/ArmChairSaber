export default function UserResults({ user }) {
  function mapPredictions() {
    if (user.User_Predictions.length > 0) {
      return user.User_Predictions.map((prediction) => {
        return (
          <div className="WrapperSinglePrediction">
            <span className="predictionSpan">
              {`You Guessed ${prediction.predictedWinnerId}
                  would win ${prediction.game_Id}
                  and ${prediction.actualWinnerId} Won
                  `}
            </span>
          </div>
        );
      });
    } else {
      return <h3>You Haven't made any predictions yet</h3>;
    }
  }

  //  <h4>You guess correctly "cant put anything here untill resolutions are fixed" % of the time</h4>

  //  {mapPredictions()}

  /**
   * totalNumGuesses on user is currently not the best way to derive percentage
   * games can be not resolved yet
   */


  let total = Number(user.totalGuessesCorrect) + Number(user.totalGuessesIncorrect);
  let correct = Number(user.totalGuessesCorrect);
  let percentage = "";
  function percentageCheck() {
    if (total > 0) {
      percentage = correct / total;
    } else if (total > 0 && correct === 0) {
      percentage = correct;
    } else {
      percentage = "NA";
    }
    return percentage;
  }
  percentageCheck();

  return (
    <div className="wrapperUserResults">
      <h4 id="HeaderSummary">Predictions Summary</h4>
      <div id="UserResultsSummary">
        <div className="SummaryInstance">
          <span className="summarySpan">Correct</span>
          <span className="userDataSpan">{user.totalGuessesCorrect > 0 ? user.totalGuessesCorrect : "0"}</span>
        </div>
        <div className="SummaryInstance">
          <span className="summarySpan">Incorrect</span>
          <span className="userDataSpan">{user.totalGuessesIncorrect > 0 ? user.totalGuessesIncorrect : "0"}</span>
        </div>
        <div className="SummaryInstance">
          <span className="summarySpan">% Correct</span>
          <span className="userDataSpan">{typeof(percentage) === "number" ? percentage.toFixed(4) * 100 : percentage}</span>
        </div>
        <div className="SummaryInstance">
          <span className="summarySpan">Longest Streak</span>
          <span className="userDataSpan">{user.longestStreak ? user.longestStreak : "0"}</span>
        </div>
        <div className="SummaryInstance">
          <span className="summarySpan">Current Streak</span>
          <span className="userDataSpan">{user.currentStreak ? user.longestStreak : "0"}</span>
        </div>
      </div>
    </div>
  );
}
