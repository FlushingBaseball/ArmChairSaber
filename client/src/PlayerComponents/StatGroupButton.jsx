export default function StatGroupButton({value, label, onClick,isSelected, statDisplayMethod}){


  return (
    <>
      <button
        className={`statGroupButton ${isSelected ? 'selected-saber-button' : null}`}
        onClick={(event) => onClick(event, label, statDisplayMethod)}
        value={value}
      >
        {label}
      </button>
    </>
  )
}