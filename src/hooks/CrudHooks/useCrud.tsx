import { toast } from "react-toastify";
import useApiFetch from "../useApiRequest";

const useCrud = () => {

  //#region Utility
  const showToast = (message: string, type: "success" | "error") => {
    if(type === "success"){
      toast.success(message, {
        theme: "colored",
        className: "!bg-success",
      });
    }else{
      toast.error(message, {
        theme: "colored",
        className: "!bg-danger",
      });
    }
  };
  const handleApiResponse = (response: any,isToast:boolean = true) => {
    if (response.success) {
      if(isToast){
        showToast(response.success.message, "success");
      }
      return response.success.data;
    } else {
      showToast(response.error.message, "error");
    }
  };

  const handleError = (error: any) => {
    showToast(error.message || "An unexpected error occurred", "error");
  };
  //#endregion

  //#region CRUD
  const GET = async (endpoint: string, id: any, externalUrl: string = "") => {
    try {
      const response = await useApiFetch(externalUrl, `${endpoint}/get/${id}`, [], "GET");
      return handleApiResponse(response,false);
    } catch (error: any) {
      handleError(error);
    }
  };

  const POST = async (endpoint: string, formData: any, externalUrl: string = "") => {
    try {
      const response = await useApiFetch(externalUrl, endpoint, formData, "POST");
      return handleApiResponse(response);
    } catch (error: any) {
      handleError(error);
    }
  };

  const DELETE = async (endpoint: string, id: any, externalUrl: string = "") => {
    try {
      const response = await useApiFetch(externalUrl, `${endpoint}/delete/${id}`, [], "DELETE");
      return handleApiResponse(response);
    } catch (error: any) {
      handleError(error);
    }
  };
  //#endregion


  return { GET, POST, DELETE };
};

export default useCrud;
