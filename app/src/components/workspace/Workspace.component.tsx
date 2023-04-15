import { Routes, Route } from "react-router-dom";
import { Bookmarks } from "../bookmarks/Bookmarks.component";
import { Home } from "../home/Home.component";
import { Recipe } from "../recipe/Recipe.component";
import { RecipeSearch } from "../recipe/RecipeSearch.component";

import { AboutUs } from "../settings/AboutUs.component";
import { Account } from "../settings/Account.component";
import { Profile } from "../profile/Profile.component";

export const Workspace = () => {
    return (
        <div className="workspace-container">
            <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"/recipe"} Component={RecipeSearch} />
                <Route path={"/recipe/:id"} Component={Recipe} />
                <Route path={"/bookmarks"} Component={Bookmarks} />
                <Route path={"/aboutUs"} Component={AboutUs}/>
                <Route path={"/settings"} Component={Account}/>
                <Route path={"/profile"} Component={Profile}/>
            </Routes>
        </div>
    );
};
