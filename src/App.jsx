import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { authMachine } from "./machines/auth";
import "./App.css";
import { Login } from "./components/login";
import { Header } from "./components/header";
import { Tabs } from "./components/tabs";

function App() {
  const [state, send] = useMachine(authMachine);

  useEffect(() => {
    console.log("state", state.value);
    console.log("context", state.context);
  }, [state]);

  const [view, setView] = useState("graph");

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
      <Tabs setView={setView} view={view} />
      {view === "graph" ? <div>chart</div> : <div>orders</div>}
    </>
  );
}

export default App;
