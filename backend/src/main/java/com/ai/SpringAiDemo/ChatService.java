package com.ai.SpringAiDemo;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final AiService aiService;

    public ChatService(AiService aiService) {
        this.aiService = aiService;
    }

    public String getResponse(String prompt) {


        // Call the chat model with the provided prompt
        return aiService.getResponse(prompt);
    }

    public String getResponseOptions(String prompt) {
//        var chatModel = aiService.getChatModel();
//
//        // Call the chat model with the provided prompt
//        ChatResponse response = chatModel.call(new Prompt(prompt));
//        return response.getResult().getOutput().getContent();
        return aiService.getResponse(prompt);

    }
}
