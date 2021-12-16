import { ToastState } from "../../redux/toast/toast.types";

export interface ToastProps {
    show?: boolean,
    msg?: string,
    headerMsg?: string,
    variant?: string,
    showToast?: (payload: ToastState) => void,
};