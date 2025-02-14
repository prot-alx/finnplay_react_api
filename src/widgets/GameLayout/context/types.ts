export type GridColumns = 2 | 3 | 4;

export interface GridContextType {
  gridColumns: GridColumns;
  setGridColumns: (columns: GridColumns) => void;
}
