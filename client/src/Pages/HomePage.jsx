import React, { useState } from "react";

import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Window from "../Components/Window";
import Keyboard from "../Components/Keyboard";
import ResultPage from "./ResultPage";

import Auth from "../auth/Auth.js";
import { supabase } from "../auth/supabaseClient.js";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [selectedTime, setSelectedTime] = useState(30);
  const [typingStarted, setTypingStarted] = useState(false);
  const [result, setResult] = useState(null);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const handleFinish = (data) => {
    setResult(data);
    console.log("Finished, Result : ", data);
  };

  if (result) {
    return (
      <ResultPage
        result={result}
        onRestart={() => {
          setResult(null);
          setTypingStarted(false);
        }}
      />
    );
  }

  const handleRestart = () => {
    setResult(null);
    setTypingStarted(false);
  };

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
      <Auth onUserChange={setUser} />

      <Header user={user} onSignIn={signIn} onSignOut={signOut} />

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
        />

        <div style={{ marginTop: "60px" }}>
          <Keyboard />
        </div>
      </div>

      <Footer />
    </div>
  );
}
