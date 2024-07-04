import { Selection } from "@nextui-org/react";
import React from "react";

const useTableHeader = (initialColumns: any, columns:any) => {

  const INITIAL_VISIBLE_COLUMNS = initialColumns;
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const setColumns =(columns:any)=> {
    setVisibleColumns(columns);
  }

  return { visibleColumns, headerColumns , setColumns};
};

export default useTableHeader;
