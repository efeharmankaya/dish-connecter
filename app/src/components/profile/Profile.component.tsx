import "./profile.css"
import { getAuth } from "firebase/auth";
import { Person } from "@mui/icons-material";

export const Profile = () => {
    const auth = getAuth()

    
    return(<div >
<h1>Profile</h1>
<br></br>
<div className="profile-container">
<h2>Details:</h2>
<h3>Name:</h3> {auth.currentUser?.displayName}
<h3>Email:</h3>{auth.currentUser?.email}
<h3>Photo:</h3><div className='user-photo-container'>
  {auth.currentUser?.photoURL ? <img src={auth.currentUser.photoURL} alt="Sometheing went wrong"/> : <Person/>}
</div></div> </div>)
}