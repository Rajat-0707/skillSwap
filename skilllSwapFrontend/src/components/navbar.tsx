import '../css/navbar.css'

function navbar(){
    return(
        <>
        <div className="navbar">
            <div className="logo">
                <img src="/src/assets/logo.png" alt="SkillSwap Logo" />
                <p>SkillSwap</p>
            </div>
            <div className="navbuttons">
                <button className="about">
                    About
                </button>
                <button className="contact">
                    Contact Us
                </button>
                <button className="login">
                    <span>Login</span>
                </button>
            </div>
        </div>
        </>
    )
}

export default navbar;