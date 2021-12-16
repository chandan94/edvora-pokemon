import {  userActions, UserState } from "./user.types"

const INITIAL_STATE : UserState = {
    currentUser : '',
}

const userReducer = (state : UserState = INITIAL_STATE, action : any) : UserState => {
    switch(action.type) {
        case userActions.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        default:
            return state;
    }
}

export default userReducer;