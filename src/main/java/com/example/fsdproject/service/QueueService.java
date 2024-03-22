package com.example.fsdproject.service;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.entity.QueueWithUsers;
import com.example.fsdproject.repository.QueueRepository;
import com.example.fsdproject.repository.QueueWithUsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QueueService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private QueueWithUsersRepository queueWithUsersRepository;

    @Autowired
    private UserService userService;

    public Queue saveQueue(Queue queue) {
        return queueRepository.save(queue);
    }

    public List<Queue> getAllQueues() {
        return queueRepository.findAll();
    }

    public List<Queue> getAllQueuesByUser(Long userId){
        return queueRepository.findQueuesByUserId(userId);
    }

    public Queue findQueueById(Long id) {
        return queueRepository.findById(id).orElse(null);
    }

    public void addUserToQueue(Queue queue, User user) {
        Optional<QueueWithUsers> existingAssociation = queueWithUsersRepository.findByQueueAndUser(queue, user);
        if (existingAssociation.isPresent()) {
            throw new RuntimeException("You are already in the queue");
        }
        else if (queueWithUsersRepository.countByQueue(queue) < Integer.parseInt(queue.getQueueCapacity())) {
            QueueWithUsers queueWithUsers = new QueueWithUsers(queue, user);

            System.out.print(queueWithUsers);
            queueWithUsersRepository.save(queueWithUsers);
        } else {
            throw new RuntimeException("Queue is full");
        }
    }

    @Transactional
    public void removeUserFromQueue(Queue queue, User user) {
        queueWithUsersRepository.deleteByQueueAndUser(queue, user);
    }

    @Transactional
    public void deleteQueue(Long queueId){
        queueRepository.removeQueueByQueueId(queueId);
    }

}
