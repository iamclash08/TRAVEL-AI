// src/pages/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  user: { username: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-lg font-bold">TravelAI</div>
        <div className="flex items-center gap-6">
          <span>Logged in as: <strong>{user?.username}</strong></span>
          <button
            onClick={() => navigate("/profile", { state: { user } })}
          >
            Profile
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-1">
        {/* Chatbot Section */}
        <div className="w-2/3 p-6 border-r bg-white">
          <h2 className="text-xl font-semibold mb-4">Chatbot</h2>
          <div className="h-[75vh] border rounded-lg p-4 overflow-y-auto bg-gray-50">
            {/* Chatbot messages go here */}
            <p className="text-gray-400">Start chatting with the bot...</p>
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
              Send
            </button>
          </div>
        </div>

        {/* Chat History Section */}
        <div className="w-1/3 p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Previous Chats</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer">
              Chat Session 1
            </li>
            <li className="p-3 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer">
              Chat Session 2
            </li>
            <li className="p-3 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer">
              Chat Session 3
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
