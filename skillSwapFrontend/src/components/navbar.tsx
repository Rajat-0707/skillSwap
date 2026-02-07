import { Link } from 'react-router-dom';
import '../css/navbar.css'

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
    return(
        <>
        <div className="navbar">
            <Link to="/">
            <div className="logo" onClick={scrollToStart}>
                <img src="/src/assets/logo.png" alt="SkillSwap Logo" />
                <p>SkillSwap</p>
            </div></Link>
            <div className="navbuttons">
                <Link to="/"><button className="about" onClick={scrollToAbout}>
                    About
                </button></Link>
                <Link to="/"><button className="contact" onClick={scrollToContact}>
                    Contact Us
                </button></Link>
                 <Link to="/login"><button className="login" >
                   <span>Login</span>
                </button></Link>
            </div>
        </div>
        </>
    )
}

export default navbar;