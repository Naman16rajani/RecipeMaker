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

@RestController("/api")
public class GenAIController {

    private final ChatService chatService;
    private final RecipeService recipeService;

    public GenAIController(ChatService chatService,  RecipeService recipeService) {
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

        if (image != null && !image.isEmpty()) {
            try {
                String mimeType = inferMimeType(image);
                byte[] imageBytes = Base64.getDecoder().decode(image); // Decode Base64 to byte array
                return chatService.getResponseFromImage(prompt, imageBytes, mimeType);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid image encoding", e);
            }
        }
        return chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt) {
        return chatService.getResponseOptions(prompt);
    }


    @GetMapping("generate-image")
    public List<String> generateImages(HttpServletResponse response,
                                       @RequestParam String prompt,
                                       @RequestParam(defaultValue = "hd") String quality,
                                       @RequestParam(defaultValue = "1") int n,
                                       @RequestParam(defaultValue = "1024") int width,
                                       @RequestParam(defaultValue = "1024") int height) throws IOException {
//        ImageResponse imageResponse = imageService.generateImage(prompt, quality, n, width, height);
//
//        // Streams to get urls from ImageResponse
//        List<String> imageUrls = imageResponse.getResults().stream()
//                .map(result -> result.getOutput().getUrl())
//                .toList();
        List<String> imageUrls = new ArrayList<>();
        imageUrls.add("https://example.com/image1.jpg");
        imageUrls.add("https://example.com/image2.jpg");
        imageUrls.add("https://example.com/image3.jpg");
        return imageUrls;
    }


    @GetMapping("recipe-creator")
    public String recipeCreator(@RequestParam String ingredients,
                                @RequestParam(defaultValue = "any") String cuisine,
                                @RequestParam(defaultValue = "") String dietaryRestriction) {
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
