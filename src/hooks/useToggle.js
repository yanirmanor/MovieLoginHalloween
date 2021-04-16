import React, { useReducer } from "react";

export const useToggle = (initialValue = false) => {
  return useReducer((previousValue) => !previousValue, initialValue);
};
