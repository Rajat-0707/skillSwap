import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useContext } from "react";
import api from "../config/axios";
import { AuthContext } from "../authcontext";
import { Navigate} from "react-router-dom";

function Navbar() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { isLoggedIn, setIsLoggedIn } = auth;

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStart = () => {
    document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contactus")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch {}
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo" onClick={scrollToStart}>
          <img src="/src/assets/logo.png" alt="SkillSwap Logo" />
          <p>SkillSwap</p>
        </div>
      </Link>

      <div className="navbuttons">
        {isLoggedIn && (
          <Link to="/search">
            <button className="about">Search</button>
          </Link>
        )}

        <Link to="/">
          <button className="about" onClick={scrollToAbout}>About</button>
        </Link>

        <Link to="/">
          <button className="contact" onClick={scrollToContact}>Contact Us</button>
        </Link>

        {isLoggedIn && (
          <Link to="/profile">
            <button className="about">Profile</button>
          </Link>
        )}

        {isLoggedIn ? (
          <button className="login" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/login">
            <button className="login"><span>Login</span></button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
