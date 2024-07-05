import API_BASE_URL from '../global/apiConfig';
import SHARED_KEY from '../global/sharedKey';
import useCookie from './useCookie';
import useEncryption from './useEncryption';

type RequestData = Record<string, any>;
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestHeaders = Record<string, string>;

const { getCookie } = useCookie();
const { decryptData } = useEncryption(SHARED_KEY);
// const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
// let csrf_token: string | null = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : null;
const csrfToken = (window as any).Laravel.csrfToken;
console.log(csrfToken);

async function fetchApi(
  api: string | null,
  urlPath: string,
  requestData: RequestData,
  method: RequestMethod,
  headers: RequestHeaders = { 'Content-Type': 'application/json' },
): Promise<any> {
  const cookieValue = getCookie('rrf');
  let accessToken: string | null = null;
  
  if (cookieValue) {
    accessToken = decryptData(cookieValue);
  }
  
  const requestOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      'Authorization': accessToken ? `Bearer ${accessToken}` : '',
      'X-CSRF-TOKEN': csrfToken || '',
    },
    body: method === 'POST' || method === 'PUT' ? JSON.stringify(requestData) : undefined,
  };
  
  try {
    let endpoint = API_BASE_URL + urlPath;
    if (api) {
      endpoint = api + urlPath;
    }
    
    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err: any) {
    console.error('Error caught:', err.message);
    err.code = 'Failed';
    throw err;
  }
}

export default fetchApi;
