package com.ai.SpringAiDemo;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;



import java.io.IOException;

@Service
public class AiService {
    private final GenerativeModel myModel;

    public AiService(@Value("${openai.api.token}") String token) throws IOException {
        // Configure OpenAI API
        String projectId = "dulcet-record-435807-u4";
        String location = "us-central1";
        String modelName = "gemini-2.0-flash-exp";

        try (VertexAI vertexAI = new VertexAI(projectId, location)) {
            this.myModel = new GenerativeModel(modelName, vertexAI);
        }
    }

    /**
     * Returns the configured Gemini instance.
     *
     * @return String
     */
    public String getResponse(String textPrompt) {
        try{
            GenerateContentResponse response = myModel.generateContent(textPrompt);
        return ResponseHandler.getText(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
//@Service
//public class AiService {
//    private final OpenAiChatModel openAiChatModel;
//
//    public AiService(@Value("${openai.api.token}") String token) {
//        // Configure OpenAI API
//        OpenAiApi openAiApi = new OpenAiApi("https://api.groq.com/openai", token);
//
//        // Define chat model options
//        OpenAiChatOptions openAiChatOptions = OpenAiChatOptions.builder()
//                .withModel("llama3-70b-8192")
//                .withTemperature(0.4f)
//                .withMaxTokens(200)
//                .build();
//
//        // Create and configure the OpenAiChatModel
//        this.openAiChatModel = new OpenAiChatModel(openAiApi, openAiChatOptions);
//    }
//
//    /**
//     * Returns the configured OpenAiChatModel instance.
//     *
//     * @return OpenAiChatModel
//     */
//public String getResponse(String textPrompt) {
//        GenerateContentResponse response = openAiChatModel.call(new Prompt(textPrompt));
//        return ResponseHandler.getText(response);
//    }
//    public OpenAiChatModel getChatModel() {
//        return this.openAiChatModel;
//    }
//}
