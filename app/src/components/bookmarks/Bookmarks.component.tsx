import React from "react";
import {useState} from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { bookmarksSelector, loggedInSelector } from "../../redux/auth/auth.selector";
import { RecipeRow } from "../recipeRow/RecipeRow.component";


function Bookmark(props : String) {

}

export const Bookmarks = () => {
 const loggedIn = useSelector(loggedInSelector)
    const bookmarks = useSelector(bookmarksSelector)

    const [results, setResults] = useState([])

useEffect(() => {
    if(!loggedIn){return}
    fetch('/get-recipes', {
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ids : bookmarks})
})
    .then((resp) => resp.json())
    .then((data) => {
        console.log("/get-recipes: ", data);
        if (data.success) {
            setResults(data.data)
           
        } else {
            console.error("/login response error: ", data);
        }
    })
}, [loggedIn])

   


    return (
        <div className="bookmarks-container">
            <h1>Bookmarks</h1>
            {results.length && <div className= "bookmarkList">
            {results.map((recipe: any, i) => <RecipeRow key = {i}{...recipe}/>)}
            </div> }


        </div>
    );
}

export default Bookmarks;