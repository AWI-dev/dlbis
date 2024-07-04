import React, { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  SortDescriptor,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Tooltip,
  ModalHeader,
  Divider,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import {  Download, Eye, Plus, Upload } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import CustomPagination from "../../components/common/CustomPagination";
import useTableHeader from "../../hooks/TableHooks/useTableHeader";
import useTableFilter from "../../hooks/TableHooks/useTableFilter";
import useTableSort from "../../hooks/TableHooks/useTableSort";
import TableFilter from "../../components/common/Table/TableFilter";
import Breadcrumb from "../../components/common/Breadcrumb";
import BulkModal from "../../components/common/BulkModal";
import { Link } from "react-router-dom";


export default function Dashboard() {


  const endpoint = "storage/type";
  //#region Use Effect

  type TSelectedData = {
    name: string;
    id: string;
  };
  //#endregion

  //#region Inial column
  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Name", uid: "name", sortable: true },
    { name: "ACTION", uid: "action" },
  ];
  const initialColumns = [
    "id",
    "name",

    "action",
  ];
  //#endregion

  //#region Data Fetching


  const dataList = [
    {
      id: 1,
      name: "Tony Reichert",
     
    },
    {
      id: 2,
      name: "Zoey Lang",
     
    },
    {
      id: 3,
      name: "Jane Fisher",
     
    },
    {
      id: 4,
      name: "William Howard",
    
    },
    {
      id: 5,
      name: "Kristen Copper",
    
    },
    {
      id: 6,
      name: "Brian Kim",
    
    },
    {
      id: 7,
      name: "Michael Hunt",
     
    },
   
  ];

  type DataItem = (typeof dataList)[0];

  //#endregion

  //#region State
  const [isLoading, setIsLoading] = useState(false);
;

  // const [selectedData, setSelectedData] = useState<TSelectedData | null>(null);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [page, setPage] = React.useState(1);

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [operationType, setOperationType] = useState<"create" | "update">(
    "create"
  );

  //#endregion
  //#region Type
  type TForm = {
    id?: string;
    created_by_id: string;
    updated_by_id: string;
    code: string;
    short_name: string;
    long_name: string;
    description: string;
  };
  //#endregion

  //#endregion
  const [formData, setFormData] = useState<TForm>({
    created_by_id: "",
    updated_by_id: "",
    code: "",
    short_name: "",
    long_name: "",
    description: "",
  });

  //#region Hooks


  const { visibleColumns, headerColumns, setColumns } = useTableHeader(
    initialColumns,
    columns
  );

  const { filteredItems, filterValue, onSearchChange } = useTableFilter(
    dataList,
    [{ key: "id" }, { key: "name" }, ],
    setPage
  );

  const { items, sortedItems, pages, RowsPerPage, onRowsPerPageChange } =
    useTableSort(
      filteredItems,
      page,
      rowsPerPage,
      sortDescriptor,
      setPage,
      setRowsPerPage
    );

  //#endregion

  //#region useDisclosure


  const {
    isOpen: isOpenBulkUpload,
    onOpen: onOpenBulkUpload,
    onOpenChange: onOpenChangeBulkUpload,
  } = useDisclosure();

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onOpenChange: onOpenChangeCreate,
  } = useDisclosure();

  // const { isOpen: isOpenDelete, onOpenChange: onOpenChangeDelete } =
  //   useDisclosure();
  //#endregion


  //#region Rendering Table Content
  const renderCell = React.useCallback(
    (item: DataItem, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof DataItem];
      switch (columnKey) {
        case "action":
          return (
            <Link to={`../dashboard/view-data/${item.id}`} className="relative flex justify-end items-center gap-2 pr-11">
              <Eye size={17}/>
            </Link>
          );
        default:
          return cellValue ?? '--';
      }
    },
    []
  );
  //#endregion

  //#region Contents
  const topContent = React.useMemo(
    () => (
      <TableFilter
        title="Storage Type"
        filterValue={filterValue}
        setFilterValue={onSearchChange}
        visibleColumns={visibleColumns}
        setColumns={setColumns}
        columns={columns}
        dataList={dataList}
        RowsPerPage={RowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    ),
    [
      filterValue,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      dataList?.length,
      filterValue,
    ]
  );

  const bottomContent = React.useMemo(
    () => <CustomPagination pages={pages} page={page} setPage={setPage} />,
    [items.length, page, pages, filterValue]
  );
  //#endregion
  return (
    <>
    <Breadcrumb
        pageName="Dashboard"
        items={[{ name: "Dashboard", path: "/" }, { name: "Data" }]}
      />


      <div className="mb-4 flex justify-end gap-4">
        <Button
          onPress={onOpenCreate}
          color="primary"
          endContent={<Plus size={"20"} />}>
          Add New
        </Button>
        <Button
          onPress={onOpenBulkUpload}
          color="primary"
          endContent={<Download size={"20"} />}>
          Bulk Upload
        </Button>
      </div>

      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        className="bg-white p-5 rounded-md"
        classNames={{
          wrapper: "max-h-[500px]",
        }}
        isStriped
        topContent={topContent}
        topContentPlacement="outside"
        showSelectionCheckboxes={false}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}>
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              className={
                column.uid === "action" ? "text-end pr-10" : "text-start"
              }
              key={column.uid}
              align={column.uid === "action" ? "end" : "start"}
              allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingContent={"LOADING"}
          emptyContent={
            <div className="flex justify-center py-10">
              No Rows to Display
            </div>
          }
          items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        backdrop="opaque"
        isOpen={isOpenCreate}
        onOpenChange={onOpenChangeCreate}
        classNames={{
          base: "max-w-[100%] md:max-w-[50%] max-h-full h-full !mr-0 rounded-none absolute right-0",
        }}
        motionProps={{
          variants: {
            enter: {
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              x: 700,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}>
        <ModalContent className="p-5">
          {() => (
            <>
              <ModalHeader className="flex gap-1 font-body">
                {`${operationType[0].toUpperCase()}${operationType.slice(
                  1
                )} Data `}
              </ModalHeader>
              <Divider className="m-1" />
              <ModalBody>
                {isLoading ? (
                  <Spinner
                    className="flex items-center justify-center h-full font-body"
                    label="Loading..."
                    size="lg"
                    labelColor="primary"
                  />
                ) : (
                  <>
                    <form>
                    <Input
                        className="font-body"
                        isRequired
                        autoFocus
                        // isInvalid={errors?.code ? true : false}
                        value={formData?.code}
                        // errorMessage={errors?.code}
                        onChange={(e: any) =>
                          e.target.value !== undefined &&
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            code: e.target.value,
                          }))
                        }
                        label="Code"
                      />
                      <div className="flex flex-col lg:flex-row gap-4 my-4">
                        <Input
                          className="font-body"
                          isRequired
                          // isInvalid={errors?.short_name ? true : false}
                          value={formData?.short_name}
                          // errorMessage={errors?.short_name}
                          onChange={(e: any) =>
                            e.target.value !== undefined &&
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              short_name: e.target.value,
                            }))
                          }
                          label="Short Name"
                        />
                        <Input
                          className="font-body"
                          isRequired
                          // isInvalid={errors?.long_name ? true : false}
                          value={formData?.long_name}
                          // errorMessage={errors?.long_name}
                          onChange={(e: any) =>
                            e.target.value !== undefined &&
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              long_name: e.target.value,
                            }))
                          }
                          label="Long Name"
                        />
                      </div>
                      <Textarea
                        className="font-body mb-4"
                        // isInvalid={errors?.description ? true : false}
                        value={formData?.description}
                        // errorMessage={errors?.description}
                        onChange={(e: any) =>
                          e.target.value !== undefined &&
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            description: e.target.value,
                          }))
                        }
                        label="Description"
                      />
                      <div className=" flex justify-end">
                        <Button
                          isLoading={isLoading}
                          type="submit"
                          variant="solid"
                          className="bg-cta hover:opacity-80 text-white font-body">
                          Save
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <BulkModal
        isOpen={isOpenBulkUpload}
        onOpenChange={onOpenChangeBulkUpload}
        title="Import Data"
        file={null}
        endpoint={endpoint}
      />

      {/* <DeleteModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        title={`Are you sure you want to delete ${selectedData?.name}?`}
        endpoint={endpoint}
        id={selectedData?.id}
      /> */}
    </>
  );
}
