package com.ai.SpringAiDemo.service;


import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ChatService {
    private final GenerativeModel myModel;

    public ChatService(Environment environment) {
        String projectId = environment.getProperty("GCPPROJECTID");
        String location = environment.getProperty("GCPPROJECTLOCATION");
        String modelName = environment.getProperty("GCPPROJECTMODEL");

        try (VertexAI vertexAI = new VertexAI(projectId, location)) {
            this.myModel = new GenerativeModel(modelName, vertexAI);
        }
    }

    public String getResponse(String prompt) {
        try {
            GenerateContentResponse response = myModel.generateContent(prompt);
            return ResponseHandler.getText(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String getResponseFromImage(String prompt, byte[] image, String mimeType) {
        try {
            GenerateContentResponse response = myModel.generateContent(
                    ContentMaker.fromMultiModalData(
                            prompt,
                            PartMaker.fromMimeTypeAndData(mimeType, image)
                    ));
            return ResponseHandler.getText(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String getResponseOptions(String prompt) {
        try {
            GenerateContentResponse response = myModel.generateContent(prompt);
            return ResponseHandler.getText(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
