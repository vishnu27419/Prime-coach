import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (a) => {
  toast.success(a, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
export const errorToast = (a) => {
  toast.error(a, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
