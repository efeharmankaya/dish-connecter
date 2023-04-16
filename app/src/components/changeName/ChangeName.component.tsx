import { getAuth } from "firebase/auth";
import "./changeName.css";
export const ChangeName = () => {
    const auth = getAuth()
    return(
        <div>
            <h1>Change Name</h1>
           <div className="name-container"> <h2>Current Name:</h2>
            {auth.currentUser?.displayName}
            <h2>Write New Name Below:</h2>
            <form>
            <input type="text" className="newName" id="newName"></input>
            <input type="submit" value="Submit"></input>
            </form>
            </div>
        </div>
    )
}