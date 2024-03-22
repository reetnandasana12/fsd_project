import React, {useState} from "react";
import '../styles/createqueue.css'
import Toaster from "./Toaster";
import {TextField} from "@mui/material";
import Tooaster from "./Tooaster";

export default function CreateQueue(){
    const [data,setData] = useState({
        queueName : null,
        queueCapacity : null,
        queueService : null,
    });
    const clearFields = () => {
        setData({
            queueName: "",
            queueCapacity: "",
            queueService: ""
        });
    }
    const [queueStatus,setQueueStatus] = useState("");
    const [queuueStatus,setQueuueStatus] = useState("");
    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value});
    };
    const handleQueueData = async (e) => {

        if(data.queueName == null && data.queueCapacity == null && data.queueService == null){
            setQueuueStatus({msg:"Fill all field for creating Queue",key:Math.random()});
        }
        else if(data.queueCapacity == "0"){
            setQueuueStatus({msg:"Queue Capacity should be greater than 0",key:Math.random()});
        }
        else {
            try{
                const res = await fetch('http://localhost:8080/api/createqueue',{
                    method : 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(data),
                });
                if (res.ok) {
                    // Handle success
                    const responseData = await res.json();
                    console.log(responseData.data);
                    setQueueStatus({msg:"Queue created SuccessFully",key:Math.random()});
                    clearFields();
                }
                else{
                    setQueueStatus({msg:"Queue is not created",key:Math.random()});
                }
            }
            catch (error) {
                // Handle network errors or other exceptions
                console.error('Error during :', error.message);
            }
        }
    };
    return (
        <>
            <center>
                <div className='createqueue-container' style={{
                    backgroundColor: '#BE7B72',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    width: "fit-content",
                }}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "16vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh",
                            color:"#401F71"
                        }}>Job Name
                        </div>
                        <TextField id="id1" type="text" name="queueName" value={data.queueName} onChange={handleChange}
                                   label="JobName" style={{marginBottom:"10px"}}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "17vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh",
                            color:"#401F71"
                        }}>Job Size
                        </div>
                        <TextField id="id2" type="number" name="queueCapacity" value={data.queueCapacity} onChange={handleChange}
                                   label="JobCapacity" inputProps={{ min: 1 }} style={{marginBottom:"10px"}}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "15vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh",
                            color:"#401F71"
                        }}>Job Service
                        </div>
                        <TextField id="id3" type="text" name="queueService" value={data.queueService} onChange={handleChange}
                                   label="JobService" style={{marginBottom:"10px"}}/>
                    </div>

                    <button onClick={handleQueueData} style={{width: "15vw", marginTop: "2vh",padding:"2vh",border:"none",borderRadius:"10px",backgroundColor:"#401F71",color:"white",fontWeight:"bold",fontSize:"18px"}}>Create</button>
                </div>
            </center>
            {queueStatus ? (
                <Toaster key={queueStatus.key} message={queueStatus.msg}/>
            ) : null}
            {queuueStatus ? (
                <Tooaster key={queuueStatus.key} message={queuueStatus.msg}/>
            ) : null}
        </>

    );
}