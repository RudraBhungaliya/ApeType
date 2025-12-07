import React, { useState } from "react";

export default function Navbar({ onSelectTime }) {
  const times = [15, 30, 60, 120];

  const [selected, setSelected] = useState(30);

  const handleClick = (t) => {
    setSelected(t);
    console.log("Selected Time:", t);
    onSelectTime(t);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "28px",
      }}
    >
      <div
        style={{
          backgroundColor: "#2c2f33",
          padding: "14px 32px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "34px",
          fontFamily: "monospace",
          fontSize: "20px",
          color: "#C7C7C7",
          boxShadow: "0px 0px 25px #00000050",
        }}
      >
        <span style={{ opacity: 0.7, color: "white" }}>Choose Time :</span>

        {times.map((t) => (
          <span
            key={t}
            onClick={() => handleClick(t)}
            style={{
              cursor: "pointer",
              color: selected === t ? "#F6C644" : "#ffffff66",
              fontWeight: selected === t ? "bold" : "normal",
              transition: "0.15s ease",
              textShadow:
                selected === t ? "0 0 10px rgba(246,198,68,0.8)" : "none",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
