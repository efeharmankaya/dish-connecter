import { createSelector } from "@reduxjs/toolkit";
import { bookmarksSelector } from "../store/root.selector";

export const userBookmarksSelector = createSelector(
    bookmarksSelector,
    (bookmarks) => bookmarks.userBookmarks ?? []
)