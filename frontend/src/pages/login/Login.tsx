import React from 'react';
import { useNavigate } from "react-router-dom";

import { TextField, Button, Link } from "@mui/material"
import "./Login.css"

function Login() {
  const navigate = useNavigate()
  
  return (
    <div className="login-container">
        <Button>Log in with Google</Button>
        <Button>Log in with GitHub</Button>

        <TextField className="login-field" label="Username" type="text"></TextField>
        <div className="password-container">
            <TextField className="login-field" label="Password" type="password"></TextField>
            <Button onClick={() => navigate("/login/reset")}>Forgot your password?</Button>
        </div>

        <Button>Log in</Button>
        <Link href="/signin">Don't have an account? Sign up.</Link>
    </div>
  );
}

export default Login;
