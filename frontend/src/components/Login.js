import React, { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import '../styles/Login.css';
import Toaster from "./Toaster";
import Tooaster from "./Tooaster";
import {TextField} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const [logInStatus,setLogInStatus] = useState("");

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log(credentials);
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                console.log("got ok");
                const responseData = await response.json();
                const { token } = responseData;
                setLogInStatus({ msg: "Success", key: Math.random() });
                sessionStorage.setItem('token', token);
                const [username, expirationTimestamp] = token.split('|');
                navigate("/welcome");
            }else{
                setLogInStatus({
                    msg: "Invalid User name or Password",
                    key: Math.random(),
                });
            }
        } catch (error) {

            console.error('Error during login:', error.message);
        }
    };

    return (
        <>
            <center>
                <div className="login-container">
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "15vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh"
                        }}>Username
                        </div>
                        <TextField type="text" name="username" value={credentials.username} onChange={handleChange}
                                   label="Enter UserName"/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "15vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh"
                        }}>password
                        </div>
                        <TextField type="password" name="password" value={credentials.password} onChange={handleChange}
                                   label="Enter password"/>
                    </div>
                    <button onClick={handleLogin} style={{width:"15vw",marginTop:"2vh"}}>Login</button>
                    <div style={{marginTop: "10px"}}> don't have account ? <button onClick={() => {
                        navigate("/signup")
                    }}>Sign UP</button></div>
                </div>
            </center>
            {logInStatus ? (
                <Tooaster key={logInStatus.key} message={logInStatus.msg}/>
            ) : null}
        </>
    );
};

export default Login;
