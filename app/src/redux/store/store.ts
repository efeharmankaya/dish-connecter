import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../auth/auth.reducer';
import BookmarksReducer from '../bookmarks/bookmarks.reducer';
import SearchReducer from '../search/search.reducer';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        bookmarks: BookmarksReducer,
        search: SearchReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch;
export default store;