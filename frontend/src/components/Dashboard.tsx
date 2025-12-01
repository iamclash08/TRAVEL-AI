import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

interface DashboardProps {
  user: { username: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-title">TravelAI</div>
        <div className="navbar-user">
          <span>Logged in as: <strong>{user?.username}</strong></span>
        </div>
        <div className="navbar-right">
          <button onClick={() => navigate("/profile", { state: { user } })}>
            Profile
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="dashboard-body">
        
        {/* Chatbot Section */}
        <div className="chat-section">
          <h2 className="section-title">Chatbot</h2>

          <div className="chat-box">
            <p className="chat-placeholder">Start chatting with the bot...</p>
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>

        {/* Chat History Section */}
        <div className="history-section">
          <h2 className="section-title">Previous Chats</h2>
          <ul className="history-list">
            <li className="history-item">Chat Session 1</li>
            <li className="history-item">Chat Session 2</li>
            <li className="history-item">Chat Session 3</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
