import { Link, Navigate } from 'react-router-dom';
import '../css/navbar.css'
import {useEffect, useState} from 'react'
import api from '../config/axios';

function navbar(){
     const scrollToAbout = () => {
    const section = document.getElementById("about");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToStart = () => {
    const section = document.getElementById("start");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const section = document.getElementById("contactus");
    section?.scrollIntoView({ behavior: "smooth" });
  };

   const handleLogout = async () => {
    try {
      await api.post("/logout")
    } catch {}
    localStorage.removeItem("token")
    setUser(null)
    
  }

  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data);
        console.log("Logged in user:", res.data);
      } catch (err) {
        setUser(null);
      } 
    };
    checkLogin();
  }, []);

  return(
        <>
        <div className="navbar">
            <Link to="/">
            <div className="logo" onClick={scrollToStart}>
                <img src="/src/assets/logo.png" alt="SkillSwap Logo" />
                <p>SkillSwap</p>
            </div></Link>
            <div className="navbuttons">
              {user &&
                <button className="about">Search</button>
              }
                <Link to="/"><button className="about" onClick={scrollToAbout}>
                    About
                </button></Link>
                <Link to="/"><button className="contact" onClick={scrollToContact}>
                    Contact Us
                </button></Link>
                {user && 
                  <Link to='/profile'><button className="about">Profile</button></Link>}
                {user ? (
                  <Link to="/"><button className="login" onClick={handleLogout}>
                    <span>Logout</span>
                  </button></Link>):
                 <Link to="/login"><button className="login" >
                   <span>Login</span>
                </button></Link>}
            </div>
        </div>
        </>
    )
}

export default navbar;