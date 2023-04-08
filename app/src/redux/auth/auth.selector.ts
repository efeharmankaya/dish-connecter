import { createSelector } from "@reduxjs/toolkit";
import { authSelector } from "../store/root.selector";

export const userSelector = createSelector(
    authSelector,
    (auth) => auth.user
)

export const loggedInSelector = createSelector(
    authSelector,
    (auth) => auth.loggedIn
)


export const bookmarksSelector = createSelector(
    userSelector,
    (user) => user?.bookmarks ?? []
)