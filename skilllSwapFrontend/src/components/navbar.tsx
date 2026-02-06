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
            <div className="logo" onClick={scrollToStart}>
                <img src="/src/assets/logo.png" alt="SkillSwap Logo" />
                <p>SkillSwap</p>
            </div>
            <div className="navbuttons">
                <button className="about" onClick={scrollToAbout}>
                    About
                </button>
                <button className="contact" onClick={scrollToContact}>
                    Contact Us
                </button>
                <button className="login" >
                    <span>Login</span>
                </button>
            </div>
        </div>
        </>
    )
}

export default navbar;