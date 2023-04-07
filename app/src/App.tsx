import { initializeApp } from "firebase/app";
import { TopNav } from "./components/topNav/TopNav.component";
import "./App.css";
import { SideNav } from "./components/sideNav/SideNav.component";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { loggedInSelector } from "./redux/auth/auth.selector";
import { useAuth } from "./components/auth/auth.hooks";

function App() {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    console.log(firebaseConfig);

    initializeApp(firebaseConfig);

    const loggedIn = useSelector(loggedInSelector);
    const auth = getAuth();
    const { handleLogin, handleSignOut } = useAuth();

    var flag = true;
    useEffect(() => {
        if (flag) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            flag = false;
            console.log("render");
            auth.onAuthStateChanged((user) => {
                console.log("user: ", user);
                if (!!user === loggedIn) return; // auth and store is synced
                if (!!user && !loggedIn)
                    // auth signed in / store not signed in
                    handleLogin();
                if (!user && loggedIn)
                    // auth signed out / store signed in
                    handleSignOut();
            });
        }
    }, []);

    return (
        <div className="App">
            <TopNav />
            <SideNav />
            <h1>Dish Connecter</h1>
        </div>
    );
}

export default App;
