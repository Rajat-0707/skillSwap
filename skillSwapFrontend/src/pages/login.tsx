import "../css/navbar.css";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import api from "../config/axios.js";
import { AuthContext } from "../authcontext";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext)!;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);
      setIsLoggedIn(true);

      navigate("/search");
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="page-scale">


    <div className="login-container">
      <Link to="/"><div className="goback">
        ← Back to Home
      </div></Link>
      <div className="main-container">
        <div className="login-image">
          <img src="/login.png" alt="Login" />
        </div>

        <div className="login-form-area">
          <div className="login-head">
            <h1>Login</h1>
          </div>

          <div className="login-form">
            <div className="inp">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inp">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-button">
              <button onClick={handleLogin} disabled={loading}>
                <span>{loading ? "Logging in..." : "Login"}</span>
              </button>
            </div>

            <div className="no-account">
              <p>Don't have an account?</p>
              <Link to="/signup">Sign up</Link>
            </div>

            <div className="or">
              <hr /><p>OR</p><hr />
            </div>

           <div className="social-login"> <button className="social-circle google" aria-label="Login with Google"> <svg viewBox="0 0 48 48" width="40" height="40"> <path fill="#EA4335" d="M24 9.5c3.2 0 6.1 1.1 8.3 3.1l6.2-6.2C34.5 2.8 29.6.5 24 .5 14.6.5 6.6 6.4 3.3 14.7l7.4 5.7C12.6 14 17.8 9.5 24 9.5z" /> <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.5c-.5 2.7-2 5-4.3 6.5l6.7 5.2c3.9-3.6 6.2-9 6.2-15.7z" /> <path fill="#FBBC05" d="M10.7 28.4c-1-2.7-1-5.6 0-8.3l-7.4-5.7C1.2 18.1.5 21 .5 24s.7 5.9 2.8 9.6l7.4-5.2z" /> <path fill="#34A853" d="M24 47.5c5.6 0 10.3-1.9 13.7-5.2l-6.7-5.2c-1.9 1.3-4.3 2-7 2-6.2 0-11.4-4.5-13.3-10.6l-7.4 5.2C6.6 41.6 14.6 47.5 24 47.5z" /> </svg> </button> <button className="social-circle github" aria-label="Login with GitHub"> <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"> <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.3 7.6 10.8.6.1.8-.2.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8-.7 2.4-1.3.1-.7.4-1.3.8-1.6-2.5-.3-5.1-1.3-5.1-5.7 0-1.3.5-2.3 1.1-3.2-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.3 1.1a11.5 11.5 0 016 0C17.6 4 18.5 4.3 18.5 4.3c.6 1.6.2 2.8.1 3.1.7.9 1.1 1.9 1.1 3.2 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2v3c0 .4.2.7.8.6 4.4-1.5 7.6-5.8 7.6-10.8C23.2 5.4 18.3.5 12 .5z" /> </svg> </button>  </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
