import React from "react";
import HomePage from "./Pages/HomePage";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#2c2f33",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomePage />
    </div>
  );
}
