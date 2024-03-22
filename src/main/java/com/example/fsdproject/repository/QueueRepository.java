package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Queue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QueueRepository extends JpaRepository<Queue,Long> {

    Queue findByQueueName(String queueName);

    Queue findByQueueService(String queueService);

    @Query("SELECT q FROM Queue q WHERE q.QueueId IN (SELECT qwu.queue.QueueId FROM QueueWithUsers qwu WHERE qwu.user.id = :userId)")
    List<Queue> findQueuesByUserId(@Param("userId") Long userId);

    @Query("SELECT e.queueName FROM Queue e WHERE e.QueueId = :queueId")
    String getQueueNameByQueueId(@Param("queueId") Long queueId);

    @Modifying
    @Query("DELETE FROM Queue q WHERE q.QueueId = :queueId AND NOT EXISTS (SELECT 1 FROM QueueWithUsers qwu WHERE qwu.queue = q)")
    void removeQueueByQueueId(@Param("queueId") Long queueId);
}
