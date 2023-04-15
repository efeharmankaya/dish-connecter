import "./account.css";
import { Link } from "react-router-dom";
import BadgeIcon from '@mui/icons-material/Badge';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CookieIcon from '@mui/icons-material/Cookie';
import DeleteIcon from '@mui/icons-material/Delete';

export const Account = () =>{
   return( <div><h1>Account Settings</h1>
<div className="larger-container">
<Link style={{color: "black"}} to="/"><div className="account-container"><BadgeIcon sx={{ fontSize: 80 }} />
               <h2>Change Display Name</h2></div> </Link>

               <Link style={{color: "black"}} to="/"><div className="account-container"><InsertPhotoIcon sx={{ fontSize: 80 }}/>  <h2>Change Photo</h2></div></Link>

               </div>
               <div className="larger-container">
               <Link style={{color: "black"}} to="/"><div className="account-container"><CookieIcon sx={{ fontSize: 80 }}/> <h2>Change Cookie Preferences</h2></div></Link>

               <Link style={{color: "black"}} to="/"><div className="account-container"><DeleteIcon sx={{ fontSize: 80 }}/>  <h2>Delete User Info</h2></div></Link>
               </div>
   </div>
   
   )
}