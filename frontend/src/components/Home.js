import React, {useEffect, useState} from "react";
import '../styles/home.css'
import Toaster from "./Toaster";

export default function Home(){
    const [user,setUser] = useState([]);
    const [queues,setQueues] = useState([]);
    const [exitStatus,setExitStatus] = useState("");
    let userName;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const name = token.split("|");
        userName = name[0];
        fetchUserId();
    }, []);

    useEffect(() => {
        if (user.id) {
            fetchQueueInfo();
        }
    }, [user]);

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
    const fetchQueueInfo = async () => {
        try{
            const response = await fetch(`http://localhost:8080/api/queues/${user.id}/participant`,{
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch queues');
            }
            const data = await response.json();
            console.log(data);
            setQueues(data);
        }
        catch (error) {
            console.error('Error fetching queues:', error);
        }
    }
    const handleRemove = async (queueId,userId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/queues/${queueId}/${userId}/remove`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.data);
                setExitStatus({msg:"You Are Exited from queue",key:Math.random()});
            } else {
                const errorData = await response.json();
                console.error('Error during Delete or Remove User From Queue:', errorData.error);
                setExitStatus({msg:"You Are already Exited from queue",key:Math.random()});
            }


        }
        catch (error) {
            console.error('Error during Delete or Remove User From Queue:', error.message);
        }
    }
    return (
        <>
            <div className='home-container'>
                <center><h2 style={{fontSize: "32px"}}>Participated Jobs</h2>
                </center>
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
                                <th style={{padding: "12px 15px",width:"30px",height:"20px", fontSize: "20px"}}>Name</th>
                                <th style={{padding: "12px 15px",width:"30px",height:"20px", fontSize: "20px"}}>Capacity</th>
                                <th style={{padding: "12px 15px",width:"30px",height:"20px", fontSize: "20px"}}>Service</th>
                                <th style={{padding: "12px 15px",width:"30px",height:"20px", fontSize: "20px"}}>Exit From job</th>
                            </tr>
                            </thead>
                            <tbody>
                            {queues.map(queue => (
                                <tr key={queue.queueId}  className="separator">
                                    <td>{queue.queueName}</td>
                                    <td>{queue.queueCapacity}</td>
                                    <td>{queue.queueService}</td>
                                    <td>
                                        <button onClick={() => handleRemove(queue.queueId, user.id)} style={{backgroundColor:"#401F71",border:"none",color:"white",padding:"10px",paddingLeft:"25px",paddingRight:"25px",borderRadius:"10px"}}>Exit</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </center>
            </div>
            {exitStatus ? (
                <Toaster key={exitStatus.key} message={exitStatus.msg} />
            ) : null}
        </>
    )
        ;
}