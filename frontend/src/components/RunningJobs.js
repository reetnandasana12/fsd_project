import React, {useEffect, useState} from 'react';
import '../styles/queuelist.css'
import Toaster from "./Toaster";

function RunningJobs(props) {
    const [Jobs, setJobs] = useState([]);
    const [runningJobStatus,setRunningJobStatus] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/queues');
            if (!response.ok) {
                throw new Error('Failed to fetch Jobs');
            }
            const data = await response.json();
            console.log(data);
            setJobs(data);
        } catch (error) {
            console.error('Error fetching Jobs:', error);
        }
    };

    const handleRemove = async (queueId) => {
      try{
          const res = await fetch(`http://localhost:8080/api/queues/${queueId}/removequeue`,{
              method : "POST",
              headers : {
                    'Content-Type':'application/json',
              },
          });

          if(res.ok){
              const resData = await res.json();
              console.log(resData);
              setRunningJobStatus({msg:"Job deleted successfully",key:Math.random()});
          }
          else{
              const errorData = await res.json();
              console.error('Error during Deleting Job:', errorData.error);
              setRunningJobStatus({msg:"Job was not deleted",key:Math.random()});
          }
      }
      catch(error) {
          console.error('Error during Deleting Job:', error.message);
      }
    };

    return (
        <>
            <div className='Joblist-container'>
                <center><h2 style={{fontSize: "32px"}}>List Of Job</h2></center>
                <center>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                        padding: "20px"
                    }}>
                        <table style={{width: "80vw", borderCollapse: "collapse", textAlign: "center"}}>
                            <thead>
                            <tr style={{backgroundColor:"#401F71", color: "white"}}>
                                <th style={{padding: "12px 15px"}}>Name</th>
                                <th style={{padding: "12px 15px"}}>Capacity</th>
                                <th style={{padding: "12px 15px"}}>Skills</th>
                                <th style={{padding: "12px 15px"}}>Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Jobs.map(Job => (
                                <tr key={Job.queueId} style={{backgroundColor:"#BE7B72", color: "black"}}>
                                    <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>{Job.queueName}</td>
                                    <td style={{
                                        padding: "12px 15px",
                                        border: "1px solid #ddd"
                                    }}>{Job.queueCapacity}</td>
                                    <td style={{
                                        padding: "12px 15px",
                                        border: "1px solid #ddd"
                                    }}>{Job.queueService}</td>
                                    <td style={{padding: "12px 15px", border: "1px solid #ddd"}}>
                                        <button style={{
                                            backgroundColor: "#401F71",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }} onClick={() => handleRemove(Job.queueId)}>RemoveJob
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </center>


            </div>
            {runningJobStatus ? (
                <Toaster key={runningJobStatus.key} message={runningJobStatus.msg}/>
            ) : null}
        </>
    );
}

export default RunningJobs;