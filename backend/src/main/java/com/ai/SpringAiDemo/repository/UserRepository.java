package com.ai.SpringAiDemo.repository;
import com.ai.SpringAiDemo.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByEmail(String email);

    User findByUsername(String username);
    User findByMobile(String mobile); // New method

}

