import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { socket } from "../socket";
import { jwtDecode } from "jwt-decode";
import { ArrowLeft } from "lucide-react";
import "../css/message.css";
import Footer from "../components/footer";

interface JwtPayload {
  id: string;
}

interface MessageType {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  createdAt: string;
}

export default function Chat() {
  const { id: receiverId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  const myId = decoded?.id ?? "";

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [receiverName, setReceiverName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Update socket auth before connecting
  useEffect(() => {
    socket.auth = { token: localStorage.getItem("token") };
    if (!socket.connected) socket.connect();
  }, []);

  useEffect(() => {
    if (!receiverId) return;

    const handler = (msg: MessageType) => {
      if (msg.sender === receiverId || msg.receiver === receiverId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handler);
    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [receiverId]);

  useEffect(() => {
    if (!receiverId) {
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const [msgRes, profileRes] = await Promise.all([
          api.get(`/messages/${receiverId}`),
          api.get(`/viewProfile/${receiverId}`),
        ]);
        setMessages(msgRes.data);
        setReceiverName(profileRes.data?.name ?? "User");
      } catch (err) {
        console.error("Failed to load messages:", err);
        setReceiverName("User");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [receiverId]);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !receiverId) return;
    socket.emit("privateMessage", {
      toUserId: receiverId,
      message: text,
    });
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!token || !myId) {
    return (
      <div className="chatWrapper">
        <div className="chat-error">Please log in to view messages.</div>
      </div>
    );
  }

  if (!receiverId) {
    return (
      <div className="chatWrapper">
        <div className="chat-error">
          No conversation selected.{" "}
          <button className="link-btn" onClick={() => navigate("/message")}>
            Back to messages
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="chatWrapper">
        <div className="chat-loading">Loading conversation...</div>
      </div>
    );
  }

  return (
    <div className="chatWrapper">
      <header className="chatHeader">
        <button
          className="chatBackBtn"
          onClick={() => navigate("/message")}
          aria-label="Back to messages"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="chatHeaderTitle">{receiverName}</h2>
      </header>
      <div className="chatBody" ref={chatBodyRef}>
        {messages.map((m) => (
          <div
            key={m._id}
            className={m.sender === myId ? "msg myMsg" : "msg otherMsg"}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="chatInput">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type message..."
          maxLength={2000}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
