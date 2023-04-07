import { getAuth } from "firebase/auth";
import { useCallback } from "react";
import { batch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signOut, User } from "../../redux/auth/auth.reducer";

export const useAuth = () => {
    const dispatch = useDispatch()
    const auth = getAuth()
    const navigate = useNavigate()

    const handleLogin = useCallback(() => {
        const { currentUser } = auth;
        if (!currentUser) return;

        const {
            uid,
            displayName,
            email,
            photoURL,
            metadata: { creationTime, lastSignInTime },
        } = currentUser;

        const payload = {
            uid,
            displayName,
            email,
            photoURL,
            creationTime,
            lastSignInTime,
        }

        fetch('/login', {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(payload)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("/login: ", data);
                if (data.success) {
                    const { user } = data.data;
                    dispatch(login(user as User));
                } else {
                    console.error("/login response error: ", data);
                }
            });
    }, [auth, dispatch]);

    const handleSignOut = useCallback(() => {
        batch(() => {
            navigate('/')
            dispatch(signOut());
        });
    }, [dispatch, navigate]);

    return { handleLogin, handleSignOut }
}