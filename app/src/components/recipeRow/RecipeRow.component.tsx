import { useNavigate } from "react-router-dom";
import "./recipe-row.css";
// export type RecipeRowProps = {
//     id: string;
//     label: string;
//     image: string;
//     calories: number;
//     cuisineType: string;
//     mealType: string;
// };
export const RecipeRow = (recipe: any) => {
    const {
        uri,
        label,
        image,
        calories,
        cuisineType: cuisineTypes,
        dishType: dishTypes,
    } = recipe;


    const navigate = useNavigate();

    const cuisineType = cuisineTypes[0] ?? undefined;
    const dishType = dishTypes[0] ?? undefined;

    if (!uri) return null;

    const id = uri.substring(uri.indexOf("recipe_")) ?? uri;


    // TODO string formatting INTL
    return (
        <div
            onClick={() => navigate(`/recipe/${id}`)}
            className="recipe-row-container"
        >
            <div className="recipe-row">
                <div className="recipe-row-content">
                    <div className="label-container">{label}</div>

                    {!!cuisineType && (
                        <div className="cuisine-type-container">
                            {cuisineType}
                        </div>
                    )}
                    {!!dishType && (
                        <div className="dish-type-container">{dishType}</div>
                    )}
                    <div className="nutrition-container">
                        Calories: {calories}
                    </div>
                </div>
                <img src={image} alt={label} className="image-container" />
            </div>
        </div>
    );
};
