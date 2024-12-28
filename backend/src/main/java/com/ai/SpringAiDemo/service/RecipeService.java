package com.ai.SpringAiDemo.service;

import org.springframework.stereotype.Service;

import java.util.Base64;


@Service
public class RecipeService {
    private final ChatService chatService;

    private String inferMimeType(String base64Image) {
        if (base64Image.startsWith("/9j/")) {
            return "image/jpeg";
        } else if (base64Image.startsWith("iVBORw0KGgo")) {
            return "image/png";
        } else if (base64Image.startsWith("R0lGOD")) {
            return "image/gif";
        } else {
            throw new IllegalArgumentException("Unsupported image format");
        }
    }

    public RecipeService(ChatService chatService) {
        this.chatService = chatService;
    }

    public String createRecipe(String ingredients, String cuisine, String dietaryRestrictions) {
        String prompt = """
                                You are a recipe creating model.
                
                                I want to create a recipe using the following ingredients: %s.
                                The cuisine type I prefer is %s.
                                Please consider the following dietary restrictions: %s.
                                Please provide me with a detailed recipe including title, list of ingredients, and cooking instructions.
                
                               Do above Instructions if you find it is not regarding the recipe. Return I can't do this please visit gemini.com or chatgpt.com.
                """.formatted(ingredients, cuisine, dietaryRestrictions);

        return chatService.getResponse(prompt);
    }

    public String createRecipeFromImage(String cuisine, String dietaryRestriction, String image) {
        String prompt = """
                You are a recipe creating model.
                
                I want to create a recipe using the following ingredients in given image.
                The cuisine type I prefer is %s.
                Please consider the following dietary restrictions: %s.
                Please provide me with a detailed recipe including title, list of ingredients, and cooking instructions.
                
                If given image does not contains any food items than say please take a image containing your ingredients.
                Do above Instructions if you find it is not regarding the recipe. Return I can't do this please visit gemini.com or chatgpt.com.
                """.formatted(cuisine, dietaryRestriction);

        try {
            String mimeType = inferMimeType(image);
            byte[] imageBytes = Base64.getDecoder().decode(image);
            return chatService.getResponseFromImage(prompt, imageBytes, mimeType);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid image encoding", e);

        }
    }

}
