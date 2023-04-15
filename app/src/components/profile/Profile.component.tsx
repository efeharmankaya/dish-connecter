import "./profile.css"
import { getAuth } from "firebase/auth";
import { Person } from "@mui/icons-material";

export const Profile = () => {
    const auth = getAuth()

    
    

   /* const [user, setUser] = useState()

    useEffect(() => {
        if(!loggedIn){return}
        fetch('/profile', {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ids : thisUser})
    })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("/get-recipes: ", data);
            if (data.success) {
                setUser(data.data)
               
            } else {
                console.error("/login response error: ", data);
            }
        })
    }, [loggedIn, thisUser])
    
    
    <img src={auth.currentUser?.photoURL} alt="You have no photo" ></img>
    
    */
    
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