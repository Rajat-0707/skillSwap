import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";
import { Mail, MapPin, GraduationCap, Send } from "lucide-react";
import "../css/profile.css";
import { Link, useNavigate } from "react-router-dom";


interface UserProfile {
  _id: string;
  name?: string;
  email?: string;
  skillsOffered?: string[];
  skillsWanted?: string[];
  location?: string;
  education?: string;
  bio?: string;
  role?: "student" | "teacher";
}

export default function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendRequest = async () => {
    if (!id || !user) return;
    
    try {
      setSending(true);
      
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const skillOffered = user.skillsWanted?.[0] || "General Skill";
      const skillWanted = user.skillsOffered?.[0] || "General Skill";
      
      const response = await api.post("/send-request", {
        recipientId: id,
        skillOffered,
        skillWanted
      });
      
      if (response.status === 201) {
        setSent(true);
      }
    } catch (error: any) {
      console.error("Error sending request:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/viewProfile/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-wrapper">
      <Link to="/search"><div className="gobackk">
        ← Back to Home
      </div></Link>
      <div className="profile-cover"></div>

      <div className="profile-container">
       
        <div className="profile-left">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2>{user.name || "Not set"}</h2>

          <p className="info-line">
            <Mail size={14} /> {user.email || "Not set"}
          </p>

          <p className="info-line">
            <MapPin size={14} /> {user.location || "Not set"}
          </p>

          <p className="info-line">
            <GraduationCap size={14} /> {user.education || "Not set"}
          </p>

          <button
            className={`btn primary ${sent ? "disabled" : ""}`}
            onClick={handleSendRequest}
            disabled={sending || sent}
          >
            <Send size={16} />
            {sent ? "Request Sent" : sending ? "Sending..." : "Send Request"}
          </button>
          <button className="btn secondary" onClick={() => navigate(`/message/${id}`)}>
            <Send size={16} />
            Message
          </button>
        </div>

        <div className="profile-right">
          <section>
            <h3>About</h3>
            <p className="bio">{user.bio || "Not set"}</p>
          </section>

          <section>
            <h3>Skills Offered</h3>
            <div className="skills">
              {user.skillsOffered?.length ? (
                user.skillsOffered.map((s, i) => (
                  <span key={i} className="skill offered">
                    {s}
                  </span>
                ))
              ) : (
                <span className="empty-tag">Not set</span>
              )}
            </div>
          </section>

          <section>
            <h3>Skills Wanted</h3>
            <div className="skills">
              {user.skillsWanted?.length ? (
                user.skillsWanted.map((s, i) => (
                  <span key={i} className="skill wanted">
                    {s}
                  </span>
                ))
              ) : (
                <span className="empty-tag">Not set</span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
