import React, { useState } from "react";

import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Window from "../Components/Window";
import Keyboard from "../Components/Keyboard";
import ResultPage from "./ResultPage";

import Auth from "../auth/Auth.js";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [selectedTime, setSelectedTime] = useState(30);
  const [typingStarted, setTypingStarted] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(selectedTime);

  const auth = Auth({ onUserChange: setUser });

  const handleFinish = (data) => {
    setResult(data);
  };

  if (result) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#1e1e1e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          margin: 0,
        }}
      >
        <ResultPage
          result={result}
          onRestart={() => {
            setResult(null);
            setTypingStarted(false);
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#2c2f33",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Header user={user} onSignIn={auth.signIn} onSignOut={auth.signOut} />

      <div
        style={{
          position: "absolute",
          top: "110px",
          right: "40px",
          background: "#141414",
          padding: "10px 20px",
          borderRadius: "8px",
          color: "#F6C644",
          fontFamily: "monospace",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      >
        {timeLeft}s
      </div>

      {!typingStarted && <Navbar onSelectTime={setSelectedTime} />}

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
        <Window
          selectedTime={selectedTime}
          onTypingStart={() => setTypingStarted(true)}
          onFinish={handleFinish}
          onTimeUpdate={(t) => setTimeLeft(t)}
        />

        <div style={{ marginTop: "60px" }}>
          <Keyboard />
        </div>
      </div>

      <Footer />
    </div>
  );
}
