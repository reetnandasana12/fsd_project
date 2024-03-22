package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.entity.QueueWithUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QueueWithUsersRepository extends JpaRepository<QueueWithUsers, Long> {
    List<QueueWithUsers> findByQueue(Queue queue);
    Long countByQueue(Queue queue);

    @Modifying
    @Query("DELETE FROM QueueWithUsers qwu WHERE qwu.queue = :queue AND qwu.user = :user")
    void deleteByQueueAndUser(@Param("queue") Queue queue, @Param("user") User user);

    Optional<QueueWithUsers> findByQueueAndUser(Queue queue, User user);

    @Query("SELECT t FROM QueueWithUsers t")
    List<QueueWithUsers> getALL();
}
