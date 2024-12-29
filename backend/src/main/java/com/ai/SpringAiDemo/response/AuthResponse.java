package com.ai.SpringAiDemo.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthResponse {
    private String jwt;
    private String message;
    private Boolean status;

 // Custom constructor for message and status
    public AuthResponse(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }
}
