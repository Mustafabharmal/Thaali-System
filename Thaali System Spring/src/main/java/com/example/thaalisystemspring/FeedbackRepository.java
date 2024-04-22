package com.example.thaalisystemspring;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    // Custom query methods can be added here if needed
    List<Feedback> findByStatus(int status);
    List<Feedback> findByCommunityid(String communityId);
    List<Feedback> findByUserid(String userId);
    List<Feedback> findByType(String type);
}
