export default function TableComponent({ xData }) {
  if (!xData) {
    return <h1>...Loading</h1>;
  }

  function makeTable() {
    const headings = Object.keys(xData.stats[0].splits[0].stat);
    console.log(xData)

    return xData.stats[0].splits.map((player, index) => (
      <div className="PlayerStatCard" key={index}>
        <img className="batterImg10" alt="Photo of player" src={`https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${player.player.id}/headshot/silo/current`}></img>
        <h3>{player.player.fullName}</h3>
        <table>
          <thead>
            <tr>
              {headings.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {headings.map((heading) => (
                <td key={heading}>{player.stat[heading]}</td>
              ))}
            </tr>
          </tbody>
        </table >
      </div>
    ));
  }

  return <div className="WrapperTable">{makeTable()}</div>;
}
