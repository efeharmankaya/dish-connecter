import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { useCallback, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { login, User } from "../../redux/auth/auth.reducer";
import { clearBookmarks } from "../../redux/bookmarks/bookmarks.reducer";
import { recipeBookmarkedSelectorFactory } from "../../redux/bookmarks/bookmarks.selectors";

export type BookmarkButtonProps = {
    id: string;
};
export const BookmarkButton = ({ id }: BookmarkButtonProps) => {
    const { currentUser } = getAuth();
    const initialSelected = useSelector(recipeBookmarkedSelectorFactory(id));
    const [selected, setSelected] = useState<boolean>(!!initialSelected);
    const dispatch = useDispatch();
    const handleSelect = useCallback(() => {
        fetch("/toggle-bookmark", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                uid: currentUser?.uid,
                id,
                add: !selected,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("/toggle-bookmark: ", data);
                if (data.success) {
                    const { user } = data.data;
                    setSelected(!selected);
                    batch(() => {
                        dispatch(login(user as User));
                        dispatch(clearBookmarks());
                    });
                } else {
                    console.error("/toggle-bookmark response error: ", data);
                }
            })
            .catch((err) => console.error(err));
    }, [currentUser?.uid, dispatch, id, selected]);

    return (
        <div className="bookmark-button" onClick={() => handleSelect()}>
            {selected ? <Bookmark /> : <BookmarkBorder />}
        </div>
    );
};
