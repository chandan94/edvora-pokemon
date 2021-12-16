export const toastActionTypes = {
    TOGGLE_SHOW_TOAST: 'TOGGLE_SHOW_TOAST',
};

export interface ToastState {
    show: boolean,
    header?: string,
    msg?: string,
    variant?: string,
}