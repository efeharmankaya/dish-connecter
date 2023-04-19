import { createSlice } from "@reduxjs/toolkit";
import { setSearchResultsAction, clearSearchResultsAction, setSearchQueryAction } from "./search.actions";

export type SearchState = {
    results: [];
    query: string;
}

export const initialSearchState: SearchState = {
    results: [],
    query: ""
};

export const searchSlice = createSlice({
    name: "Search",
    initialState: initialSearchState,
    reducers: {
        setSearchResults: setSearchResultsAction,
        clearSearchResults: clearSearchResultsAction,
        setSearchQuery: setSearchQueryAction,
    }
});

export const { clearSearchResults, setSearchResults, setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
