import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookmarkButton } from "../bookmarks/BookmarkButton.component";
import "./recipe-row.css";
export type RecipeRowProps = {
    recipe: any;
    bookmarked?: boolean;
};

const unpackRecipe = (recipe: any) => {
    return {
        uri: recipe?.uri,
        label: recipe?.label,
        image: recipe?.image,
        calories: recipe?.calories,
        cuisineTypes: recipe?.cuisineType ?? [],
        dishTypes: recipe?.dishType ?? [],
        mealTypes: recipe?.mealType ?? [],
        digest: recipe?.digest ?? [],
    };
};

export const RecipeRow = ({ recipe, bookmarked = false }: RecipeRowProps) => {
    const {
        uri,
        label,
        image,
        calories,
        cuisineTypes,
        dishTypes,
        mealTypes,
        digest,
    } = unpackRecipe(recipe);

    const navigate = useNavigate();

    const cuisineType = cuisineTypes[0] ?? undefined;
    const dishType = dishTypes[0] ?? undefined;
    const mealType = mealTypes[0] ?? undefined;

    const protein = digest.find((val: any) => val.label === "Protein");
    const carbs = digest.find((val: any) => val.label === "Carbs");
    const fat = digest.find((val: any) => val.label === "Fat");

    if (!uri) return null;

    const id = uri.substring(uri.indexOf("_") + 1) ?? uri;

    return (
        <div className="recipe-row-container">
            <BookmarkButton id={id} />
            <div
                className="recipe-row"
                onClick={() => navigate(`/recipe/${id}`)}
            >
                <div className="recipe-row-content">
                    <div className="label label-container">{label}</div>
                    <div className="chips-container">
                        {!!cuisineType && (
                            <Chip label={cuisineType} variant="filled" />
                        )}
                        {!!dishType && (
                            <Chip label={dishType} variant="filled" />
                        )}
                        {!!mealType && (
                            <Chip label={mealType} variant="filled" />
                        )}
                    </div>
                    <div className="nutrition-container">
                        {calories && (
                            <Chip
                                label={`${(calories as number).toFixed(0)}kcal`}
                                variant="filled"
                            />
                        )}

                        {protein && (
                            <Chip
                                label={`Protein ${(
                                    protein.daily as number
                                ).toFixed(0)}g`}
                                variant="filled"
                            />
                        )}
                        {carbs && (
                            <Chip
                                label={`Carbs ${(carbs.daily as number).toFixed(
                                    0
                                )}g`}
                                variant="filled"
                            />
                        )}
                        {fat && (
                            <Chip
                                label={`Fat ${(fat.daily as number).toFixed(
                                    0
                                )}g`}
                                variant="filled"
                            />
                        )}
                    </div>
                </div>
                <img src={image} alt={label} className="image-container" />
            </div>
        </div>
    );
};
