import { getAuth } from "firebase/auth";
import { Person } from "@mui/icons-material";
import "./changeImage.css"
export const ChangeImage = () => {
    const auth = getAuth()
    return (<div>
        <h1>Change Image</h1>
        <div className="change-photo-container">
            <h2>Current Photo</h2>
            <div className='user-photo-container'>
  {auth.currentUser?.photoURL ? <img src={auth.currentUser.photoURL} alt="Sometheing went wrong"/> : <Person/>}
</div>
<h2>Upload New Photo Below:</h2>
<form>
<input type="file" accept="image/*"></input>
<input type="submit" value="Submit"></input></form>
        </div>
    </div>)
}