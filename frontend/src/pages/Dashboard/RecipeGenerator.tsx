import { useState } from "react";
import { Utensils } from "lucide-react";
import { postRequest } from "../../utils/api";
import type { Recipe, RecipeRequest } from "../../types/recipe";
import Markdown from "react-markdown";

export const RecipeGenerator = () => {
  const [recipe, setRecipe] = useState<string>("");
  const [request, setRequest] = useState<RecipeRequest>({
    ingredients: "",
    cuisine: "",
    dietaryRestriction: "",
  });
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await postRequest<Recipe>(
        "/api/recipe-creator",
        request
      );
      setRecipe(response);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Utensils className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Recipe Generator
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients (comma-separated)
          </label>
          <textarea
            id="ingredients"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={request.ingredients}
            onChange={(e) =>
              setRequest({ ...request, ingredients: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="cuisine"
              className="block text-sm font-medium text-gray-700"
            >
              Cuisine Type (optional)
            </label>
            <input
              id="cuisine"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={request.cuisine}
              onChange={(e) =>
                setRequest({ ...request, cuisine: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="dietary"
              className="block text-sm font-medium text-gray-700"
            >
              Dietary Restrictions (optional)
            </label>
            <input
              id="dietary"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={request.dietaryRestriction}
              onChange={(e) =>
                setRequest({ ...request, dietaryRestriction: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </form>

      {loading && (
        <div className="mt-6 text-center text-blue-600 font-medium">
          Generating recipe, please wait...
        </div>
      )}

      {recipe && !loading && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <Markdown>{recipe}</Markdown>
        </div>
      )}
    </div>
  );
};
