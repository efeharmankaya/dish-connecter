import { Routes, Route } from "react-router-dom";
import { Bookmarks } from "../bookmarks/Bookmarks.component";
import { Home } from "../home/Home.component";
import { Recipe } from "../recipe/Recipe.component";
import { RecipeSearch } from "../recipe/RecipeSearch.component";
import { Settings } from "../settings/Settings.component";
import { AboutUs } from "../settings/AboutUs.component";
import { Account } from "../settings/Account.component";

export const Workspace = () => {
    return (
        <div className="workspace-container">
            <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"/recipe"} Component={RecipeSearch} />
                <Route path={"/recipe/:id"} Component={Recipe} />
                <Route path={"/bookmarks"} Component={Bookmarks} />
                <Route path={"/settings"} Component={Settings} />
                <Route path={"/aboutUs"} Component={AboutUs}/>
                <Route path={"/account"} Component={Account}/>
            </Routes>
        </div>
    );
};
