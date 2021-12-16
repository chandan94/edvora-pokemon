import { PaginationState, paginationActions } from "./pagination.types";

const INITIAL_STATE : PaginationState = {
    count: 0,
    activePage: 1,
};

const paginatonReducer = (state: PaginationState = INITIAL_STATE, action: any) : PaginationState => {
    switch(action.type) {
        case paginationActions.SET_ACTIVE_PAGE_NO:
            return {
                ...state,
                activePage: action.payload,
            };
        case paginationActions.SET_TOTAL_PAGE_COUNT:
            return {
                ...state,
                count: action.payload
            }
        default: return state;
    }
};

export default paginatonReducer;