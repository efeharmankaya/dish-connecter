import { useCallback } from "react";
import {
    AuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../auth/auth.hooks";

export const TopNav = () => {
    const auth = getAuth();
    const { handleSignOut } = useAuth();
    const loginWithOAuth = useCallback(
        (provider: AuthProvider) =>
            signInWithPopup(auth, provider)
                .then(() => {
                    console.log("sign in .then() login");
                })
                .catch((error) => console.error(error)),
        [auth]
    );

    return (
        <div className="top-nav-container">
            {auth.currentUser ? (
                <button onClick={() => handleSignOut()}>Sign Out</button>
            ) : (
                <button
                    onClick={() => loginWithOAuth(new GoogleAuthProvider())}
                >
                    Login
                </button>
            )}
        </div>
    );
};
