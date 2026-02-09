import '../css/navbar.css'
import '../css/login.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import api from "../config/axios.js"
import { useNavigate } from "react-router-dom"

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [skillsOffered, setskillsOffered] = useState('')
  const [skillsWanted, setskillsWanted] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSignup = async () => {
    setLoading(true);
    if(password.length < 6) {
      alert('Password must be at least 6 characters long')
      setLoading(false);
      return
    }
    if(email.length < 5 || !email.includes('@') || !email.includes('.')){
      alert('Please enter a valid email address')
      setLoading(false);
      return
    }
    if(name.length < 3) {
      alert('Name must be at least 3 characters long')
      setLoading(false);
      return
    }

    if(name === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please fill in all required fields')
      setLoading(false);
      return
    }

    if(password !== confirmPassword) {
      alert('Passwords do not match')
      setLoading(false);
      return
    }

    try {
      await api.post('/signup', { name, email, password, skillsOffered, skillsWanted }
      );
      alert('Signup successful! Please login to continue.')
      navigate('/login')  
      setLoading(false);
    } catch(err: any) {
      console.error('Signup failed:', err)
      alert(err.response.data.message || 'Signup failed. Please try again.')
      setLoading(false);
    }
    
  }

  return (
    <>
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
              <div className="inp"><input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required/></div>
              <div className="inp"><input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/></div>
              <div className="inp">  <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required/></div>
              <div className="inp">  <input type="password" placeholder="Confirm Your Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/></div>
              <div className="inp">  <input type="text" placeholder="Enter the skill you want to offer(optional)" value={skillsOffered} onChange={(e) => setskillsOffered(e.target.value)} /></div>
              <div className="inp">  <input type="text" placeholder="Enter the skill you want to learn(optional)" value={skillsWanted} onChange={(e) => setskillsWanted(e.target.value)} /></div>
              <div className="login-button"><button onClick={handleSignup}><span>{loading ? 'Creating Account...' : 'Sign Up'}</span></button></div>
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