import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Button,
  Divider,
  Input,
  Spinner,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import useApiFetch from "../../../hooks/useApiRequest";
import API_BASE_URL from "../../../global/apiConfig";
import { mutate } from "swr";
import useFieldValidator from "../../../hooks/useFieldValidator";

const CreateModal = ({
  isOpen,
  onOpenChange,
  operationType,
  formData,
  setFormData,
}) => {
  const { validateField, errors } = useFieldValidator();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isCategoryNameValid = validateField("name", formData.name);
    if (!isCategoryNameValid) return;
    setIsLoading(true);
    const endpoint =
      operationType === "update"
        ? `item/category/update/${formData.id}`
        : "item/category/create";

    useApiFetch("", endpoint, formData, "POST").then((res) => {
      setIsLoading(false);
      toast.success(res?.success?.message, {
        theme: "colored",
        className: "!bg-success",
      });
      mutate(`${API_BASE_URL}item/category/all`);
      onOpenChange(false);
    });
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
      }}
    >
      <ModalContent className="p-5">
        <ModalHeader className="flex gap-1 font-body">
          {`${operationType[0].toUpperCase()}${operationType.slice(
            1
          )} Category`}
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
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  className="font-body"
                  isRequired
                  autoFocus
                  isInvalid={!!errors?.name}
                  value={formData?.name}
                  errorMessage={errors?.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  label="Category Name"
                />
              </div>
              <div className="pt-0 flex justify-end">
                <Button
                  isLoading={isLoading}
                  type="submit"
                  variant="solid"
                  className="bg-cta hover:opacity-80 text-white font-body"
                >
                  Save
                </Button>
              </div>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
