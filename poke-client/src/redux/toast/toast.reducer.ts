import { toastActionTypes, ToastState } from "./toast.types";

const INITIAL_STATE : ToastState = {
    show: false,
    header: "",
    msg: "",
    variant: "",
};

const toastReducer = (state : ToastState = INITIAL_STATE, action: any) : ToastState => {


    switch(action.type) {
        case toastActionTypes.TOGGLE_SHOW_TOAST:
            const {show, msg, header, variant} = action.payload;
            return {
                ...state,
                show: show? show : false,
                header: header ? header : "",
                msg: msg? msg: "",
                variant: variant? variant: "",
            };
        default: return state;
    }
};

export default toastReducer;