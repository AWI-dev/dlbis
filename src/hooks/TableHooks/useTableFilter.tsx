import React from "react";

const useTableFilter = (dataList:any, filters:any, setPage:any) => {
  const [filterValue, setFilterValue] = React.useState("");

  if (!Array.isArray(dataList)) {
    return { filteredItems: [] };
  }
  const filteredItems = dataList.filter((data) => {
    const lowerCaseFilterValue = filterValue.toLowerCase();
    return filters.some((filter:any) => {
      const value = data[filter.key];
      if (value && typeof value === "string") {
        const lowerCaseValue = value.toLowerCase();
        return lowerCaseValue.includes(lowerCaseFilterValue);
      }
      return value;
    });
  });

  const onSearchChange = (search: any) => {
    setFilterValue(search);
    setPage(1);
  };
  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  return { filteredItems, filterValue, onSearchChange, onClear };
};

export default useTableFilter;
