import { Fragment, useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import Main from "./main/Main";
import Dashboard from "./Pages/Dashboard";
import Notification from "./Pages/Notification";
import SecurityMod from "./Pages/SecurityMod";
import Composantes from "./Pages/Composantes";
import LoginPage from "./Pages/login";
import SignupPage from "./Pages/signup";
import Home from './Pages/Home';
import Services from './Pages/Services';
import Surveillance from './Pages/Surveillance';
import Alert from './Pages/Alert';
import Hstory from './Pages/Hstory';
import Temperature from './Pages/Temperature';
import Lighting from './Pages/Lighting';
import Door from './Pages/Door';
import About from './Pages/About';
import PasswordReset from "./Pages/reset-password"

// Protected Route Component
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? <Outlet /> : null;
};

const App: React.FC = () => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = 
    useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateSize = () => {
      const currentWidth = window.innerWidth;
      setScreenWidth(currentWidth);
      if (currentWidth < 768) {
        setIsLeftSidebarCollapsed(true);
      }
    };
    
    window.addEventListener("resize", updateSize);
    updateSize();
    
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const LayoutWithSidebar = () => (
    <>
      <LeftSidebar
        isLeftSidebarCollapsed={isLeftSidebarCollapsed}
        changeIsLeftSidebarCollapsed={(value) => 
          setIsLeftSidebarCollapsed(value)
        }
      />
      <Main
        screenWidth={screenWidth}
        isLeftSidebarCollapsed={isLeftSidebarCollapsed}
      >
        <Outlet />
      </Main>
    </>
  );

  // Public Route Component to prevent authenticated users from accessing login/signup
  const PublicRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/Dashboard" replace /> : <Outlet />;
  };

  return (
    <Fragment>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Home />} />


        {/* Public Routes (Login/Signup) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/surveillance" element={<Surveillance />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/hstory" element={<Hstory />} />
        <Route path="/temperature" element={<Temperature />} />
        <Route path="/lighting" element={<Lighting />} />
        <Route path="/door" element={<Door />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        </Route>
        
        {/* Protected Routes with Sidebar Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutWithSidebar />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/SecurityMod" element={<SecurityMod />} />
            <Route path="/Composantes" element={<Composantes />} />
          </Route>
        </Route>

        {/* Catch all route for non-existing paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Fragment>
  );
};

export default App;