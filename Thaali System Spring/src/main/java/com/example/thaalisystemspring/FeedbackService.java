package com.example.thaalisystemspring;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findByStatus(1);
    }

    public Feedback addFeedback(Feedback feedback) {

        return feedbackRepository.save(feedback);
    }

    public Feedback updateFeedback(String id, Feedback updatedFeedback) {
        updatedFeedback.set_id(id); // Make sure the updatedFeedback has the correct ID
        return feedbackRepository.save(updatedFeedback);
    }

    public Feedback deleteFeedback(String id) {
        Feedback feedback = feedbackRepository.findById(id).orElse(null);
        if (feedback != null) {
            // Update the status to 0
            feedback.setStatus(0);
            // Save the updated feedback
            return feedbackRepository.save(feedback);
        } else {
            // Handle the case where feedback with the given ID is not found
            return null; // Or throw an exception
        }
    }
}
