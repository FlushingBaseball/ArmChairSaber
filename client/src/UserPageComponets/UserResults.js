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
  let operandOne = Number(user.totalGuessesCorrect);
  let operandTwo = Number(user.totalGuessesIncorrect);
  let percentage = "";
  function percentageCheck() {
    if (operandOne > 0 && operandTwo > 0) {
      percentage = operandOne / operandTwo;
    } else if (operandOne > 0 && operandTwo <= 0) {
      percentage = operandOne;
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
          {user.totalGuessesCorrect > 0 ? user.totalGuessesCorrect : "0"}
        </div>
        <div className="SummaryInstance">
          <span className="summarySpan">Incorrect</span>
          {user.totalGuessesIncorrect > 0 ? user.totalGuessesIncorrect : "0"}
        </div>
        <div className="SummaryInstance">
          <span className="summarySpan">% Correct</span>
          {typeof(percentage) === "number" ? percentage.toFixed(4) : percentage}
        </div>
      </div>
    </div>
  );
}
