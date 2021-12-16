import { toastActionTypes, ToastState } from "./toast.types"

export const setToastComp = (payload: ToastState) => ({
    type: toastActionTypes.TOGGLE_SHOW_TOAST,
    payload,
});