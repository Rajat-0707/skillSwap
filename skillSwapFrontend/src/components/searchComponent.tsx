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

const SKILL_ALIASES: Record<string, string[]> = {
  javascript: ["js", "javascript", "node", "nodejs", "express", "expressjs"],
  typescript: ["ts", "typescript"],
  python: ["python", "py", "django", "flask", "fastapi"],
  java: ["java", "spring", "springboot"],
  cpp: ["cpp", "c++"],
  c: ["c"],
  csharp: ["csharp", "c#", ".net", "dotnet", "asp.net"],
  go: ["go", "golang"],
  rust: ["rust"],
  kotlin: ["kotlin"],
  swift: ["swift", "ios"],
  react: ["react", "reactjs", "next", "nextjs"],
  angular: ["angular"],
  vue: ["vue", "vuejs"],
  html: ["html", "html5"],
  css: ["css", "css3", "sass", "scss", "tailwind", "bootstrap"],
  mongodb: ["mongodb", "mongo"],
  mysql: ["mysql"],
  postgresql: ["postgres", "postgresql"],
  redis: ["redis"],
  firebase: ["firebase"],
  aws: ["aws", "amazon web services"],
  azure: ["azure"],
  gcp: ["gcp", "google cloud"],
  docker: ["docker", "container"],
  kubernetes: ["kubernetes", "k8s"],
  linux: ["linux", "ubuntu"],
  git: ["git", "github", "gitlab"],
  devops: ["devops", "ci/cd", "jenkins"],
  machinelearning: ["machine learning", "ml"],
  deeplearning: ["deep learning", "dl"],
  ai: ["ai", "artificial intelligence"],
  nlp: ["nlp", "natural language processing"],
  computervision: ["computer vision", "cv"],
  dataanalysis: ["data analysis", "pandas", "numpy"],
  powerbi: ["powerbi", "power bi"],
  tableau: ["tableau"],
  cybersecurity: ["cybersecurity", "security", "infosec"],
  penetrationtesting: ["penetration testing", "pentest"],
  networking: ["networking", "tcp/ip"],
  blockchain: ["blockchain", "web3", "solidity"],
  testing: ["testing", "jest", "mocha", "cypress", "selenium"],
  uiux: ["ui", "ux", "figma", "design"],
};

function Searchcomponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [cuser, setcUser] = useState<DecodedToken | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const normalizeSkill = (skill: string) => {
    const lower = skill.toLowerCase().trim();
    for (const key in SKILL_ALIASES) {
      if (SKILL_ALIASES[key].includes(lower)) return key;
    }
    return lower;
  };

  const getRecommendedUsers = () => {
    if (!searchQuery.trim()) return users;

    const normalizedQuery = normalizeSkill(searchQuery);

    const scoredUsers = users.map((user) => {
      let score = 0;

      const offeredNormalized = user.skillsOffered.map(normalizeSkill);

      if (offeredNormalized.includes(normalizedQuery)) {
        score += 5;
      }

      if (
        cuser?.skillsWanted?.some((wanted) =>
          offeredNormalized.includes(normalizeSkill(wanted))
        )
      ) {
        score += 3;
      }

      return { user, score };
    });

    return scoredUsers
      .sort((a, b) => b.score - a.score)
      .map((item) => item.user);
  };

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

      <div className="search-results">
        {loading ? (
          <p className="no-results">Loading...</p>
        ) : users.length === 0 ? (
          <p className="no-results">No users found</p>
        ) : (
          getRecommendedUsers().map((user) => (
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
                <button onClick={() => navigate(`/message/${user._id}`)}>Message</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Searchcomponent;
