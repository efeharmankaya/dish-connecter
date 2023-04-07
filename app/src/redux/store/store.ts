import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../auth/auth.reducer';

const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch;
export default store;