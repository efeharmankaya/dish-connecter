import { getAuth } from "firebase/auth";
import "./changeName.css";
import { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { userSelector } from "../../redux/auth/auth.selector";
import { useDispatch, useSelector } from "react-redux";
import { User, login } from "../../redux/auth/auth.reducer";
export const ChangeName = () => {
    const user = useSelector(userSelector);
    const [newDisplayName, setNewDisplayName] = useState("");
    const auth = getAuth()
    const dispatch = useDispatch()
    const handleDisplayNameSubmit = useCallback(() => { 
        if(!newDisplayName.length)return
    fetch("/set-display-name", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            uid: auth.currentUser?.uid,
            displayName: newDisplayName
        }),
    })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("/set-display-name: ", data);
            if (data.success) {
                // data.data has the result
                dispatch(login(data.data as User))
            } else {
                console.error("/set-display-name response error: ", data);
            }
        })
        .catch((err) => console.error(err));}, [newDisplayName]

    )
    return(
        <div>
            <h1>Change Name</h1>
           <div className="name-container"> <h2>Current Name:</h2>
            {user?.displayName}
            <h2>Write New Name Below:</h2>
            
            <TextField size="small" onChange={(e) => setNewDisplayName(e.target.value)}></TextField>
            <Button variant="outlined" className="submit" onClick={() => handleDisplayNameSubmit()}>Submit</Button>
            
            </div>
        </div>
    )
}