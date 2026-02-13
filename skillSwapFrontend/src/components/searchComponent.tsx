import { useEffect, useState } from "react";
import "../css/search.css";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  _id: string;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
}

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

function Searchcomponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [cuser, setcUser] = useState<DecodedToken | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(false);
  const [recievername, setRecievername] = useState("");
  const [sendername, setSendername] = useState("");


  const handleMessage = async (user: any) => {
    setMessage(true);
    setRecievername(user.name);
    // setSendername(cuser.name);



  }



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setcUser(decoded);
    } catch (err) {
      console.error("Invalid token");
    }
  }, []);

  useEffect(() => {
    if (!cuser?.id) return;

    const fetchUsers = async () => {
      try {
        const response = await api.get("/search", {
          params: { id: cuser.id }
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchUsers();
  }, [cuser]);

  const handleSearch = async () => {
    if (!cuser?.id) return;

    try {
      setLoading(true);
      const response = await api.get("/search", {
        params: { skill: searchQuery, id: cuser.id }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search" id="search">
      <div className="search-container">
        <h1 className="search-title">Search for Skills</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for skills you want to learn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={!searchQuery.trim()}>
            <span>{loading ? "Searching..." : "Search"}</span>
          </button>
        </div>
      </div>

      {message && (
  <div className="msg-overlay-root">
    <div className="msg-popup-card">
      <div className="msg-inner-wrap">
        <h1>Send {recievername} a message:</h1>

        <input
          type="text"
          placeholder={sendername}
          disabled
        />

        <textarea placeholder="Enter your message..."></textarea>

        <div className="msg-action-row">
          <button
            className="msg-btn-cancel"
            onClick={() => setMessage(false)}
          >
            Cancel
          </button>
          <button className="msg-btn-send">Send</button>
        </div>
      </div>
    </div>
  </div>
)}



      <div className="search-results">
        {loading ? (
          <p className="no-results">Loading...</p>
        ) : users.length === 0 ? (
          <p className="no-results">No users found</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user._id}>
              <h2>{user.name}</h2>
              <p><span>email:</span> {user.email}</p>
              <p>
                <strong>Skills Offered:</strong>{" "}
                {user.skillsOffered.length
                  ? user.skillsOffered.join(", ")
                  : "Nothing listed"}
              </p>
              <p>
                <strong>{user.skillsWanted ? "Wants to learn:" : ""}</strong>{" "}
                {user.skillsWanted.length
                  ? user.skillsWanted.join(", ")
                  : "Nothing listed"}
              </p>
              <div className="user-buttons">
                <button onClick={() => navigate(`/viewProfile/${user._id}`)}>
                  view profile
                </button>
                <button onClick={() => handleMessage(user)} disabled={message}>Message</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Searchcomponent;
