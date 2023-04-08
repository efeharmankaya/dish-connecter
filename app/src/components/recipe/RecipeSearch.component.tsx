import { useCallback, useState } from "react";
import { RecipeRow } from "../recipeRow/RecipeRow.component";

export const RecipeSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const handleSubmit = useCallback(() => {
        fetch(`/search/${query}`, {
            method: "GET",
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    setResults(data.data);
                }
            });
    }, [query]);

    return (
        <div className="recipe-search-container">
            <h1>Recipe Search</h1>
            <input onChange={(e) => setQuery(e.target.value)} type={"text"} />
            <button onClick={() => handleSubmit()}>Search</button>
            {!!results.length && (
                <div className="results-container">
                    {results.map((recipe: any, index) => {
                        return <RecipeRow key={index} {...recipe} />;
                    })}
                </div>
            )}
        </div>
    );
};
