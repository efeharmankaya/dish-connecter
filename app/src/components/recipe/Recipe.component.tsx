import { useNavigate, useParams } from "react-router-dom";

export const Recipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) navigate("/");

    return <h1>Recipe ({id})</h1>;
};
