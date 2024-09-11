import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import '../App.css';
import {useNavigate} from 'react-router-dom'
import navbarlogo from '../images/navbarlogo.png'

const Navbar = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin]=useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    }, []);

    const logout=()=>{
        localStorage.clear();
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

  return (
    <div className='navbar flex items-center justify-between px-5'>
        <img className='w-20 h-8 mt-3' src={navbarlogo}/>
        <div>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipe">Saved Recipe</Link>
        {isLogin ? <button className="rounded-xl bg-gradient-to-br from-[#3C0066] via-[#EC38BC] to-[#FDEFF9] 
        px-3 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg 
        hover:shadow-[#EC38BC]/50" onClick={logout}>Logout</button> : (<Link to="/auth">Login/Register</Link>)}
        </div>
    </div>
  )
}

export default Navbar