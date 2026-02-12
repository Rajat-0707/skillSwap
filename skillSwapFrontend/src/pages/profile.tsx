import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Mail, Edit3, LogOut, BookOpen, Award, Briefcase, Check, X } from "lucide-react";
import "../css/profile.css";
import api from "../config/axios";

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
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [editing, setEditing] = useState(false);
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


  if (!user) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
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
            <button className="btn secondary">Sent Requests</button>
            {user.role === "teacher" && (
              <button className="btn highlight">Received Requests</button>
            )}
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
    </div>
  );
}
