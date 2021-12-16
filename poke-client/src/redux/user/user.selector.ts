import { createSelector } from 'reselect';
import { UserState } from './user.types';

const selectUser = (state: any)  => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user : UserState) => user.currentUser,
);

