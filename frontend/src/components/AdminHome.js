import React, { useState, useEffect } from 'react';
import '../styles/adminhome.css'
import Divider from '@mui/material/Divider';
import {useNavigate} from "react-router-dom";
const AdminHome = () => {
    const navigate = useNavigate();
    const [queuesWithUsers, setQueuesWithUsers] = useState([]);
    const [highLightColor,setHighLightColor] = useState({
        "queueId":null,
        "userId":null,
    });
    const [highLightedColor,setHighLightedColor] = useState({
        "queueId":null,
        "userId":null,
    });
    const [groupedQueues, setGroupedQueues] = useState({});
    const [queueNames, setQueueNames] = useState({});

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(!token)
        {
            navigate("/")
        }
        fetchQueuesWithUsers();
    }, []);

    useEffect(() => {
        fetchQueueNames();
    }, [queuesWithUsers]);

    const fetchQueuesWithUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/abed/admin/queues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQueuesWithUsers(data);
                groupQueuesWithUsers(data); // Call group function here
            } else {
                throw new Error('Failed to fetch queues with users');
            }
        } catch (error) {
            console.error('Error fetching queues with users:', error);
        }
    };

    const groupQueuesWithUsers = async (queuesWithUsers) => {
        try {
            const userIds = queuesWithUsers.map(queueWithUser => queueWithUser.user);
            const usersData = await Promise.all(userIds.map(async userId => {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/getData/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        return { id: userId, username: userData.username, email: userData.email };
                    } else {
                        throw new Error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            }));

            const grouped = {};
            console.log(usersData);
            queuesWithUsers.forEach(queueWithUser => {
                const queueId = queueWithUser.queue;
                const userId = queueWithUser.user;
                if (!grouped[queueId]) {
                    grouped[queueId] = [];
                }
                const userData = usersData.find(user => user && user.id === userId); // Find corresponding user data
                if (userData) {
                    grouped[queueId].push(userData);
                }
            });
            setGroupedQueues(grouped);
            console.log(grouped);
        } catch (error) {
            console.error('Error grouping queues with users:', error);
        }
    };

    const handleDelete = async (queueId,userId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/queues/${queueId}/${userId}/removeUser`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                setHighLightColor({ queueId, userId });
            } else {
                const errorData = await response.json();
                console.error('Error during Delete or Remove User From Queue:', errorData.error);
            }


        }
        catch (error) {
            console.error('Error during Delete or Remove User From Queue:', error.message);
        }
    }
    const handleDone = async (queueId,userId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/queues/${queueId}/${userId}/doneUserWork`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                setHighLightedColor({ queueId, userId });
            } else {
                const errorData = await response.json();
                console.error('Error during Delete or Remove User From Queue:', errorData.error);
            }
        }
        catch (error) {
            console.error('Error during Delete or Remove User From Queue:', error.message);
        }
    }

    const fetchQueueNames = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/queues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQueueNames(data);
                console.log(data);
            } else {
                throw new Error('Failed to fetch queue names');
            }
        } catch (error) {
            console.error('Error fetching queue names:', error);
        }
    };

    return (
        <div>
            <center>
                <div className="queue-view">
                    <div className="admin-outer">
                        {Object.entries(groupedQueues).map(([queueId, users],index) => (
                            <div className="admin-queueView">
                                {queueNames[index] && (
                                    <h3 style={{
                                        fontSize: "28px",
                                        color: "white"
                                    }}>{queueNames[index].queueName}</h3>
                                )}
                                {users.map(user => (
                                        <div
                                            className="user-queueView"
                                            key={user.id}
                                            style={{
                                                display: "flex",
                                                backgroundColor: highLightColor.queueId === queueId && highLightColor.userId === user.id ? "rgba(240, 105, 96,0.8)" : highLightedColor.queueId === queueId && highLightedColor.userId === user.id ? "rgba(122, 240, 122,0.8)" : "#dedcdc"
                                            }}
                                        >
                                            <div style={{display: "flex", color: "black",fontWeight:"500", fontSize: "19px",marginRight:"5px",alignSelf:"center"}}>
                                                <div >Username {user.username}</div>
                                            </div>
                                            <div>
                                                {(highLightColor.userId !== user.id || highLightColor.queueId !== queueId) && ((highLightedColor.queueId !== queueId || highLightedColor.userId !== user.id)) &&
                                                    <button onClick={() => handleDelete(queueId, user.id)}
                                                            style={{backgroundColor: "rgba(255, 0, 0,1)",width:"5vw"}}>Remove</button>
                                                }
                                                {(highLightedColor.queueId !== queueId || highLightedColor.userId !== user.id) && (highLightColor.userId !== user.id || highLightColor.queueId !== queueId) &&
                                                    <button onClick={() => handleDone(queueId, user.id)}
                                                            style={{backgroundColor: "rgba(0, 190, 0,1)",width:"5vw"}}>Done</button>
                                                }
                                            </div>
                                        </div>
                                ))}
                            </div>

                        ))}
                    </div>
                </div>
            </center>
        </div>
    );
};

export default AdminHome;
