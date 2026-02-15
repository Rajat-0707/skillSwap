import { Link } from "react-router-dom";
import "../css/footer.css";

const Footer = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contactus")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-text">SkillSwap</span>
          </Link>
          <p className="footer-tagline">Learn. Teach. Grow.</p>
          <p className="footer-desc">
            A community where developers share skills and grow together.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li>
              <Link to="/" onClick={(e) => { e.preventDefault(); scrollToAbout(); }}>
                About
              </Link>
            </li>
            <li>
              <Link to="/" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>
                Contact Us
              </Link>
            </li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/message">Messages</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
