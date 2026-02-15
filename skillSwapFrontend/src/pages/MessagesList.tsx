import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../config/axios"
import { jwtDecode } from "jwt-decode"
import { RefreshCw, ArrowLeft } from "lucide-react"
import "../css/messagesList.css"
import Footer from "../components/footer"

interface JwtPayload {
  id: string;
}

interface Conversation {
  userId: string
  name: string
  lastMessage: string
  lastTime: string
}

export default function MessagesList() {
  const token = localStorage.getItem("token")
  const myId = token ? jwtDecode<JwtPayload>(token).id : ""
  const [chats, setChats] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const navigate = useNavigate()

  const loadConversations = async () => {
    if (!myId) {
      setLoading(false)
      return
    }
    
    try {
      // Add timestamp to prevent caching
      const timestamp = Date.now()
      const res = await api.get(`/conversations?t=${timestamp}`)
      setChats(res.data)
    } catch (error) {
      console.error("Error loading conversations:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    loadConversations()
  }

  useEffect(() => {
    loadConversations()
  }, [myId])

  if (loading) {
    return <div className="inboxWrapper"><h1>Loading messages...</h1></div>
  }

  return (
    <div className="inboxWrapper">
      <div className="inbox-header">
        <div className="inbox-header-top">
          <Link to="/search" className="inbox-back-link">
            <ArrowLeft size={20} />
            Back
          </Link>
          <h1>Messages</h1>
        </div>
        <button 
          className="refresh-btn" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={16} className={refreshing ? "spinning" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      
      {chats.length===0 && (
        <div className="no-messages">
          <h2>No Messages Found</h2>
          <p>Start a conversation from the search page!</p>
        </div>
      )}
      {chats.length>0 && (
        chats.map((chat) => (
          <div
            key={chat.userId}
            className="chatRow"
            onClick={() => navigate(`/message/${String(chat.userId)}`)}
          >
            <div className="chatName">{chat.name}</div>
            <div className="chatLast">{chat.lastMessage}</div>
          </div>
        ))
      )}
    </div>
  )
}
