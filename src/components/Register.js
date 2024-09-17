import React, { useState } from 'react'
import '../App.css'
import axios from 'axios';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie';
import loginWallpaper from '../recipe-login.jpg'

import Navbar from './Navbar';

const Register = () => {

  let navigate = useNavigate();
  const handleRedirect =()=>{
    navigate('/');
  }
  return (
    <>
    <button
      className="absolute top-5 left-5 p-2 w-10 text-sm font-bold text-gray-700 bg-white hover:bg-gray-700 rounded-md shadow hover:text-white focus:outline-none"
      onClick={handleRedirect}
    >
      ←
    </button>
    <div className="flex justify-center items-center h-screen bg-custom-image bg-cover bg-center w-full" style={{ backgroundImage: `url(${loginWallpaper})` }}>
      <Signup />
    </div>
    </>
  )
};

const Signup =()=>{
  const [username, setUsername]=useState("")
  const [password, setPassword]=useState("")
  let navigate = useNavigate();

  const onSubmit =async (event)=>{
    event.preventDefault();
    try {
      await axios.post("https://spicescript-backend.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Login.");
      navigate('/auth');
    } catch (error) {
      console.error(error)
      alert(error.response.data)
    }
  }

  return (
  <Form username={username}
  setUsername={setUsername}
  password={password}
  setPassword={setPassword}
  label="Register"
  onSubmit={onSubmit}/>
  );
};

const Form=({username, setUsername, password, setPassword, label, onSubmit,})=>{
  return(
    <div className="flex flex-col justify-center items-center p-5 bg-black bg-opacity-50 text-black rounded-lg shadow-md shadow-[rgba(51,49,49,0.83)] m-5 w-[400px]">
    <form onSubmit={onSubmit}>
      <h2 className='text-white'>{label}</h2>
      <div className='form-group'>
        <label className='text-white' htmlFor="username"> Username: </label>
        <input type='text' id='username' 
        value={username}
        onChange={(event) => setUsername(event.target.value)}/>
      </div>

      <div className='form-group'>
        <label className='text-white' htmlFor="password"> Password: </label>
        <input type='password' id='password' 
        value={password}
        onChange={(event) => setPassword(event.target.value)}/>
      </div>

      <button className="text-gray-900 bg-gradient-to-r from-amber-300 via-orange-200 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type='submit'>Register</button>
    </form>
    <p className="text-white ">Already have an account? <Link to="/auth" className="text-blue-500">Login</Link></p>
  </div>
  );
}

export default Register 