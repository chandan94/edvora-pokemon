import { ToastState } from "../../redux/toast/toast.types";
import { User } from "../log-in/log-in.types";

export interface SignUpProps {
    showToast: (payload: ToastState) => void
};

export interface SignUpResponse {
    exists: boolean,
    created_user?: User,
}