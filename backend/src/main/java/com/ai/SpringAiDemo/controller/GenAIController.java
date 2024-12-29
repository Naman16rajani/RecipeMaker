package com.ai.SpringAiDemo.controller;

import com.ai.SpringAiDemo.service.ChatService;
import com.ai.SpringAiDemo.service.RecipeService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class GenAIController {

    private final ChatService chatService;
    private final RecipeService recipeService;

    public GenAIController(ChatService chatService, RecipeService recipeService) {
        this.chatService = chatService;
        this.recipeService = recipeService;
    }

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

    @PostMapping("ask-ai")
    public String getResponse(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        String image = request.get("image");
        System.out.println("prompt "+prompt);
        System.out.println("image "+image);

        if (image != null && !image.isEmpty()) {
            try {
                String mimeType = inferMimeType(image);
                byte[] imageBytes = Base64.getDecoder().decode(image); // Decode Base64 to byte array
                String response = chatService.getResponseFromImage(prompt, imageBytes, mimeType);
                System.out.println(response);
                return response;
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid image encoding", e);
            }
        }
        return chatService.getResponse(prompt);
    }

    @PostMapping("recipe-creator")
    public String recipeCreator(@RequestBody Map<String, String> request) {
        // Get values with default if missing
        String cuisine = request.getOrDefault("cuisine", "").trim();
        String dietaryRestriction = request.getOrDefault("dietaryRestriction", "").trim();
        String ingredients = request.getOrDefault("ingredients", "").trim();

        // Set defaults if the values are empty
        if (cuisine.isEmpty()) {
            cuisine = "Indian";
        }
        if (dietaryRestriction.isEmpty()) {
            dietaryRestriction = "veg";
        }
        if (ingredients.isEmpty()) {
            ingredients = "carrot, sugar, ghee";
        }

        // Debugging output
        System.out.println("Cuisine: " + cuisine);
        System.out.println("Dietary Restriction: " + dietaryRestriction);
        System.out.println("Ingredients: " + ingredients);
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestriction);
    }

    @PostMapping("recipe-creator-image")
    public String recipeCreatorFromImage(@RequestBody Map<String, String> request) {
        String cuisine = request.get("cuisine");
        String dietaryRestriction = request.get("dietaryRestriction");
        String image = request.get("image");

        if (image != null && !image.isEmpty()) {
            try {

                return recipeService.createRecipeFromImage(cuisine, dietaryRestriction, image);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid image encoding", e);
            }
        }
        return "Please Upload a image";
    }
}
