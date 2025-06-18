import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Interactions from "./pages/Interactions";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { authService } from "./services/authService";
import theme from "./theme";

// Thêm import cho Settings và Analytics
const Settings = () => (
  <div style={{ padding: 32 }}>
    <h2>Settings</h2>
    <p>Trang cài đặt đang được phát triển...</p>
  </div>
);
const Analytics = () => (
  <div style={{ padding: 32 }}>
    <h2>Analytics</h2>
    <p>Trang phân tích đang được phát triển...</p>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on app load
    const checkAuth = () => {
      try {
        const authStatus = authService.isAuthenticated();
        setIsAuthenticated(authStatus);
        console.log("🔍 AUTH STATUS:", authStatus ? "Authenticated" : "Not Authenticated");
      } catch (error) {
        console.error(" Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        const newAuthStatus = authService.isAuthenticated();
        setIsAuthenticated(newAuthStatus);
        console.log("🔄 AUTH STATUS UPDATED:", newAuthStatus ? "Authenticated" : "Not Authenticated");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <div>Loading...</div>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Box sx={{ display: "flex" }}>
                  <Header />
                  <Sidebar />
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/interactions" element={<Interactions />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/analytics" element={<Analytics />} />
                  </Routes>
                </Box>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
