import { TableHeader, TableColumn } from "@nextui-org/react";

const CustomTableHeader = ({ headerColumns }) => {
  return (
    <TableHeader columns={headerColumns}>
      {(column: any) => (
        <TableColumn
          className={column.uid === "action" ? "text-end pr-10" : "text-start"}
          key={column.uid}
          align={column.uid === "action" ? "end" : "start"}
          allowsSorting={column.sortable}
        >
          {column.name}
        </TableColumn>
      )}
    </TableHeader>
  );
};
export default CustomTableHeader;
