import useApiFetch from "../hooks/useApiRequest";
import useCookie from "./useCookie";
import useEncryption from "./useEncryption";
import SHARED_KEY from "../global/sharedKey";

const useLogin = () => {
  const { encryptData } = useEncryption(SHARED_KEY);
  const { setCookie } = useCookie();
  const setLogin = (url: any, data: any) => {
    url.map((endpoint: any) => {
      useApiFetch(endpoint.url, "login", data, "POST").then((res: any) => {
        const encryptedToken = encryptData(res.success.data.token);
        setCookie(endpoint.system, encryptedToken);
      });
    });
    return true;
  };

  return { setLogin };
};

export default useLogin;
