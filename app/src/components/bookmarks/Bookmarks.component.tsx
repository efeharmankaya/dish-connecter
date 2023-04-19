import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    bookmarksIdSelector,
    loggedInSelector,
} from "../../redux/auth/auth.selector";
import { setBookmarks } from "../../redux/bookmarks/bookmarks.reducer";
import { bookmarksSelector } from "../../redux/store/root.selector";
import { RecipeRow } from "../recipeRow/RecipeRow.component";

export const useCacheBookmarks = () => {
    const session_ids = sessionStorage.getItem("cached_bookmarks_ids");
    const session_bookmarks = sessionStorage.getItem("cached_bookmarks");
    const cached_bookmarks_ids = !!session_ids ? JSON.parse(session_ids) : [];
    const cached_bookmarks = !!session_bookmarks
        ? JSON.parse(session_bookmarks)
        : [];

    const updateCache = (key: string, newValue: any) => {
        sessionStorage.setItem(key, JSON.stringify(newValue));
    };

    return { cached_bookmarks, cached_bookmarks_ids, updateCache };
};

export const areArraysEqual = (arr1: any[], arr2: any[]) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const Bookmarks = () => {
    const loggedIn = useSelector(loggedInSelector);
    const bookmarksIds = useSelector(bookmarksIdSelector);
    const { userBookmarks, expiry } = useSelector(bookmarksSelector);
    const [loading, setLoading] = useState<boolean>(false);

    const { cached_bookmarks, cached_bookmarks_ids, updateCache } =
        useCacheBookmarks();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!loggedIn || userBookmarks?.length || !bookmarksIds?.length) return;

        if (
            areArraysEqual(cached_bookmarks_ids, bookmarksIds) &&
            cached_bookmarks.length
        ) {
            // show cache
            console.log("cached ids match user ids");
            dispatch(setBookmarks(cached_bookmarks));
            setLoading(false);
            return;
        }
        // pull new info + update cache
        console.log("cached ids don't match user ids");

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
                    updateCache("cached_bookmarks_ids", bookmarksIds);
                    updateCache("cached_bookmarks", data.data);
                } else {
                    console.error("/get-recipes response error: ", data);
                }
                setLoading(false);
            });
    }, [
        bookmarksIds,
        cached_bookmarks,
        cached_bookmarks_ids,
        dispatch,
        loggedIn,
        updateCache,
        userBookmarks?.length,
    ]);

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
                        <RecipeRow key={i} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
