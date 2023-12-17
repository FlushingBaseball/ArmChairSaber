import { useEffect, useState } from "react";
import TeamSelect from "../UtilityComponets/TeamSelect";

export default function Transactions() {
  const [TransactionData, setTransactionData] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("121");

  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedCurrentDate = `${year}-${month}-${day}`;

  function getFormattedDate30DaysAgo() {
    const today = new Date();
    const oldDate = new Date();
    oldDate.setDate(today.getDate() - 30);

    //formating the old date
    const month = (oldDate.getMonth() + 1).toString().padStart(2, "0");
    const day = oldDate.getDate().toString().padStart(2, "0");
    const year = oldDate.getFullYear();
    const formattedOldDate = `${year}-${month}-${day}`;

      return formattedOldDate;
  }

  const startingDate = getFormattedDate30DaysAgo();

  useEffect(() => {
    fetch(
      `https://statsapi.mlb.com/api/v1/transactions?teamId=${selectedTeam}&startDate=${startingDate}&endDate=${formattedCurrentDate}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setTransactionData(data);
      });
  }, []);

  useEffect(() => {
    console.log(TransactionData);
  }, [TransactionData]);

  return (
    <div className="WrapperTransactions">
      <h1>This </h1>
    </div>
  );
}
