import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    bookmarksIdSelector,
    loggedInSelector,
} from "../../redux/auth/auth.selector";
import { RecipeRow } from "../recipeRow/RecipeRow.component";

export const useCacheBookmarks = () => {
    const session_bookmarks = sessionStorage.getItem("cached_bookmarks");
    const [cached_bookmarks, set_cached_bookmarks] = useState<any[]>(
        !!session_bookmarks ? JSON.parse(session_bookmarks) : []
    );

    const unpackBookmarks = (updatedBookmarks: any[]): any[] => {
        let bookmarks: any[] = [];
        updatedBookmarks.forEach((bookmark) => {
            const uri = bookmark.uri ?? "";
            const id = (uri.substring(uri.indexOf("_") + 1) as string) ?? uri;
            bookmarks.push({ ...bookmark, id });
        });
        return bookmarks;
    };

    const updateCache = (updatedBookmarks: any[]) => {
        const currentBookmarks = sessionStorage.getItem("cached_bookmarks");
        let newBookmarks: any[] = !!currentBookmarks
            ? JSON.parse(currentBookmarks)
            : [];
        newBookmarks = [...newBookmarks, ...unpackBookmarks(updatedBookmarks)];

        console.log("updated cache: ", newBookmarks);
        set_cached_bookmarks(newBookmarks);
        sessionStorage.setItem(
            "cached_bookmarks",
            JSON.stringify(newBookmarks)
        );
    };

    const syncWithCache = useCallback(
        (ids: string[]) => {
            const bookmarks_found_in_cache = cached_bookmarks?.length
                ? ids.map((id) =>
                      cached_bookmarks.find((bookmark) => bookmark?.id === id)
                  )
                : [];
            const ids_to_pull = ids?.length
                ? ids.filter(
                      (id) =>
                          !bookmarks_found_in_cache?.find(
                              (bookmark) => bookmark?.id === id
                          )
                  )
                : [];

            return {
                // full recipes found in cache
                bookmarks_found_in_cache,
                // list of ids to pull
                ids_to_pull,
            };
        },
        [cached_bookmarks]
    );

    return {
        cached_bookmarks,
        updateCache,
        syncWithCache,
    };
};

export const areArraysEqual = (arr1: any[], arr2: any[]) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const Bookmarks = () => {
    const loggedIn = useSelector(loggedInSelector);
    const bookmarksIds = useSelector(bookmarksIdSelector);
    const [loading, setLoading] = useState<boolean>(false);
    const { updateCache, syncWithCache } = useCacheBookmarks();
    const { bookmarks_found_in_cache, ids_to_pull } =
        syncWithCache(bookmarksIds);

    const dispatch = useDispatch();

    var flag = false;
    useEffect(() => {
        if (loading) return;
        if (!loggedIn || !bookmarksIds?.length) return;

        console.log("bookmarks_found_in_cache: ", bookmarks_found_in_cache);
        console.log("ids_to_pull: ", ids_to_pull);
        if (flag) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        flag = true;

        if (!ids_to_pull?.length) return;

        setLoading(true);
        fetch("/get-recipes", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ ids: ids_to_pull }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("/get-recipes: ", data);
                if (data.success) {
                    updateCache(data.data);
                } else {
                    console.error("/get-recipes response error: ", data);
                }
                setLoading(false);
            });
    }, [
        bookmarksIds,
        bookmarks_found_in_cache,
        dispatch,
        ids_to_pull,
        loading,
        loggedIn,
        syncWithCache,
        updateCache,
    ]);

    return (
        <div className="bookmarks-container">
            <h1>Bookmarks</h1>
            {loading && (
                <div>
                    <h4 className="loading">Loading...</h4>
                </div>
            )}

            {!loading && !!bookmarks_found_in_cache?.length && (
                <div className="bookmarkList">
                    {bookmarks_found_in_cache.map((recipe: any, i) => (
                        <RecipeRow key={i} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
