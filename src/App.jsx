import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { authMachine } from "./machines/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { Login } from "./components/login";
import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { Dashboard } from "./components/dashboard";
import { Orders } from "./components/orders";

const queryClient = new QueryClient();

function App() {
  const [state, send] = useMachine(authMachine);
  const [view, setView] = useState("graph");

  if (state.matches("logout")) {
    return (
      <div className="h-full w-full max-w-2xl m-auto">
        <Login send={send} />
      </div>
    );
  }

  const { accessToken } = state.context;

  return (
    <QueryClientProvider client={queryClient}>
      <Header send={send} />
      <Tabs setView={setView} view={view} />
      {view === "graph"
        ? accessToken !== "" && <Dashboard accessToken={accessToken} />
        : accessToken !== "" && <Orders accessToken={accessToken} />}
    </QueryClientProvider>
  );
}

export default App;
