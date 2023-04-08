import { createSlice } from "@reduxjs/toolkit";
import { loginAction, signOutAction, updateUserAction } from "./auth.actions";

export interface AuthState {
    user?: User;
    loggedIn: boolean;
}
export interface User {
    // auth props
    uid: string;
    displayName?: string;
    email: string | null;
    photoURL?: string;
    creationTime: string;
    lastSignInTime: string;

    // TODO Recipe[] or string[] (storing the ids)
    //* Note: image and link tokens expire 
    recipes: string[];
    bookmarks: string[];
}

// TODO move out
export type Cuisine = 'American' | 'Asian' | 'British' | 'Caribbean' | 'Central Europe' | 'Chinese' | 'Eastern Europe' | 'French' | 'Indian' | 'Italian' | 'Japanese' | 'Kosher' | 'Mediterranean' | 'Mexican' | 'Middle Eastern' | 'Nordic' | 'South American' | 'South East Asian';
export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'teatime'
export interface Recipe {
    name: string;
    cuisineType: Cuisine;
    mealType: Meal;
    description: string;
    ingredients: string[];
    directions: string[];
    photoURL: string
}


export const initialAuthState: AuthState = {
    user: undefined,
    loggedIn: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login: loginAction,
        signOut: signOutAction,
        updateUser: updateUserAction,
    }
});

export const { login, signOut, updateUser } = authSlice.actions;
export default authSlice.reducer;
