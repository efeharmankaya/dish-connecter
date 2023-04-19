import { PayloadAction } from "@reduxjs/toolkit"
import { initialSearchState, SearchState } from "./search.reducer"

export const setSearchResultsAction = (state: SearchState, action: PayloadAction<[]>): SearchState => {
    return { ...state, results: action.payload }
}

export const clearSearchResultsAction = (state: SearchState): SearchState => {
    return initialSearchState
}

export const setSearchQueryAction = (state: SearchState, action: PayloadAction<string>): SearchState => {
    return { ...state, query: action.payload }
}