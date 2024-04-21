package com.example.thaalisystemspring;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.ClassGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
//import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/")
    public ResponseEntity<List<Feedback>> getAllFeedback(@RequestParam(required = false) String communityid,
                                                         @RequestParam(required = false) boolean isManager,
                                                         @RequestParam(required = false) boolean isAdmin,
                             @RequestParam(required = false) boolean isUser,    @RequestParam(required = false) String userid) {

        try {
            if (isAdmin) {
                System.out.println("isAdmin");
                List<Feedback> feedbackList = feedbackService.getAllFeedback();
                return new ResponseEntity<>(feedbackList, HttpStatus.OK);
            }
            if (isManager) {
                System.out.println("isManager");
//                String communityId = requestHeaders.get("communityid").toString();
                List<Feedback> feedbackList = feedbackService.getAllFeedbackComId(communityid);
                return new ResponseEntity<>(feedbackList, HttpStatus.OK);
            }
            if (isUser) {
                System.out.println("isUser");
//                String userId = requestHeaders.get("userId").toString();
                List<Feedback> feedbackList = feedbackService.getAllFeedbackUserId(userid);
                return new ResponseEntity<>(feedbackList, HttpStatus.OK);
            }
            // Default case: no specific role provided, return all feedback
            List<Feedback> feedbackList = feedbackService.getAllFeedback();
            return new ResponseEntity<>(feedbackList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Map<String, Object> requestBody) {
        Feedback feedback = new Feedback();
        feedback.setUserid((String) requestBody.get("userid"));
        feedback.setCommunityid((String) requestBody.get("communityid"));
        feedback.setType((String) requestBody.get("type"));
        feedback.setTitle((String) requestBody.get("title"));
        feedback.setDescription((String) requestBody.get("description"));
        feedback.setStatus((int) requestBody.get("status"));
        feedback.setDate((String) requestBody.get("date"));
        feedback.setCompleted((String) requestBody.get("completed"));
        feedback.setCreatedat((long) requestBody.get("createdat"));
        feedback.setUpdatedat((long) requestBody.get("updatedat"));

        Feedback addedFeedback = feedbackService.addFeedback(feedback);
        return new ResponseEntity<>(addedFeedback, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable String id, @RequestBody Feedback updatedFeedback) {
        Feedback feedback = feedbackService.updateFeedback(id, updatedFeedback);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<Feedback> deleteFeedback(@PathVariable String id) {
        Feedback feedback = feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
//        return new ResponseEntity<>(HttpStatus.OK);
    }
}
