import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://spicescript-backend.onrender.com/auth/login", {
        username,
        password,
      });
      const token = response.data.token;
      if (token) {
        setCookie("alpha", token, { maxAge: 3600, path: "/" });
        localStorage.setItem("token", token);
        localStorage.setItem("userID", response.data.userID);
        alert("Login successfully");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Sign up</Link></p>
    </div>
  );
};

export default Login;
