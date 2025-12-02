import React, { useState, useEffect } from "react";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export default function Keyboard() {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const down = (e) => setActiveKey(e.key.toLowerCase());
    const up = () => setActiveKey(null);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {rows.map((row, i) => (
        <div
          key={i}
          style={{ display: "flex", justifyContent: "center", gap: "12px" }}
        >
          {row.map((key) => {
            const isActive = activeKey === key;
            return (
              <div
                key={key}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#F6C644" : "#2B2B2B",
                  color: isActive ? "#000000" : "#C7C7C7",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "24px",
                  fontFamily: "monospace",
                  transition: "0.2s ease",
                  boxShadow: isActive ? "0 0 15px #F6C644" : "none",
                }}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
