import { createSlice } from "@reduxjs/toolkit";
import { setBookmarksAction, clearBookmarksAction, setExpiryAction } from "./bookmarks.actions";

export interface BookmarksState {
    userBookmarks: [];
    expiry?: string;
}

export const initialBookmarksState: BookmarksState = {
    userBookmarks: [],
};

export const bookmarksSlice = createSlice({
    name: "Bookmarks",
    initialState: initialBookmarksState,
    reducers: {
        setBookmarks: setBookmarksAction,
        clearBookmarks: clearBookmarksAction,
        setExpiry: setExpiryAction
    }
});

export const { clearBookmarks, setBookmarks, setExpiry } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
