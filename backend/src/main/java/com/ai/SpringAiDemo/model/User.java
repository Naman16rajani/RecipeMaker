package com.ai.SpringAiDemo.model;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class User {

    @Id
    private ObjectId id;

    @NonNull
    private String username;

    @NonNull
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)


    private String password;
    private String jwt;
    private String role = "ROLE_CUSTOMER";


}
