import { useState } from "react";

import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalHeader,
  Divider,
  Spinner,
  Textarea,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Download, Plus, Search, Trash, Upload } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

import Breadcrumb from "../../components/common/Breadcrumb";
import BulkModal from "../../components/common/BulkModal";

export default function Dashboard() {
  const [isLoading] = useState(false);

  const endpoint = "storage/type";

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

  const [serialNumberData, setSerialNumberData] = useState([
    {
      item_key: "1",
      serial_number: "202401L177036001",
    },
    {
      item_key: "2",
      serial_number: "202401L177036002",
    },
    {
      item_key: "3",
      serial_number: "202401L177036003",
    },
    {
      item_key: "4",
      serial_number: "202401L177036004",
    },
    {
      item_key: "5",
      serial_number: "202401L177036005",
    },
    {
      item_key: "6",
      serial_number: "202401L177036006",
    },
    {
      item_key: "7",
      serial_number: "202401L177036007",
    },
    {
      item_key: "8",
      serial_number: "202401L177036008",
    },
    {
      item_key: "9",
      serial_number: "202401L177036009",
    },
    {
      item_key: "10",
      serial_number: "202401L177036010",
    },
  ]);

  const [newSerialNumber, setNewSerialNumber] = useState("");

  //#region useDisclosure

  const {
    isOpen: isOpenBulkUpload,
    onOpen: onOpenBulkUpload,
    onOpenChange: onOpenChangeBulkUpload,
  } = useDisclosure();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddSerialNumber = () => {
    if (newSerialNumber.trim() === "") return;

    const newItemKey = (
      parseInt(serialNumberData[serialNumberData.length - 1]?.item_key || "0") +
      1
    ).toString();

    const newSerialNumberData = {
      item_key: newItemKey,
      serial_number: newSerialNumber,
    };

    setSerialNumberData((prevData) => [...prevData, newSerialNumberData]);
    setNewSerialNumber("");
  };

  const handleDeleteSerialNumber = (itemKey: any) => {
    setSerialNumberData((prevData) =>
      prevData.filter((data) => data.item_key !== itemKey)
    );
  };

  return (
    <>
      <Breadcrumb
        pageName="Dashboard"
        items={[
          { name: "Dashboard", path: "../dashboard" },
          { name: "View Data" },
        ]}
      />

      <div className="md:flex ">
        <div className="basis-6/12">
          <div className="flex justify-start">
            <Input
              isClearable
              size="md"
              className=""
              placeholder="Search"
              startContent={<Search size={16} />}
            />
          </div>
        </div>
        <div className="basis-6/12">
          <div className="mb-4 flex justify-between md:justify-end gap-4 my-3 md:my-0">
            <Button
              onPress={onOpenBulkUpload}
              color="primary"
              endContent={<Download size={"20"} />}>
              Bulk Upload
            </Button>
            <Button
              //   onPress={onOpenBulkUpload}
              color="primary"
              endContent={<Upload size={"20"} />}>
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 font-body py-10">
        <div className="">
          <div className="mb-4 text-xl font-semibold">
            Material: DVTSAY002SBA
          </div>
          <Card>
            <CardBody className="p-5">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs">Material Description </div>
                  <div className="text-sm font-semibold">
                    TELSET,LAYADA,L177,CORDED,BINCID
                  </div>
                </div>
              </div>
              <div className="flex my-2">
                <div className="basis-6/12">
                  <div className="text-xs">Batch </div>
                  <div className="text-sm font-semibold">0009216HBC</div>
                </div>
                <div className="basis-6/12">
                  <div className="text-xs">Storage Location </div>
                  <div className="text-sm font-semibold">A431</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs">Serial Number </div>
                <div className="h-72  scrollbar-thumb-default-300 scrollbar-track-default-100 scrollbar-thin overflow-y-auto pr-3">
                  {serialNumberData.map((data, index) => {
                    return (
                      <div key={index}>
                        <div className="my-2 flex justify-between">
                          <div className="text-sm font-semibold">
                            {data.serial_number}
                          </div>
                          <div>
                            <Trash
                              onClick={() =>
                                handleDeleteSerialNumber(data.item_key)
                              }
                              size={18}
                              className="text-red-500"
                            />
                          </div>
                        </div>

                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex gap-x-10 pt-2">
                <div className="text-xs basis-11/12">
                  <Input
                    size="sm"
                    placeholder="Input Serial Number"
                    value={newSerialNumber}
                    onChange={(e) => setNewSerialNumber(e.target.value)}
                  />
                </div>
                <div className="text-xs basis-1/12">
                  <Button
                    className="text-white"
                    color="primary"
                    size="sm"
                    onPress={handleAddSerialNumber}>
                    <Plus size={18} />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-5">
          {() => (
            <>
              <ModalHeader className="flex gap-1 font-body">
                Add Data
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
                        value={formData?.code}
                        onChange={(e) =>
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
                          value={formData?.short_name}
                          onChange={(e) =>
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
                          value={formData?.long_name}
                          onChange={(e) =>
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
                        value={formData?.description}
                        onChange={(e) =>
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
    </>
  );
}
