import { useSelector } from "react-redux";
import { loggedInSelector } from "../../redux/auth/auth.selector";

export const SideNav = () => {
    const loggedIn = useSelector(loggedInSelector);
    return (
        <div className={`side-nav-container ${!loggedIn ? "hide" : ""}`}></div>
    );
};
