import React from "react";

export default function ResultPage({ result, onRestart }) {
  const { wpm, accuracy, correctChars, time } = result;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#2c2f33",
          padding: "40px 60px",
          borderRadius: "14px",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", marginBottom: "10px" }}>Test Complete</h1>

        <h2 style={{ color: "#ffb86c", marginBottom: "20px" }}>
          {wpm < 20
            ? "Newbie"
            : wpm < 40
            ? "Beginner"
            : wpm < 60
            ? "Intermediate"
            : wpm < 80
            ? "Advanced"
            : "Legendary"}
        </h2>

        <p style={{ color: "white", margin: "6px 0" }}>
          <strong>WPM:</strong> {wpm}
        </p>

        <p style={{ color: "white", margin: "6px 0" }}>
          <strong>Accuracy:</strong> {accuracy}%
        </p>

        <p style={{ color: "white", margin: "6px 0" }}>
          <strong>Correct Characters:</strong> {correctChars}
        </p>

        <p style={{ color: "white", margin: "6px 0" }}>
          <strong>Time:</strong> {time}s
        </p>

        <button
          onClick={onRestart}
          style={{
            marginTop: "25px",
            padding: "10px 20px",
            background: "#F6C644",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Restart Test
        </button>
      </div>
    </div>
  );
}
