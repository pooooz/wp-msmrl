import { toast } from 'react-toastify';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';

export const showToast = (status: string, message: string) => {
  if (status === ResponseStatusEnum.OK) {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (status === ResponseStatusEnum.ERROR) {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }
};
