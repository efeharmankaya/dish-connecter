import { Person } from "@mui/icons-material";
import { Icon } from "@mui/material";

export const Settings = () => {
    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <Icon>
                <Person />
            </Icon>

            <img
                src="/person symbol.png"
                alt="Failed to load person symbol"
            ></img>
            <img
                src="QuestionMark.png"
                alt="Failed to load Question Mark"
            ></img>
        </div>
    );
};
