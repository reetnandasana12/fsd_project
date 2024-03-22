package com.example.fsdproject.service;

import com.example.fsdproject.entity.Queue;
import com.example.fsdproject.entity.User;
import com.example.fsdproject.entity.QueueWithUsers;
import com.example.fsdproject.repository.QueueWithUsersRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueueWithUsersService {

    @Autowired
    private QueueWithUsersRepository queueWithUsersRepository;

    public List<QueueWithUsers> findByQueue(Queue queue) {
        return queueWithUsersRepository.findByQueue(queue);
    }

    public List<QueueWithUsers> getQueuesWithAssignedUsers() {
        List<QueueWithUsers> queuesWithUsers = queueWithUsersRepository.getALL();

        return queuesWithUsers;
    }
}
