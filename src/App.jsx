import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { authMachine } from "./machines/auth";
import "./App.css";

function App() {
  const [state, send] = useMachine(authMachine);

  useEffect(() => {
    console.log("state", state.value);
    console.log("context", state.context);
  }, [state]);

  return (
    <div>
      <button className="m-5" onClick={() => send("LOGIN")}>
        login
      </button>
      <button className="m-5" onClick={() => send("LOGOUT")}>
        logout
      </button>
    </div>
  );
}

export default App;
