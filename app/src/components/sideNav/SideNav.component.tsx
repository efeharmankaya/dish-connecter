import { useSelector } from "react-redux";
import { loggedInSelector } from "../../redux/auth/auth.selector";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Link } from "react-router-dom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { SettingsApplications } from "@mui/icons-material";
import { Person } from "@mui/icons-material";

export const SideNav = () => {
    const loggedIn = useSelector(loggedInSelector);
    
    return (
      <div className={`side-nav-container ${!loggedIn ? "hide" : ""}`}>
        <Link style={{ color: "black" }} to="/recipe">
          {" "}
          <ManageSearchIcon
            sx={{ fontSize: 60, marginTop: "20px", marginBottom: "5px" }}
          />
        </Link>

        <Link style={{ color: "black" }} to="/recipe">
          {" "}
          <h4>Search Recipes</h4>
        </Link>

        <Link style={{ color: "black" }} to="/profile">
          {" "}
          <Person
            sx={{ fontSize: 60, marginTop: "20px", marginBottom: "5px" }}
          />
        </Link>
        <Link style={{ color: "black" }} to="/profile">
          {" "}
          <h4>Profile</h4>
        </Link>

        <Link style={{ color: "black" }} to="/bookmarks">
          {" "}
          <BookmarksIcon
            sx={{ fontSize: 60, marginTop: "20px", marginBottom: "5px" }}
          />
        </Link>
        <Link style={{ color: "black" }} to="/bookmarks">
          <h4>Bookmarks</h4>
        </Link>

        <Link style={{ color: "black" }} to="/settings">
          {" "}
          <SettingsApplications
            sx={{ fontSize: 60, marginTop: "20px", marginBottom: "5px" }}
          />
        </Link>
        <Link style={{ color: "black" }} to="/settings">
          <h4>Settings</h4>
        </Link>
      </div>
    );
};
