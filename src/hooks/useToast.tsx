import { toast, ToastOptions } from 'react-toastify';

type ToastType = "info" | "warning" | "error" | "success";

const useToast = () => {
  const showToast = (message: string, type: ToastType) => {
    toast[type](message, {
      theme: "colored",
      className: `!bg-${type}`,
    } as ToastOptions);
  };

  return showToast;
};

export default useToast;
