import Navbar from "../components/navbar"
import '../css/navbar.css'
import '../css/login.css'
import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="main-container">
          <div className="login-image">
            <img src="/src/assets/login.png" alt="Login Image" />
          </div>

          <div className="login-form-area">
            <div className="login-head">
              <h1>Create your Account</h1>
            </div>
            <div className="login-form">
              <div className="inp"><input type="text" placeholder="Enter Your Name" /></div>
              <div className="inp"><input type="email" placeholder="Enter Your Email" /></div>
              <div className="inp">  <input type="password" placeholder="Enter Your Password" /></div>
              <div className="inp">  <input type="password" placeholder="Confirm Your Password" /></div>
              <div className="inp">  <input type="text" placeholder="Enter the skill you want to offer(optional)" /></div>
              <div className="inp">  <input type="text" placeholder="Enter the skill you want to learn(optional)" /></div>
              <div className="login-button"><button><span>Sign Up</span></button></div>
              <div className="no-account">
                <p>Already have an account?</p>
                <Link to="/login"><a href="">sign-in</a></Link>
              </div>
              


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup