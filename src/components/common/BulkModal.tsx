import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Check, FileText, Upload } from "lucide-react";
import { FileUploader } from "react-drag-drop-files";
import { mutate } from "swr";
import API_BASE_URL from "../../global/apiConfig";
import useToast from "../../hooks/useToast";
import Papa from "papaparse";
import useCrud from "../../hooks/CrudHooks/useCrud";


interface BulkModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  file: File | null;
  endpoint: string;
}
const BulkModal: React.FC<BulkModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  file: initialFile,
  endpoint,
}) => {
  const { POST } = useCrud();
  const [file, setFile] = useState(initialFile);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!file) {
      showToast("No file selected", "error");
      setIsLoading(false);
      return;
    }
    try {
      const csvData = await readFileAsync(file);
      const parsedData = parseCSV(csvData);
      const formData = {
        created_by_id: 1,
        bulk_data: JSON.stringify(parsedData),
      };
      POST(`${endpoint}/bulk`, formData).then(() => {
        mutate(`${API_BASE_URL}${endpoint}/all`);
        handleSubmitDone();
      });
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const readFileAsync = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(file);
    });
  };

  const parseCSV = (csvData: string): any[] => {
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    }).data;
    return parsedData;
  };

  function handleSubmitDone() {
    setIsLoading(false);
    // onOpenChange();
    setFile(null);
  }
  const FileUploadLabel = () => (
    <label className="h-auto py-4 w-full rounded-lg border-dashed border border-gray-400 flex justify-center items-center text-center">
      <div>
        <div className="mb-1 flex justify-center items-center">
          <Upload />
        </div>
        <div>Drag & Drop file here</div>
        <div className="my-2 text-center flex items-center justify-center">
          <span className="border-t border-gray-100 flex-grow"></span>
          <span className="px-2 text-xs">Or</span>
          <span className="border-t border-gray-100 flex-grow"></span>
        </div>
        {file ? (
          <Button
            spinnerPlacement="end"
            className="w-64 border mb-1 rounded-md py-0 px-2"
            variant="bordered">
            <div className="text-xs flex justify-between w-full">
              <div className="flex items-center">
                <FileText className="text-cta h-4" />
                <span className="w-40 text-left truncate">{file.name}</span>
              </div>
              <div className="flex items-center">
                <Check className="text-white bg-success p-1 rounded-full" />
              </div>
            </div>
          </Button>
        ) : (
          <div className="flex w-64 items-center justify-between p-1 border border-gray-300 rounded-md cursor-pointer">
            <div className="text-xs">No File Selected</div>
            <Button className="w-20 rounded-md bg-cta text-white" size="sm">
              Browse
            </Button>
          </div>
        )}
      </div>
    </label>
  );

  return (
    <Modal
      aria-label="Modal"
      isOpen={isOpen}
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      onOpenChange={onOpenChange}>
      <ModalContent className="font-body">
        {() => (
          <form onSubmit={handleFormSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {title || "Import Variant"}
            </ModalHeader>
            <ModalBody>
              <FileUploader
                multiple={false}
                handleChange={setFile}
                name="file"
                types={["CSV"]}
                defaultValue={file}>
                <FileUploadLabel />
              </FileUploader>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={() => {
                  setFile(null);
                  onOpenChange(false);
                }}>
                Close
              </Button>
              <Button isLoading={isLoading} color="primary" type="submit">
                Import
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BulkModal;
