import { useEffect, useState, Fragment, useMemo } from "react";
import PlayerNameComponent from "../Incomplete Features/PlayerNameComponent";

export default function Transactions({selectedTeam}) {

  /**
   * TODO
   * On hover element for desktop
   * read the description to handle injuries since status change is vague
   */



  const [transactionData, setTransactionData] = useState([]);
  const [transactionDateStart, setTransactionDateStart] = useState(getFormattedPastDate())
  const [isCollapsed, setIsCollapsed] = useState(false)

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedCurrentDate = `${year}-${month}-${day}`;

  function getFormattedPastDate() {
    const today = new Date();
    const oldDate = new Date();
    oldDate.setDate(today.getDate() - 7);

    //formatting the old date
    const month = (oldDate.getMonth() + 1).toString().padStart(2, "0");
    const day = oldDate.getDate().toString().padStart(2, "0");
    const year = oldDate.getFullYear();
    const formattedOldDate = `${year}-${month}-${day}`;

    return formattedOldDate;
  }

 

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/transactions?teamId=${selectedTeam}&startDate=${transactionDateStart}&endDate=${formattedCurrentDate}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setTransactionData(data.transactions);
      });
  }, [transactionDateStart, selectedTeam]);

  // useEffect(() => {
  //   console.log(transactionData);
  // }, [transactionData]);

  function handleDateChange(event){
    setTransactionDateStart(event.target.value)
  }
  function handleCollapseShow() {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  }

// Removes the weird bug where the same trade is reported twice from both sides
//with the same transaction id causing a key error and was just silly listing twice
  const sortedTransactionData = useMemo(()=>{
    return transactionData.filter((transaction, index, self) => 
      index === self.findIndex((t) => t.id === transaction.id)
    ).toReversed();
  },[transactionData]);
 


  function highlightPlayerNames(
    transactionDescription,
    transactionPlayerName,
    transactionPlayerId
  ) {

    if (!transactionPlayerName){
      return <div className="Transaction-Array-Div">{transactionDescription}</div>
    }

    const transactionArray = transactionDescription.split(
      transactionPlayerName
    );
    const newTextArray = [
      <Fragment 
      key={Math.random()}
      >{transactionArray[0]}</Fragment>,
      <PlayerNameComponent
        key={Math.random()}
        playerId={transactionPlayerId}
        playerName={transactionPlayerName}
      />,
      <Fragment 
      key={Math.random()}
      >
        {transactionArray[1] ? transactionArray[1] : null}
      </Fragment>,
    ];
    return <div className="Transaction-Array-Div">{newTextArray}</div>;
  }

  return (
    <div className="Wrapper-Transactions">
      <h3 id="Transactions-Header">Transactions since {transactionDateStart} </h3>
      <i 
      className={isCollapsed ? "fa-solid fa-caret-up fa-rotate-180" : "fa-solid fa-caret-up"}
      id="alertArrow" 
      onClick={handleCollapseShow}
      />
      <div 
        className={`Collapser ${isCollapsed ? "collapsed" : ""}`}
      >
        <input 
          type="Date"
          id="Transaction-Date-Input"
          min={"01/01/2025"}
          max={currentDate}
          value={transactionDateStart}
          onChange={handleDateChange}
        />
          {(!transactionData.length) ?  <div className="No-Transactions-Span"><img id="playerStatsError" src="/Images/UtilityIcons/ERRORv1.svg"></img> {`No transactions were found from the date ${transactionDateStart} and ${formattedCurrentDate}`}</div> : 
        <table className="Transactions-Table">
          <thead>
            <tr>
              <th className="Transaction-Header">Date</th>
              <th className="Transaction-Header">Description</th>
              <th className="Transaction-Header" ></th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactionData.map((transaction) => {
              return (
                <tr className="Transaction-Row" key={`${transaction.id} + ${transaction.effectiveDate}`}>
                  <td id="Transaction-Date" className="transaction-data">{transaction.date}</td>
                  <td className="transaction-data">
                    {
                      transaction.person ? 
                    highlightPlayerNames(
                      transaction.description,
                      transaction.person.fullName,
                      transaction.person.id
                    ) :
                      highlightPlayerNames(
                        transaction.description
                      )
                    }
                  </td>
                  <td>
                     {/* <picture
                      id="Transaction-Image-Picture"
                    >
                      <source srcSet={`/api/transaction_images/${transaction.typeCode}_thumb.webp`} media="(max-width: 768px)"/>
                      <img
                        id="Transaction-Image-Img"
                        src={`/api/transaction_images/${transaction.typeCode}_med.webp`}
                      />
                    </picture>  */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> }
      </div>
    </div>
  );
}

