import { toast } from "react-toastify";
import useApiFetch from "../useApiRequest";
import useCookie from "../../hooks/useCookie";
import useEncryption from "../../hooks/useEncryption";
import SHARED_KEY from "../../global/sharedKey";

const useCrud = () => {
  const { getCookie } = useCookie();
  const { decryptData } = useEncryption(SHARED_KEY);

  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message, {
        theme: "colored",
        className: "!bg-success",
      });
    } else {
      toast.error(message, {
        theme: "colored",
        className: "!bg-danger",
      });
    }
  };

  const handleApiResponse = (response: any, isToast: boolean = true) => {
    if (isToast) {
      if (response.success) {
        showToast(response.success.message, "success");
      } else {
        showToast(response.error.message, "error");
      }
    }
    return response?.success?.data;
  };

  const handleError = (error: any) => {
    showToast(error.message || "An unexpected error occurred", "error");
  };

  const getAuthHeaders = () => {
    const encryptedToken = getCookie("rrf");
    if (!encryptedToken) {
      throw new Error("No authentication token found");
    }
    const token = decryptData(encryptedToken);
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const GET = async (endpoint: string, externalUrl: string = "") => {
    try {
      const headers = getAuthHeaders();
      const response = await useApiFetch(
        externalUrl,
        `${endpoint}`,
        [],
        "GET",
        headers
      );
      return handleApiResponse(response, false);
    } catch (error: any) {
      handleError(error);
    }
  };

  const POST = async (
    endpoint: string,
    formData: any,
    externalUrl: string = "",
    isToast: boolean = true
  ) => {
    try {
      const headers = getAuthHeaders();
      const response = await useApiFetch(
        externalUrl,
        endpoint,
        formData,
        "POST",
        headers
      );
      return handleApiResponse(response, isToast);
    } catch (error: any) {
      handleError(error);
    }
  };

  const DELETE = async (
    endpoint: string,
    id: any,
    externalUrl: string = ""
  ) => {
    try {
      const headers = getAuthHeaders();
      const response = await useApiFetch(
        externalUrl,
        `${endpoint}/delete/${id}`,
        [],
        "DELETE",
        headers
      );
      return handleApiResponse(response);
    } catch (error: any) {
      handleError(error);
    }
  };

  return { GET, POST, DELETE };
};

export default useCrud;
