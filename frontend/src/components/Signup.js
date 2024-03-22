import React, { useState } from 'react';
import '../styles/Signup.css';
import {useNavigate} from "react-router-dom";
import Toaster from "./Toaster";
import Tooaster from "./Tooaster";
import {TextField} from "@mui/material";

const Signup = () => {
    const navigate = useNavigate();
    const [signUpStatus,setSignUpStatus] = useState("");

    const [user, setUser] = useState({
        username: null,
        email: null,
        password: null
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        if(user.username == null && user.email == null && user.password == null){
            setSignUpStatus({msg:"Fill all fields for signup",key:Math.random()});
        }
        else{
            e.preventDefault();

            console.log("sending server with: ", user);

            try {
                // Make a POST request to the signup endpoint
                const response = await fetch('http://localhost:8080/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // You can add other headers if needed
                    },
                    body: JSON.stringify(user), // Include the user data in the request body

                });

                console.log(response.data);

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.data);
                    setSignUpStatus({msg:"User Added",key:Math.random()});
                    navigate("/");
                } else {
                    setSignUpStatus(
                        {
                            msg:"User not Added",
                            key:Math.random()
                        });
                    const errorData = await response.json();
                    console.error('Error during signup:', errorData.error);
                }

            } catch (error) {
                console.error('Error during signup:', error.message);
            }
        }
    };


    return (
        <>
            <center>
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "15vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh",
                            color:"#401F71"
                        }}>Username
                        </div>
                        <TextField type="text" name="username" value={user.username} onChange={handleChange}
                                   label="Enter UserName"/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "15vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh",
                            color:"#401F71"
                        }}>Email
                        </div>
                        <TextField type="text" name="email" value={user.email} onChange={handleChange}
                                   label="Enter Email"/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{
                            marginRight: "15vw",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "1vh",
                            color:"#401F71"
                        }}>password
                        </div>
                        <TextField type="password" name="password" value={user.password} onChange={handleChange}
                                   label="Enter password"/>
                    </div>
                    <button onClick={handleSubmit} style={{width: "15vw", marginTop: "2vh"}}>Login</button>
                </div>
            </center>
            {signUpStatus ? (
                <Tooaster key={signUpStatus.key} message={signUpStatus.msg}/>
            ) : null}
        </>
    );
};

export default Signup;
