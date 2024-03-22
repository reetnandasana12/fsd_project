package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.QueueWithUsers;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.repository.QueueRepository;
import com.example.fsdproject.repository.QueueWithUsersRepository;
import com.example.fsdproject.service.EmailService;
import com.example.fsdproject.service.QueueService;
import com.example.fsdproject.service.QueueWithUsersService;
import com.example.fsdproject.service.UserService;
import io.micrometer.observation.GlobalObservationConvention;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class QueueController {

    private static final Logger logger = LoggerFactory.getLogger(QueueController.class);

    @Autowired
    private QueueService queueService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private QueueWithUsersService queueWithUsersService;
    @Autowired
    private QueueWithUsersRepository queueWithUsersRepository;
    @Autowired
    private QueueRepository queueRepository;

    @PostMapping("/createqueue")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> createQueue(@RequestBody Queue queue){
        try{
            queueService.saveQueue(queue);
            Map<String, String> response = new HashMap<>();
            response.put("data", "Queue Created Successfully");
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during Creating queue");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/queues")
    public ResponseEntity<List<Queue>> getAllQueues() {
        List<Queue> queues = queueService.getAllQueues();
        return ResponseEntity.ok(queues);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/queues/{userId}/participant")
    public ResponseEntity<List<Queue>> getAllQueuesByUser(@PathVariable Long userId) {
        List<Queue> queues = queueService.getAllQueuesByUser(userId);
        return ResponseEntity.ok(queues);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getuser/{userName}")
    public ResponseEntity<User> getUser(@PathVariable String userName){
        logger.info(userName);
        User user = userService.findByUsername(userName);
        logger.info(user.getUsername());

        if(user != null)
        {
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/queues/{queueId}/{userId}/adduser")
    public ResponseEntity<?> addUserToQueue(@PathVariable Long queueId, @PathVariable Long userId) {
        System.out.print(queueId + userId);
        logger.info(queueId + " " + userId + " ");
        try {
            Queue queue = queueService.findQueueById(queueId);
            User user = userService.findUserById(userId);
            if (queue == null || user == null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Queue Or User Not found");
                return ResponseEntity.badRequest().body(response);
            }
            queueService.addUserToQueue(queue, user);
            Map<String, String> response = new HashMap<>();
            response.put("data", "User Added Successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/queues/{queueId}/{userId}/removeUser")
    public ResponseEntity<?> removeUserFromQueue(@PathVariable Long queueId,@PathVariable Long userId)
    {
        try {
            User user = userService.findUserById(userId);
            Queue queue = queueService.findQueueById(queueId);
            Optional<QueueWithUsers> existingAssociation = queueWithUsersRepository.findByQueueAndUser(queue, user);
            if (queue == null || user == null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Queue Or User Not found");
                return ResponseEntity.badRequest().body(response);
            }
            queueService.removeUserFromQueue(queue, user);
            String email = userService.getEmailByUserId(userId);
            String QueueName = queueRepository.getQueueNameByQueueId(queueId);
            String Subject = "Removed From "+QueueName;
            String Text = "You Are removed By Admin for Your Behavior";
            emailService.sendSimpleMessage(email,Subject,Text);
            Map<String, String> response = new HashMap<>();
            response.put("data", "User Removed Successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/queues/{queueId}/{userId}/remove")
    public ResponseEntity<?> exitUserFromQueue(@PathVariable Long queueId,@PathVariable Long userId)
    {
        try {
            User user = userService.findUserById(userId);
            Queue queue = queueService.findQueueById(queueId);
            Optional<QueueWithUsers> existingAssociation = queueWithUsersRepository.findByQueueAndUser(queue, user);
            if (queue == null || user == null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Queue Or User Not found");
                return ResponseEntity.badRequest().body(response);
            }
            queueService.removeUserFromQueue(queue, user);
            Map<String, String> response = new HashMap<>();
            response.put("data", "User Removed Successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/queues/{queueId}/{userId}/doneUserWork")
    public ResponseEntity<?> doneUserWork(@PathVariable Long queueId,@PathVariable Long userId)
    {
        try {
            User user = userService.findUserById(userId);
            Queue queue = queueService.findQueueById(queueId);
            Optional<QueueWithUsers> existingAssociation = queueWithUsersRepository.findByQueueAndUser(queue, user);
            if (queue == null || user == null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Queue Or User Not found");
                return ResponseEntity.badRequest().body(response);
            }
            queueService.removeUserFromQueue(queue, user);
            String email = userService.getEmailByUserId(userId);
            String QueueName = queueRepository.getQueueNameByQueueId(queueId);
            String Subject = "Removed From "+QueueName;
            String Text = "Your Work is done";
            emailService.sendSimpleMessage(email,Subject,Text);
            Map<String, String> response = new HashMap<>();
            response.put("data", "User Removed Successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/queues/{queueId}/removeQueue")
    public ResponseEntity<?> deleteQueue(@PathVariable Long queueId)
    {
        try{
            Queue queue = queueService.findQueueById(queueId);
            Map<String,String> res = new HashMap<>();
            if(queue == null){
                res.put("error","Queue is already deleted");
                return ResponseEntity.badRequest().body(res);
            }
            else{
                queueService.deleteQueue(queueId);
                res.put("data","Queue Deleted Successfully");
                return ResponseEntity.ok(res);
            }
        }
        catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
