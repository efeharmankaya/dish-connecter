import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInSelector } from "../../redux/auth/auth.selector";

export const SideNav = () => {
    const loggedIn = useSelector(loggedInSelector);
    const navigate = useNavigate();
    return (
        <div className={`side-nav-container ${!loggedIn ? "hide" : ""}`}>
            <button onClick={() => navigate("/recipe")}>Find Recipes</button>
            <button onClick={() => navigate("/bookmarks")}>Bookmarks</button>
            <button onClick={() => navigate("/settings")}>Settings</button>
        </div>
    );
};
