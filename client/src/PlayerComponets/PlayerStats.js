export default function PlayerStats({ playerData }) {
  const statCollection = [];

  function makeStats() {
    if (!playerData.people[0].stats) {
      return <h3>...Loading</h3>;
    }

    for (let i = 0; i < playerData.people[0].stats.length; i++) {
      statCollection.push(
        <h3 className="statHeader"
          key={'person'+ Math.random()}
        >
          {playerData.people[0].stats[i].type.displayName
            .split(/(?=[A-Z])/)
            .join(" ")
            .toUpperCase()}
        </h3>
      );
      for (const field in playerData.people[0].stats[i].splits[0].stat) {
        statCollection.push(
          <div className="StatWrapper" key={`stat-${i}-${field}`}>
            <span className="StatFeild">
              {field
                .split(/(?=[A-Z])/)
                .join(" ")
                .toUpperCase()}
            </span>
            <span className="StatDataSpan">
              {playerData.people[0].stats[i].splits[0].stat[field]}
            </span>
          </div>
        );
      }
    }

    return statCollection;
  }

  return <div className="WrapperPlayerStats">{makeStats()}</div>;
}
