import { useEffect, useState } from "react";
import "../css/search.css";
import api from "../config/axios";


interface User {
  _id: string;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
}

function Searchcomponent() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await api.get("/search", {
        params: { skill: searchQuery }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/search");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="search">
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

      <div className="search-results">
        {users.length === 0 ? (
          <p className="no-results">No users found</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user._id}>
              <h2>{user.name}</h2>
              <p>
                <strong>Skills Offered:</strong>{" "}
                {user.skillsOffered.length
                  ? user.skillsOffered.join(", ")
                  : "Nothing listed"}
              </p>
              <p>
                <strong>{user.skillsWanted ? "" : "Wants to learn:"}</strong>{" "}
                {user.skillsWanted.length
                  ? user.skillsWanted.join(", ")
                  : "Nothing listed"}
              </p>
              <div className="user-buttons">
                <button>view profile</button>
                <button>Message</button></div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Searchcomponent;
