import React, {useState} from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function ImageGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');

    const [imageBytes, setImageBytes] = useState('');
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(",")[1]; // Extract Base64 part
                setImageBytes(base64String);
            };
            reader.readAsDataURL(file); // Read as Data URL (Base64 encoded)
        }
    };
    const createRecipe = async () => {
        try {
            const payload = {
                cuisine: cuisine,
                dietaryRestriction: dietaryRestrictions,
                image: imageBytes, // Send Base64-encoded image string
            };

            const response = await fetch("http://localhost:8080/api/recipe-creator-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // Send data in the body
            });

            const data = await response.text();
            console.log(data);
            setRecipe(data);
        } catch (error) {
            console.error("Error generating response: ", error);
        }
    };
    return (
        <div>
            <h2>Create a Recipe</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />

            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Enter cuisine type"
            />

            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Enter dietary restrictions"
            />

            <button onClick={createRecipe}>Create Recipe</button>

            <div className="output">
                <Markdown className="recipe-text">{recipe}</Markdown>
            </div>
        </div>
    );
}

export default ImageGenerator;