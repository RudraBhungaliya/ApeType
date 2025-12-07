import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResultPage({ result, onRestart }) {
  const navigate = useNavigate();

  const { wpm, accuracy, correctChars, time } = result;

  const getRank = (wpm) => {
    if (wpm < 20) return { label: "Newbie", color: "#ff5c5c" };
    if (wpm < 35) return { label: "Beginner", color: "#ff964f" };
    if (wpm < 50) return { label: "Intermediate", color: "#f4d03f" };
    if (wpm < 70) return { label: "Advanced", color: "#58d68d" };
    if (wpm < 100) return { label: "Pro", color: "#5dade2" };
    if (wpm < 130) return { label: "Elite", color: "#bb8fce" };
    return { label: "Legendary", color: "#f39c12" };
  };

  const rank = getRank(wpm);

  const handleRestart = () => {
    onRestart();
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#1e1e1e",
        color: "#fff",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#2c2f33",
          padding: "40px 60px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Test Complete
        </h1>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: rank.color,
          }}
        >
          {rank.label}
        </h2>

        <div style={{ fontSize: "22px", marginBottom: "15px" }}>
          <b>WPM:</b> {wpm}
        </div>
        <div style={{ fontSize: "22px", marginBottom: "15px" }}>
          <b>Accuracy:</b> {accuracy}%
        </div>
        <div style={{ fontSize: "22px", marginBottom: "15px" }}>
          <b>Correct Characters:</b> {correctChars}
        </div>
        <div style={{ fontSize: "22px", marginBottom: "25px" }}>
          <b>Time:</b> {time}s
        </div>

        <button
          onClick={handleRestart}
          style={{
            padding: "12px 24px",
            background: "#ffb86c",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
            color: "#000",
          }}
        >
          Restart Test
        </button>
      </div>
    </div>
  );
}
