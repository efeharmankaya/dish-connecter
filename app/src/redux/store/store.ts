import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../auth/auth.reducer';
import bookmarksReducer from '../bookmarks/bookmarks.reducer';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        bookmarks: bookmarksReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch;
export default store;