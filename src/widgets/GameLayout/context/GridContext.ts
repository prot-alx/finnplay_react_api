import { createContext } from "react";
import { GridContextType } from "./types";

export const GridContext = createContext<GridContextType | undefined>(
  undefined
);
