import { userActions, UserState } from "./user.types";

export const setCurrentUser = (user: UserState) => ({
    type: userActions.SET_CURRENT_USER,
    payload: user,
})