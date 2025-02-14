import { ReactNode, useMemo, useState } from "react";
import { GridContext } from "./GridContext";
import { GridColumns } from "./types";

export const GridProvider = ({ children }: { children: ReactNode }) => {
  const [gridColumns, setGridColumns] = useState<GridColumns>(4);

  const value = useMemo(
    () => ({
      gridColumns,
      setGridColumns,
    }),
    [gridColumns]
  );

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};
