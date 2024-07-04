import API_BASE_URL from '../global/apiConfig';
import SHARED_KEY from '../global/sharedKey';
import useCookie from './useCookie';
import useEncryption from './useEncryption';

type RequestData = Record<string, any>;
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestHeaders = Record<string, string>;

const { getCookie } = useCookie();
const { decryptData } = useEncryption(SHARED_KEY);

async function fetchApi(
  api: string | null,
  urlPath: string,
  requestData: RequestData,
  method: RequestMethod,
  headers: RequestHeaders = { 'Content-Type': 'application/json'}
): Promise<any> {

  const cookieValue = getCookie('dlbis');
  let accessToken:any = null;
  
  if (cookieValue) {
    accessToken = decryptData(cookieValue);
  }
  console.log('accessToken', accessToken);
  const requestOptions: RequestInit = {
    method,
    headers :{
      ...headers,
      'Authorization': `Bearer ${accessToken}`
    },
    body: method === 'POST' ? JSON.stringify(requestData) : undefined,
  };
  try {
    let endpoint = API_BASE_URL + urlPath;
    if(api){
      endpoint = api + urlPath;
    }
    const response = await fetch(endpoint, requestOptions as RequestInit);
    return await response.json();
  } catch (err:any) {
    console.error('Error caught:', err.message);
    err['code'] = 'Failed';
    throw err;
  }
}

export default fetchApi;