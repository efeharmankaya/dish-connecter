import { Routes, Route } from "react-router-dom";
import { Bookmarks } from "../bookmarks/Bookmarks.component";
import { Home } from "../home/Home.component";
import { Recipe } from "../recipe/Recipe.component";
import { RecipeSearch } from "../recipe/RecipeSearch.component";
import { Settings } from "../settings/Settings.component";

export const Workspace = () => {
    return (
        <div className="workspace-container">
            <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"/recipe"} Component={RecipeSearch} />
                <Route path={"/recipe/:id"} Component={Recipe} />
                <Route path={"/bookmarks"} Component={Bookmarks} />
                <Route path={"/settings"} Component={Settings} />
            </Routes>
        </div>
    );
};
