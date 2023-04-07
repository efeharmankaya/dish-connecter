import { PayloadAction } from "@reduxjs/toolkit"
import { AuthState, initialAuthState, User } from "./auth.reducer"
import { getAuth } from '@firebase/auth'

export const loginAction = (state: AuthState, action: PayloadAction<User>): AuthState => {
    const { currentUser } = getAuth();
    if (!currentUser) return initialAuthState;
    if (action.payload.uid !== currentUser.uid)
        throw new Error("UID MISMATCH")

    const user = action.payload
    sessionStorage.setItem('user', currentUser.uid)
    return {
        ...state,
        user,
        loggedIn: !!currentUser,
    };
}

export const signOutAction = (state: AuthState): AuthState => {
    const auth = getAuth();
    auth.signOut();
    return initialAuthState;
}

export const updateUserAction = (state: AuthState, action: PayloadAction<User>): AuthState => {
    return { ...state, user: action.payload }
}