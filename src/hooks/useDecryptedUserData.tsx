import useEncryption from './useEncryption';
import useCookie from './useCookie';
import SHARED_KEY from '../global/sharedKey';

const useDecryptedUserData = () => {
  const { getCookie } = useCookie();
  const { decryptData } = useEncryption(SHARED_KEY);
  
  const userData = (type: string) => {
    const encryptedUserData = getCookie("user_details");
    if (encryptedUserData) {
      return JSON?.parse(decryptData(encryptedUserData))?.user_details?.[type];
    }
  };

  return userData;
};

export default useDecryptedUserData;
