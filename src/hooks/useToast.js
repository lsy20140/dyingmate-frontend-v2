import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToast = (type, message) => {
  const config = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  switch(type) {
    case 'success':
      return toast.success(message, config);
    case 'warning':
      return toast.warning(message, config);
    case 'error':
      return toast.error(message, config)
    default:
      return toast(message, config)
  }
}
