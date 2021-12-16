export const  paginationActions = {
    SET_ACTIVE_PAGE_NO: 'SET_ACTIVE_PAGE_NO',
    SET_TOTAL_PAGE_COUNT: 'SET_TOTAL_PAGE_COUNT',
}

export interface PaginationState {
    count : number,
    activePage : number,
}