import "./profile.css"
import { getAuth } from "firebase/auth";
import { Person } from "@mui/icons-material";
import { userSelector } from "../../redux/auth/auth.selector";
import { useSelector } from "react-redux";

export const Profile = () => {
  const auth = getAuth();
  const user = useSelector(userSelector);

  return (
    <div>
      <h1>Profile</h1>
      <br></br>
      <div className="profile-container">
        <h2>Details:</h2>
        <h3>Name:</h3> {user?.displayName}
        <h3>Email:</h3>
        {auth.currentUser?.email}
        <h3>Photo:</h3>
        <div className="user-photo-container">
          {user?.photoURL ? (
            <img src={user?.photoURL} alt="Sometheing went wrong" />
          ) : (
            <Person />
          )}
        </div>
      </div>{" "}
    </div>
  );
};