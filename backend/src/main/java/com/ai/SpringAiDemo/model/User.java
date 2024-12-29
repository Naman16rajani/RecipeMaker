package com.ai.SpringAiDemo.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
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
    @Indexed(unique = true) // Enforce unique constraint on username
    private String username;

    @NonNull
    @Indexed(unique = true) // Enforce unique constraint on email
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NonNull
    @Indexed(unique = true) // Enforce unique constraint on mobile
    private String mobile;

    private String role = "NOT_VERIFY";
}
