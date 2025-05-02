import { ToastContainer, ToastPosition, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const option = {
  position: 'top-center' as ToastPosition,
  autoClose: 3000,
  hideProgressBar: true,
  closeButton: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

export const notify = (type: 'success' | 'error' | 'info', message: string) => {
  const icons = {
    success: '🥳',
    error: '❌',
    info: '⚠️',
  }

  const toastClass = {
    success: 'toast-success',
    error: 'toast-error',
    info: 'toast-info',
  }
  toast(`${icons[type]} ${message}`, {
    ...option,
    className: toastClass[type],
  })
}

export default function Toast() {
  return <ToastContainer {...option} style={{ zIndex: 9999 }} />
}
