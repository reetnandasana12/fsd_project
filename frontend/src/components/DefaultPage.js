import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DefaultPage.css';
import AdminHome from "./AdminHome";
// import CreateJob from "./CreateJobs";
// import RunningJobs from "./RunningJobs";
import Admin from "./Admin";
import Login from "./Login";

const DefaultPage = () => {
    const [login, setLogin] = useState("1");
    return (
        <center>
            <div className="main-container">
                <div style={{ marginBottom: "4vh" }} className="inner">
                    <button
                        className={login === "1" ? "active" : ""}
                        onClick={() => {
                            setLogin("1")
                        }}>UserLogin
                    </button>
                    <button
                        className={login === "2" ? "active" : ""}
                        onClick={() => {
                            setLogin("2")
                        }}>AdminLogin
                    </button>
                </div>
                {login === "1" && <Login />}
                {login === "2" && <Admin />}
            </div>
        </center>
    );
};

export default DefaultPage;
