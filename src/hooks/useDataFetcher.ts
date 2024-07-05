// import useSWR from "swr";
// import API_BASE_URL from "../global/apiConfig";

// const fetcher = async (url: string): Promise<any> => {
//     const response = await fetch(url);
//     const result = await response.json();
//     return result.success.data;
// };

// const useDataFetcher = (endpoint: string, id?: string | number) => {
//     const url = id ? `${API_BASE_URL}${endpoint}/${id}` : `${API_BASE_URL}${endpoint}`;
//     const { data, error } = useSWR(url, fetcher);
//     const isLoading = !data && !error;
//     return { data, isLoading, error };
// };
// export default useDataFetcher;

import useSWR from "swr";
import API_BASE_URL from '../global/apiConfig';
import {  useMemo } from "react";
import useCookie from "./useCookie";
import useEncryption from "./useEncryption";
import SHARED_KEY from "../global/sharedKey";

const useDataFetcher = (endpoint: string, id?: string | number, isPoll: boolean = false) => {
  const { getCookie } = useCookie();
  const { decryptData } = useEncryption(SHARED_KEY);
  const accessToken = useMemo(() => decryptData(getCookie('rrf')), [getCookie, decryptData]);
  const fetcher = async (url: string): Promise<any> => {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const result = await response.json();
    return result.success.data;
  };
  const url = id ? `${API_BASE_URL}${endpoint}/${id}` : `${API_BASE_URL}${endpoint}`;
  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: isPoll ? 30000 : 0,
  });
  return { data, isLoading: !data && !error, error };
};
export default useDataFetcher;
