export interface RecipeRequest {
  cuisine?: string;
  dietaryRestriction?: string;
  ingredients?: string;
  image?: string;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cuisine: string;
  dietaryRestrictions: string[];
}