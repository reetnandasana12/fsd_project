import React, { useState, useEffect } from "react";
import '../styles/queuelist.css';
import Toaster from "./Toaster";
import Tooaster from "./Tooaster";

export default function QueueList() {
    const [user,setUser] = useState([]);
    const [queues, setQueues] = useState([]);
    const [quserStatus,setQuserStatus] = useState("");
    const [quuserStatus,setQuuserStatus] = useState("");
    let userName;

    useEffect(() => {
        fetchQueues();
        const token = sessionStorage.getItem('token');
        const name = token.split("|");
        userName = name[0];
        fetchUserId();
    }, []);

    const fetchQueues = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/queues');
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setQueues(data);
            }
            else{

                throw new Error('Failed to fetch queues');
            }
        } catch (error) {
            console.error('Error fetching queues:', error);
        }
    };
    const fetchUserId = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/getuser/${userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setUser(responseData);
            } else {
                throw new Error("User Not Found");
            }

        } catch (error) {
            console.error('Error during Fetch user:', error.message);
        }
    };

    const handleParticipant = async (queueId) => {
            try{
                const response = await fetch(`http://localhost:8080/api/queues/${queueId}/${user.id}/adduser`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data);

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.data);
                    setQuserStatus({msg:"You are added in queue",key:Math.random()});
                } else {
                    const errorData = await response.json();
                    console.error('Error during Adding user to queue:', errorData.error);
                    setQuuserStatus({msg:errorData.error,key:Math.random()});
                }
            }
            catch (error) {
                console.error('Error during Adding user to queue:', error.message);
            }
    };

    return (
        <>
            <div className='queuelist-container'>
                <center><h2 style={{fontSize: "32px"}}>List Of Job</h2></center>
                <center>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        padding: "20px"
                    }}>
                        <table style={{width: "80vw",backgroundColor:"#BE7B72", borderCollapse: "collapse", textAlign: "center"}}>
                            <thead>
                            <tr style={{backgroundColor: "#401F71", color: "white"}}>
                                <th style={{padding: "12px 15px"}}>Name</th>
                                <th style={{padding: "12px 15px"}}>Capacity</th>
                                <th style={{padding: "12px 15px"}}>Service</th>
                                <th style={{padding: "12px 15px"}}>Join Job</th>
                            </tr>
                            </thead>
                            <tbody>
                            {queues.map(queue => (
                                <tr key={queue.queueId}  className="separator">
                                    <td>{queue.queueName}</td>
                                    <td>{queue.queueCapacity}</td>
                                    <td>{queue.queueService}</td>
                                    <td>
                                        <button style={{
                                            backgroundColor: "#401F71",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }} onClick={() => handleParticipant(queue.queueId)}>Participate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </center>


            </div>
            {quserStatus ? (
                <Toaster key={quserStatus.key} message={quserStatus.msg} />
            ) : null}
            {quuserStatus ? (
                <Tooaster key={quuserStatus.key} message={quuserStatus.msg} />
            ) : null}
        </>
    );
}
