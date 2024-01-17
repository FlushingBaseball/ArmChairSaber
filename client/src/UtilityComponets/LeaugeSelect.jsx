export default function LeaugeSelect({ handleSportSelect, selectedSportId }) {
  return (
    <div className="leaugeSelect">
      <button
        className={`leaugeSelectButton ${
          selectedSportId === "17" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("17")}
      >
        AFL
      </button>
      <button
        className={`leaugeSelectButton ${
          selectedSportId === "1" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("1")}
      >
        MLB
      </button>
      <button
        className={`leaugeSelectButton ${
          selectedSportId === "11" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("11")}
      >
        AAA
      </button>
      <button
        className={`leaugeSelectButton ${
          selectedSportId === "12" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("12")}
      >
        AA
      </button>
      <button
        className={`leaugeSelectButton ${
          selectedSportId === "13" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("13")}
      >
        A+
      </button>
      <button
        className={`leaugeSelectButton ${
          selectedSportId === "14" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("14")}
      >
        A
      </button>
      <button
        className={`leaugeSelectButton ${
          selectedSportId === "16" ? "activeSport" : null
        }`}
        onClick={() => handleSportSelect("16")}
      >
        ROK
      </button>
    </div>
  );
}
