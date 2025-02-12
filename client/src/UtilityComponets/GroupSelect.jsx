export default function GroupSelect({
  setSelectedGroup,
  selectedGroup
}) {
  function handleTeamChange(event) {
    const newGroupValue = event.target.value;
    setSelectedGroup(newGroupValue);
  }

  return (
    <div className="WrapperTeamSelect">
      <select
        className="UtilityTeamSelect"
        value={selectedGroup}
        onChange={handleTeamChange}
      >
        <option value={'hitting'}>Hiting</option>
        <option value={'pitching'}>Pitching</option>
      </select>
    </div>
  );
}
