package com.example.fsdproject.service;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username)
    {
        return userRepository.findByUsername(username);
    }
    public User findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }


    public String getEmailByUserId(Long userId){
        return userRepository.getEmailByUserId(userId);
    }

    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
