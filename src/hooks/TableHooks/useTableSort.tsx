import React from "react";

const useTableSort = (
  filteredItems: any,
  page: any,
  rowsPerPage: any,
  sortDescriptor: any,
  setPage: any,
  setRowsPerPage: any
) => {
  const RowsPerPage = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "50", value: "50" },
    { label: "100", value: "100" },
  ];

  const pages = Math.max(Math.ceil(filteredItems.length / rowsPerPage), 1);

  if (
    !Array.isArray(filteredItems) ||
    typeof page !== "number" ||
    typeof rowsPerPage !== "number"
  ) {
    return { items: [] };
  }
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const items = filteredItems.slice(start, end);
  const sortedItems = items.sort((a, b) => {
    const first = a[sortDescriptor.column];
    const second = b[sortDescriptor.column];
    if (first < second)
      return sortDescriptor.direction === "descending" ? 1 : -1;
    if (first > second)
      return sortDescriptor.direction === "descending" ? -1 : 1;
    return 0;
  });

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  return { items, sortedItems, pages, onRowsPerPageChange, RowsPerPage };
};

export default useTableSort;
