import { useNavigate, useParams } from "react-router-dom";
import { loggedInSelector } from "../../redux/auth/auth.selector";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import "./recipe.css";

export const useRecipeCache = () => {
    const sessionRecipes = sessionStorage.getItem("cache_recipes");
    const [cache_recipes, set_cache_recipes] = useState(
        !!sessionRecipes ? JSON.parse(sessionRecipes) : {}
    );

    const isRecipeCached = useCallback(
        (id: string) => cache_recipes.hasOwnProperty(id),
        [cache_recipes]
    );
    const cacheRecipe = (id: string, recipe: any) => {
        const currentRecipes = sessionStorage.getItem("cache_recipes");
        const newCache = !!currentRecipes ? JSON.parse(currentRecipes) : {};
        newCache[id] = recipe;
        sessionStorage.setItem("cache_recipes", JSON.stringify(newCache));
    };

    return { cache_recipes, isRecipeCached, cacheRecipe };
};

export const Recipe = () => {
    const loggedIn = useSelector(loggedInSelector);
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    const { cache_recipes, isRecipeCached, cacheRecipe } = useRecipeCache();
    var flag = false;
    useEffect(() => {
        if (!loggedIn || recipe) return;
        if (!id) return navigate("/");

        if (isRecipeCached(id)) {
            // show recipe from cache
            console.log("found recipe in cache: ", cache_recipes[id]);
            setRecipe(cache_recipes[id]);
            setLoading(false);
            return;
        }

        setLoading(true);
        if (flag) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        flag = true;
        fetch(`/recipe/${id}`, {
            method: "GET",
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("/recipe: ", data);
                if (data.success) {
                    setRecipe(data.data);
                    cacheRecipe(id, data.data);
                } else {
                    console.error("/recipe response error: ", data);
                }
                setLoading(false);
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cacheRecipe,
        cache_recipes,
        id,
        isRecipeCached,
        loading,
        loggedIn,
        recipe,
    ]);

    if (!id) navigate("/");
    return (
        <>
            {loading && <h4 className="loading">Loading...</h4>}
            {!loading && recipe && (
                <div className="recipe-container">
                    <div className="recipe-container1">
                        <h1>Recipe</h1>
                        <h3>{recipe.label}</h3>
                        <img src={recipe.images.SMALL.url} />
                        <h2>Ingredients</h2>
                        <h3>{recipe.ingredientLines}</h3>
                    </div>

                    <div className="recipe-container2">
                        <h2>Nutrition Facts</h2>
                        <h4>Calories: {recipe.calories}</h4>
                        <h4>Fat: {recipe.totalNutrients.FAT.quantity}g</h4>
                        <h4>
                            Cholesterol: {recipe.totalNutrients.CHOLE.quantity}
                            mg
                        </h4>
                        <h4>Sodium: {recipe.totalNutrients.NA.quantity}mg</h4>
                        <h4>
                            Carbohydrate:{" "}
                            {recipe.totalNutrients.CHOCDF.quantity}g
                        </h4>
                        <h4>Sugar: {recipe.totalNutrients.SUGAR.quantity}g</h4>
                        <h4>Iron: {recipe.totalNutrients.FE.quantity}mg</h4>
                        <h4>
                            Vitamin C: {recipe.totalNutrients.VITC.quantity}mg
                        </h4>

                        <h2>Source: {recipe.url}</h2>
                    </div>
                </div>
            )}
            {!loading && !recipe && (
                <div>
                    <h4>Failed to load recipe.</h4>
                </div>
            )}
        </>
    );
};
