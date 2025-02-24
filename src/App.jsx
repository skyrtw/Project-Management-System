import { 
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard/Dashboard";
import ProjectList from "./components/Projects/ProjectList";
import TaskForm from "./components/Tasks/TaskForm";
import ProjectForm from "./components/Projects/ProjectForm";
import TaskList from "./components/Tasks/TaskList";
import MemberForm from "./components/Team/MemberForm";
import TeamList from "./components/Team/TeamList";
import Sidebar from "./components/Shared/Sidebar";
import Team_Member_Sidebar from "./components/Shared/Team_Member_Sidebar"; // ✅ Import Team Member Sidebar
import TaskDetails from "./components/Tasks/TaskDetails";
import MemberDetails from "./components/Team/MemberDetails";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Shared/Home";
import Logout from "./components/Auth/Logout";
import { useState, useEffect } from "react";
import Profile from "./components/Dashboard/Profile";
import TeamMember_Dashboard from "./components/Dashboard/TeamMember_Dashboard";
import ServletRegister from "./components/Auth/ServletRegister";

// Main App Component
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/ProjectForm" element={<ProjectForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/TaskForm" element={<TaskForm />} />
          <Route path="/tasks/details" element={<TaskDetails />} />
          <Route path="/team" element={<TeamList />} />
          <Route path="/team/MemberForm" element={<MemberForm />} />
          <Route path="/team/details" element={<MemberDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/ServletRegister" element={<ServletRegister/>} /> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/Dashboard/TeamMember_Dashboard" element={<TeamMember_Dashboard/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

// Layout Component (Handles Sidebar Visibility & Role-Based Sidebar)
const Layout = ({ children }) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserRole(loggedInUser.role); // Set role
    }
  }, []);

  // Hide sidebar on home, login, and register pages
  const hideSidebar = ["/", "/login", "/Register", "/ServletRegister"].includes(location.pathname);

  return (
    <div className="container-layout">
      {!hideSidebar && (userRole === "Team Member" ? <Team_Member_Sidebar /> : <Sidebar />)}
      <div className="main-content">{children}</div>
    </div>
  );
};

export default App;
