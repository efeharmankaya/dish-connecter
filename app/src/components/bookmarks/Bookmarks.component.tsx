import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    bookmarksIdSelector,
    loggedInSelector,
} from "../../redux/auth/auth.selector";
import { setBookmarks } from "../../redux/bookmarks/bookmarks.reducer";
import { bookmarksSelector } from "../../redux/store/root.selector";
import { RecipeRow } from "../recipeRow/RecipeRow.component";

export const Bookmarks = () => {
    const loggedIn = useSelector(loggedInSelector);
    const bookmarksIds = useSelector(bookmarksIdSelector);
    const { userBookmarks, expiry } = useSelector(bookmarksSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!loggedIn || userBookmarks?.length || !bookmarksIds?.length) return;
        fetch("/get-recipes", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ ids: bookmarksIds }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("/get-recipes: ", data);
                if (data.success) {
                    dispatch(setBookmarks(data.data));
                } else {
                    console.error("/get-recipes response error: ", data);
                }
            });
    }, [bookmarksIds]);

    return (
        <div className="bookmarks-container">
            <h1>Bookmarks</h1>
            {userBookmarks.length ? (
                <div className="bookmarkList">
                    {userBookmarks.map((recipe: any, i) => (
                        <RecipeRow key={i} {...recipe} />
                    ))}
                </div>
            ) : (
                <div className="loading">
                    <h4>Loading...</h4>
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
