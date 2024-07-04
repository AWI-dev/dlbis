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
import { Download, Plus, Search, Upload } from "lucide-react";
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

  return (
    <>
      <Breadcrumb
        pageName="Dashboard"
        items={[{ name: "Dashboard", path: "../dashboard" }, { name: "View Data" }]}
      />

      <div className="md:flex ">
        <div className="basis-6/12">
          <div className="flex justify-start">
          <Input
          isClearable
          size="md"
          className=""
          placeholder="Search"
          startContent={<Search size={16}/>}
   
        />
          </div>
        </div>
        <div className="basis-6/12">
          <div className="mb-4 flex justify-between md:justify-end gap-4 my-3 md:my-0">
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
            <Button
              //   onPress={onOpenBulkUpload}
              color="primary"
              endContent={<Upload size={"20"} />}>
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 font-body py-4">
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardBody className="p-5">
              <div className="flex">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
              <div className="flex my-3">
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
                <div className="basis-4/12">
                  <div className="text-xs">Label </div>
                  <div className="text-sm font-semibold">Data</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

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
    </>
  );
}
