import { Person } from "@mui/icons-material";
import HelpIcon from '@mui/icons-material/Help';
import "./settings.css";
import { Link } from "react-router-dom";

export const Settings = () => {
    return (
        <div><h1>Settings</h1>
        <div className="larger-container">
            
            
        <Link style={{color: "black"}} to="/account"><div className="settings-container"><Person sx={{ fontSize: 80 }} />
               <h2>Account Settings</h2></div> </Link>
               <Link style={{color: "black"}} to="/aboutUs"><div className="settings-container"> <HelpIcon sx={{ fontSize: 80, clearfix: "left", float: "left"}}/>
               <h2>About Us</h2>
               </div></Link> 
            
        </div></div>
    );
};
