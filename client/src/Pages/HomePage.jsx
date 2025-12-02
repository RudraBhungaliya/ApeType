import React from "react";

import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Window from "../Components/Window";
import Keyboard from "../Components/Keyboard";

export default function HomePage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#2c2f33",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <Navbar />

      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Window />

        <div style={{ marginTop: "60px" }}>
          <Keyboard />
        </div>
      </div>

      <Footer />
    </div>
  );
}
