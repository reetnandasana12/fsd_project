package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Admin;
import com.example.fsdproject.entity.QueueWithUsers;
import com.example.fsdproject.security.JwtUtils;
import com.example.fsdproject.service.AdminService;
import com.example.fsdproject.service.QueueService;
import com.example.fsdproject.service.QueueWithUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/admin")
    public ResponseEntity<?> adminLogin(@RequestBody Admin formadmin){
        Boolean admin = adminService.authenticate(formadmin.getUsername(),formadmin.getPassword());
        if(admin)
        {
            String token = JwtUtils.generateAdminToken(formadmin);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        }
        else
        {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @Autowired
    private QueueWithUsersService queueWithUsersService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/abed/admin/queues")
    public ResponseEntity<List<QueueWithUsers>> getQueuesWithAssignedUsers() {
        try{
            List<QueueWithUsers> queuesWithUsers = queueWithUsersService.getQueuesWithAssignedUsers();
            if(queuesWithUsers == null)
                return ResponseEntity.notFound().build();
            else
                return ResponseEntity.ok(queuesWithUsers);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
}

