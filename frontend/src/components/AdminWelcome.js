import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminwelcome.css';
import CreateQueue from "./CreateQueue";
import Home from "./Home";
import AdminHome from "./AdminHome";
import RunningJobs from "./RunningJobs";
export default function Welcome(){
    const navigate = useNavigate();
    const [show,setShow] = useState("1");
    useEffect(() => {

    }, []);
    return(
        <div>
        <div className="adminWelcome-container">
            <nav style={{display: "flex", alignItems: "center", marginBottom: "15vh", marginTop: "7vh"}}
                 className='navbar-button'>
                <button style={{color:"black", fontSize:"3vhx"}}>Job Recruitment Management</button>
                <button onClick={() => {
                    setShow("1")
                }} style={{marginLeft: "32vw"}}>Home
                </button>
                <button onClick={() => {
                    setShow("2")
                }}>CreateJob
                </button>
                <button onClick={() => {
                    setShow("3")
                }}>RunningJobs
                </button>
                <button onClick={() => {
                    sessionStorage.removeItem('token');
                    navigate("/")
                }}>
                    Logout
                </button>
            </nav>

        </div>
            {show === "1" && <AdminHome/>}
            {show === "2" && <CreateQueue/>}
            {show === "3" && <RunningJobs/>}</div>
    );
}