import { createSelector } from "reselect";
import RootState from "../store.type";
import { ToastState } from "./toast.types";

export const selectToast = (state: RootState) => state.toast;

export const selectToastShow = createSelector(
    [selectToast],
    (toast: ToastState) => toast.show,
);

export const selectToastHeader = createSelector(
    [selectToast],
    (toast: ToastState) => toast.header,
);

export const selectToastMsg = createSelector(
    [selectToast],
    (toast: ToastState) => toast.msg,
);

export const selectToastVariant = createSelector(
    [selectToast],
    (toast: ToastState) => toast.variant,
);