import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";


//team logo, transactions, schedule, roster

function Teams() {
  const {user} = useUser()



  return (
    <div>
      <h1>Select Team</h1>
      <p>Place holder for eventual Map element</p>
    </div>
  );
}

export default Teams;
