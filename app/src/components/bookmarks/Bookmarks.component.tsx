import { useEffect, useState } from "react";
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
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!loggedIn || userBookmarks?.length || !bookmarksIds?.length) return;
        setLoading(true);
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
                setLoading(false);
            });
    }, [bookmarksIds]);

    return (
        <div className="bookmarks-container">
            <h1>Bookmarks</h1>
            {loading && (
                <div>
                    <h4 className="loading">Loading...</h4>
                </div>
            )}
            {!loading && !!userBookmarks?.length && (
                <div className="bookmarkList">
                    {userBookmarks.map((recipe: any, i) => (
                        <RecipeRow key={i} {...recipe} />
                    ))}
                </div>
            )}
            {!loading && !userBookmarks?.length && (
                <div>
                    <h4>Failed to load bookmarks.</h4>
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
