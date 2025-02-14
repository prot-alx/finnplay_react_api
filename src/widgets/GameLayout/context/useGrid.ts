import { useContext } from "react";
import { GridContext } from "./GridContext";
import { GridContextType } from "./types";

export const useGrid = (): GridContextType => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
};
