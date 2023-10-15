import { useState, useEffect } from "react"


export default function TableComponent(){

  const [xData, setxData] = useState('')
  
  useEffect(()=>{
    fetch(`https://statsapi.mlb.com/api/v1/stats?stats=lastXGames&group=pitching&teamId=121`)
    .then((resp)=> resp.json())
    .then((data)=>setxData(data))
  },[])



  return (
    <div className="WrapperTable">
      <h1>Test</h1>

    </div>
  )
}  





// const TableComponent = ({
    // <table>

    // </table>    
//     data
//   }) => {
//     let headings = Object.keys(data[1]);
//     return (
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             {
//               headings.map(heading => <th>{heading}</th>)
//             }
//           </tr>
//         </thead>
//         <tbody>
//           {
//               data.map(item => 
//                 <tr>
//                  {
//                     headings.map(heading => <td>{item[heading]}</td>) 
//                  }
//                 </tr>
//               )
//           }
//         </tbody>
//       </table>
//     );
//   }
  