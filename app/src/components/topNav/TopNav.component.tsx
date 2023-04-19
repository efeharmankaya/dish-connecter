import { useCallback } from "react";
import {
    AuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../auth/auth.hooks";
import { Typography } from "@mui/material";

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
            <a className="navbar-brand" href="/">
                <h2 id="navbar_title">Dish Connecter</h2>
            </a>

            {auth.currentUser ? (
                <button
                    className="oauth-button"
                    onClick={() => handleSignOut()}
                >
                    Sign Out
                </button>
            ) : (
                <button
                    className="oauth-button"
                    onClick={() => loginWithOAuth(new GoogleAuthProvider())}
                >
                    <GoogleIcon />
                    <Typography className="google oauth-text">
                        Continue with Google
                    </Typography>
                </button>
            )}
        </div>
    );
};

export const GoogleIcon = () => (
    <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M22.501 12.7332C22.501 11.8699 22.4296 11.2399 22.2748 10.5865H12.2153V14.4832H18.12C18.001 15.4515 17.3582 16.9099 15.9296 17.8898L15.9096 18.0203L19.0902 20.435L19.3106 20.4565C21.3343 18.6249 22.501 15.9298 22.501 12.7332Z"
            fill="#4285F4"
        />
        <path
            d="M12.214 23.0001C15.1068 23.0001 17.5353 22.0667 19.3092 20.4567L15.9282 17.89C15.0235 18.5083 13.8092 18.94 12.214 18.94C9.38069 18.94 6.97596 17.1083 6.11874 14.5767L5.99309 14.5871L2.68583 17.0955L2.64258 17.2133C4.40446 20.6433 8.0235 23.0001 12.214 23.0001Z"
            fill="#34A853"
        />
        <path
            d="M6.12046 14.5767C5.89428 13.9234 5.76337 13.2233 5.76337 12.5C5.76337 11.7767 5.89428 11.0767 6.10856 10.4234L6.10257 10.2842L2.75386 7.7356L2.64429 7.78667C1.91814 9.21002 1.50146 10.8084 1.50146 12.5C1.50146 14.1917 1.91814 15.79 2.64429 17.2133L6.12046 14.5767Z"
            fill="#FBBC05"
        />
        <path
            d="M12.2141 6.05997C14.2259 6.05997 15.583 6.91163 16.3569 7.62335L19.3807 4.73C17.5236 3.03834 15.1069 2 12.2141 2C8.02353 2 4.40447 4.35665 2.64258 7.78662L6.10686 10.4233C6.97598 7.89166 9.38073 6.05997 12.2141 6.05997Z"
            fill="#EB4335"
        />
    </svg>
);

