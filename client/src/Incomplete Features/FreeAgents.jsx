import { useState, useEffect } from "react";

export default function FreeAgents() {
  const [freeAgentData, setFreeAgentData] = useState();

  useEffect(() => {
    fetch().then().then();
  }, []);

  return <div className="WrapperFreeAgents"></div>;
}
