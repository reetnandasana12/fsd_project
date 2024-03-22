package com.example.fsdproject.service;

import com.example.fsdproject.entity.Admin;
import com.example.fsdproject.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public boolean authenticate(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && admin.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
