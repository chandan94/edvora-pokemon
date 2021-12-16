import { createSelector } from "reselect";
import { RootState } from "../store.type";
import { PaginationState } from "./pagination.types";

export const selectPage = (state: RootState) => state.page;

export const selectActivePage = createSelector (
    [selectPage],
    (page: PaginationState) => page.activePage,
);

export const selectTotalPage = createSelector (
    [selectPage],
    (page: PaginationState) => page.count,
);