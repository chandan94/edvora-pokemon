import { paginationActions } from "./pagination.types";

export const setActivePageNumber = (page : number) => ({
    type: paginationActions.SET_ACTIVE_PAGE_NO,
    payload: page,
});

export const setTotalPageCount = (count : number) => ({
    type: paginationActions.SET_TOTAL_PAGE_COUNT,
    payload: count,
});