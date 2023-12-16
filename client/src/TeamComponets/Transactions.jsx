import { useEffect, useState } from "react"
export default function Transactions({selectedTeam}){

const [TransactionData, setTransactionData] = useState('');

const [season, setSeason] = useState('2023');
const []

//(`http://statsapi.mlb.com/api/v1/people/freeAgents?season=2023&hydrate=person(person(stats(group=hitting,type=season))`

useEffect(()=>{
  fetch(`https://statsapi.mlb.com/api/v1/transactions?teamId=${selectedTeam}&startDate=2023-01-01&endDate=2023-12-31`)
  .then((resp)=>resp.json())
  .then((data)=>{
    setTransactionData(data)
  })
},[])





  return (
    <div className="WrapperTransactions">



    </div>
  )
}