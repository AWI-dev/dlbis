const useCookie = () => {
  const setCookie = (name:any, value:any) => {
    document.cookie = `${name}=${value};domain=.awi.solutions.com;path=/;`;
  };

  const getCookie = (name: string) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;domain=.awi.solutions.com;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  };

  return { setCookie, getCookie, deleteCookie };
};

export default useCookie;
