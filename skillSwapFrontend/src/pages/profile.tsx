import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Mail, Edit3, LogOut, Check } from "lucide-react";
import "../css/profile.css";
import api from "../config/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


interface DecodedToken {
  id: string;
  name?: string;
  email?: string;
  skillsOffered?: string[];
  skillsWanted?: string[];
  role?: "student" | "teacher";
  location?: string;
  education?: string;
  bio?: string;
  exp: number;
}

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [editing, setEditing] = useState(false);
  const [showSentRequests, setShowSentRequests] = useState(false);
  const [showReceivedRequests, setShowReceivedRequests] = useState(false);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    skillsOffered: "",
    skillsWanted: "",
    location: "",
    education: "",
    bio: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded);
      setForm({
        name: decoded.name || "",
        skillsOffered: decoded.skillsOffered?.join(", ") || "",
        skillsWanted: decoded.skillsWanted?.join(", ") || "",
        location: decoded.location || "",
        education: decoded.education || "",
        bio: decoded.bio || ""
      });
    } catch (err) {
      console.error("Invalid token");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/updateProfile",
        {
          name: form.name,
          skillsOffered: form.skillsOffered
            .split(",")
            .map(s => s.trim())
            .filter(Boolean),
          skillsWanted: form.skillsWanted
            .split(",")
            .map(s => s.trim())
            .filter(Boolean),
          location: form.location,
          education: form.education,
          bio: form.bio
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const newToken = response.data.token;
      localStorage.setItem("token", newToken);

      const decoded = jwtDecode<DecodedToken>(newToken);
      setUser(decoded);

      alert("Profile updated successfully!");
      setEditing(false);

    } catch (err: any) {
      console.error("Error updating profile:", err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const fetchSentRequests = async () => {
    try {
      const response = await api.get("/sent-requests");
      setSentRequests(response.data);
      setShowSentRequests(true);
      setShowReceivedRequests(false);
    } catch (error) {
      console.error("Error fetching sent requests:", error);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      const response = await api.get("/received-requests");
      setReceivedRequests(response.data);
      setShowReceivedRequests(true);
      setShowSentRequests(false);
    } catch (error) {
      console.error("Error fetching received requests:", error);
    }
  };

  const handleRespondToRequest = async (requestId: string, status: string) => {
    try {
      await api.patch(`/request/${requestId}/respond`, { status });
      alert(`Request ${status} successfully!`);
      fetchReceivedRequests(); // Refresh the list
    } catch (error: any) {
      console.error("Error responding to request:", error);
      alert(error.response?.data?.message || "Failed to respond to request");
    }
  };


  if (!user) return <div className="profile-loading">Loading profile...</div>;

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
          <p className="info-line"><Mail size={14} /> {user.email || "Not set"}</p>
          <p className="info-line">📍 {user.location || "Not set"}</p>
          <p className="info-line">🎓 {user.education || "Not set"}</p>

          <button className="btn primary" onClick={() => setEditing(true)}>
            <Edit3 size={16} /> Edit Profile
          </button>
          <button className="btn logout" onClick={logout}>
            <LogOut size={16} /> Logout
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
              {user.skillsOffered?.length
                ? user.skillsOffered.map((s, i) => (
                  <span key={i} className="skill offered">{s}</span>
                ))
                : <span className="empty-tag">Not set</span>}
            </div>
          </section>

          <section>
            <h3>Skills Wanted</h3>
            <div className="skills">
              {user.skillsWanted?.length
                ? user.skillsWanted.map((s, i) => (
                  <span key={i} className="skill wanted">{s}</span>
                ))
                : <span className="empty-tag">Not set</span>}
            </div>
          </section>

          <section className="actions">
            
            <button className="btn secondary" onClick={fetchSentRequests}>Sent Requests</button>
            {user.role === "teacher" && (
              <button className="btn highlight" onClick={fetchReceivedRequests}>Received Requests</button>
            )}
            <button
              className="btn secondary"
              onClick={() => navigate("/message")}
            >view messages</button>

          </section>
        </div>
      </div>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>

            <label>Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

            <label>Location</label>
            <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />

            <label>Education</label>
            <input value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} />

            <label>Bio</label>
            <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />

            <label>Skills Offered</label>
            <input value={form.skillsOffered} onChange={e => setForm({ ...form, skillsOffered: e.target.value })} />

            <label>Skills Wanted</label>
            <input value={form.skillsWanted} onChange={e => setForm({ ...form, skillsWanted: e.target.value })} />

            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn primary" onClick={handleSave}>
                <Check size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showSentRequests && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sent Requests</h2>
            <div className="requests-list">
              {sentRequests.length === 0 ? (
                <p>No sent requests found</p>
              ) : (
                sentRequests.map((request: any) => (
                  <div key={request._id} className="request-item">
                    <div className="request-info">
                      <h4>To: {request.recipient?.name || 'Unknown'}</h4>
                      <p><strong>Offered:</strong> {request.skillOffered}</p>
                      <p><strong>Wanted:</strong> {request.skillWanted}</p>
                      <p><strong>Status:</strong> <span className={`status ${request.status}`}>{request.status}</span></p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowSentRequests(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showReceivedRequests && (
        <div className="modal">
          <div className="modal-content">
            <h2>Received Requests</h2>
            <div className="requests-list">
              {receivedRequests.length === 0 ? (
                <p>No received requests found</p>
              ) : (
                receivedRequests.map((request: any) => (
                  <div key={request._id} className="request-item">
                    <div className="request-info">
                      <h4>From: {request.requester?.name || 'Unknown'}</h4>
                      <p><strong>Offered:</strong> {request.skillOffered}</p>
                      <p><strong>Wanted:</strong> {request.skillWanted}</p>
                      <p><strong>Status:</strong> <span className={`status ${request.status}`}>{request.status}</span></p>
                    </div>
                    {request.status === "pending" && (
                      <div className="request-actions">
                        <button 
                          className="btn primary" 
                          onClick={() => handleRespondToRequest(request._id, "accepted")}
                        >
                          Accept
                        </button>
                        <button 
                          className="btn secondary" 
                          onClick={() => handleRespondToRequest(request._id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setShowReceivedRequests(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
