import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { authMachine } from "./machines/auth";
import "./App.css";
import { Login } from "./components/login";
import { Header } from "./components/header";

function App() {
  const [state, send] = useMachine(authMachine);

  useEffect(() => {
    console.log("state", state.value);
    console.log("context", state.context);
  }, [state]);

  if (state.matches("logout")) {
    return (
      <div className="h-full w-full max-w-2xl m-auto">
        <Login send={send} />
      </div>
    );
  }

  return (
    <>
      <Header send={send} />
    </>
  );
}

export default App;
