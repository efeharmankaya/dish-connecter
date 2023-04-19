import { RootState } from "./store";

export const authSelector = (state: RootState) => state.auth
export const bookmarksSelector = (state: RootState) => state.bookmarks