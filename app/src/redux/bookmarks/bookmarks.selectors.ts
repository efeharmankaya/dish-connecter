import { createSelector } from "@reduxjs/toolkit";
import { userSelector } from "../auth/auth.selector";
import { bookmarksSelector } from "../store/root.selector";

export const userBookmarksSelector = createSelector(
    bookmarksSelector,
    (bookmarks) => bookmarks.userBookmarks ?? []
)

export const recipeBookmarkedSelectorFactory = (id: string) => {
    return createSelector(
        userSelector,
        (user) => user?.bookmarks.find((bookmark) => bookmark === id)
    )
}