package com.example.fsdproject.repository;

import com.example.fsdproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);

    @Query("SELECT u.email FROM User u WHERE u.id = :userId")
    String getEmailByUserId(@Param("userId") Long userId);

}
