import { useCallback } from "react";
import {
    AuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../auth/auth.hooks";
import { useNavigate } from "react-router-dom";

export const TopNav = () => {
    const auth = getAuth();
    const { handleSignOut } = useAuth();
    const navigate = useNavigate();
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
            <button onClick={() => navigate("/")}>Dish Connecter</button>
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
