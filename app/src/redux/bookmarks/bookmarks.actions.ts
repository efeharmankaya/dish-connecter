import { PayloadAction } from "@reduxjs/toolkit"
import { BookmarksState, initialBookmarksState } from "./bookmarks.reducer"

export const setBookmarksAction = (state: BookmarksState, action: PayloadAction<[]>): BookmarksState => {
    return { ...state, userBookmarks: action.payload }
}
export const clearBookmarksAction = (state: BookmarksState): BookmarksState => {
    return initialBookmarksState
}

export const setExpiryAction = (state: BookmarksState, action: PayloadAction<string>): BookmarksState => {
    return { ...state, expiry: action.payload }
}
