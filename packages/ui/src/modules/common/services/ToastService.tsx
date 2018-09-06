import { toast, ToastType } from 'react-toastify';

export class ToastService {
  public static toastSuccess = (message: string) => toast(message, {
    type: 'success' as ToastType,
  })
  public static toastError = (message: string) => toast(message, {
    type: 'error' as ToastType,
  })
}
