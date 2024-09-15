import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://spicescript-backend.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
};

export default Register;
