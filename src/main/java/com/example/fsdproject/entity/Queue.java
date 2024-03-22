package com.example.fsdproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "queue_table")
public class Queue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long QueueId;

    private String queueName;

    private String queueCapacity;

    private String queueService;

    public Long getQueueId() {
        return QueueId;
    }

    public void setQueueId(Long queueId) {
        QueueId = queueId;
    }

    public String getQueueName() {
        return queueName;
    }

    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }

    public String getQueueCapacity() {
        return queueCapacity;
    }

    public void setQueueCapacity(String queueCapacity) {
        this.queueCapacity = queueCapacity;
    }

    public String getQueueService() {
        return queueService;
    }

    public void setQueueService(String queueService) {
        this.queueService = queueService;
    }
}
