import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        {/* <Route path="/profile" element={<div>Profile Page</div>} /> */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

// Wrapper to pass user from state
function DashboardWrapper() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <div className="p-10 text-center text-red-500">Unauthorized. Please log in.</div>;
  }

  return <Dashboard user={user} />;
}

export default App;
