import React from "react";

export const Tabs = ({ setView, view }) => {
  return (
    <div className="flex w-full divide-x border-b-2 justify-center items-baseline flex-wrap">
      <button
        onClick={() => setView("graph")}
        className={`${
          view === "graph" ? "bg-purple-600 text-white" : "bg-white text-black"
        } w-1/2 p-4 font-bold cursor-pointer`}
      >
        Graph
      </button>
      <button
        onClick={() => setView("table")}
        className={`${
          view === "table" ? "bg-purple-600 text-white" : "bg-white text-black"
        } w-1/2 p-4 font-bold cursor-pointer border-l-1`}
      >
        Products
      </button>
    </div>
  );
};
