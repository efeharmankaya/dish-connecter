import { useNavigate, useParams } from "react-router-dom";
import { bookmarksSelector, loggedInSelector } from "../../redux/auth/auth.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {useState} from "react";
import "./recipe.css";

export const Recipe = () => {
    const loggedIn = useSelector(loggedInSelector)
    const { id } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState < any >([]);
    
    useEffect(() => {
        if(!loggedIn){return}
        fetch(`/recipe/${id}`, {
            method: "GET",
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("/get-recipe: ", data);
            if (data.success) {
                setResults(data.data)
               
            } else {
                console.error("/login response error: ", data);
            }
        })
    }, [loggedIn])

    
    if (!id) navigate("/");


    //return <h1>Recipe ({id})</h1>;
    return (
        <div className="recipe-container">
            <div className="recipe-container1">
                <h1>Recipe</h1>
                <h3>{results.label}</h3>
                <img src={results.images.SMALL.url} />
                <h2>Ingredients</h2>
                <h3>{results.ingredientLines}</h3>
            </div>
            
            <div className="recipe-container2">
                <h2>Nutrition Facts</h2>
                <h4>Calories: {results.calories}</h4>
                <h4>Fat: {results.totalNutrients.FAT.quantity}g</h4>
                <h4>Cholesterol: {results.totalNutrients.CHOLE.quantity}mg</h4>
                <h4>Sodium: {results.totalNutrients.NA.quantity}mg</h4>
                <h4>Carbohydrate: {results.totalNutrients.CHOCDF.quantity}g</h4>
                <h4>Sugar: {results.totalNutrients.SUGAR.quantity}g</h4>
                <h4>Iron: {results.totalNutrients.FE.quantity}mg</h4>
                <h4>Vitamin C: {results.totalNutrients.VITC.quantity}mg</h4>

                <h2>Source: {results.url}</h2>
            </div>
        </div>
    );
};
