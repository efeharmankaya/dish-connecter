import { getAuth } from "firebase/auth";
import { Person } from "@mui/icons-material";
import "./changeImage.css";
import { User, login } from "../../redux/auth/auth.reducer";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { userSelector } from "../../redux/auth/auth.selector";
export const ChangeImage = () => {
  const auth = getAuth();
  const [image, setImage] = useState("");

  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const handleImageSubmit = useCallback(() => {
    if (!image.length) return;
    fetch("/set-photo-url", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        uid: auth.currentUser?.uid,
        photoURL: image,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("/set-photo-url: ", data);
        if (data.success) {
          // data.data has the result
          dispatch(login(data.data as User));
        } else {
          console.error("/set-photo-url response error: ", data);
        }
      })
      .catch((err) => console.error(err));
  }, [image]);

  return (
    <div>
      <h1>Change Image</h1>
      <div className="change-photo-container">
        <h2>Current Photo</h2>
        <div className="user-photo-container">
          {user?.photoURL ? (
            <img src={user?.photoURL} alt="Sometheing went wrong" />
          ) : (
            <Person />
          )}
        </div>
        <h2>Upload New Photo Below:</h2>

        <TextField
          size="small"
          onChange={(e) => setImage(e.target.value)}
        ></TextField>
        <Button
          variant="outlined"
          className="submit"
          onClick={() => handleImageSubmit()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
