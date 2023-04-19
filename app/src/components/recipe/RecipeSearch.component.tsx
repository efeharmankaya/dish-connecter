import { Search } from "@mui/icons-material";
import { Button, Collapse, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import {
    setSearchQuery,
    setSearchResults,
} from "../../redux/search/search.reducer";
import { searchSelector } from "../../redux/store/root.selector";
import { RecipeRow } from "../recipeRow/RecipeRow.component";
import "./recipe-search.css";

export const RecipeSearch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { query: store_query, results } = useSelector(searchSelector);
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);

    const [query, setQuery] = useState<string>(store_query);

    useEffect(() => {
        if (results.length) setOpen(true);
    }, [results]);

    const handleSubmit = useCallback(() => {
        setLoading(true);
        fetch(`/search/${query}`, {
            method: "GET",
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    batch(() => {
                        dispatch(setSearchResults(data.data));
                        dispatch(setSearchQuery(query));
                    });
                }
                setLoading(false);
            })
            .catch((err) => setLoading(false));
    }, [dispatch, query]);

    return (
        <div className="recipe-search-container">
            <h1>Recipe Search</h1>
            <div className="search-container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                        size="small"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type={"text"}
                        InputProps={{
                            endAdornment: (
                                <Button
                                    size="medium"
                                    onClick={() => handleSubmit()}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                    type="submit"
                                >
                                    <Search />
                                </Button>
                            ),
                        }}
                    />
                </form>
                {!!results.length && open && (
                    <Button
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Clear
                    </Button>
                )}
            </div>
            {loading && <h4 className="loading">Loading...</h4>}
            <Collapse
                in={open}
                timeout={{ enter: 2500, exit: 500 }}
                onExited={() => setQuery("")}
            >
                <div className="results-container">
                    {results.map((recipe: any, index) => (
                        <RecipeRow key={index} recipe={recipe} />
                    ))}
                </div>
            </Collapse>
        </div>
    );
};
