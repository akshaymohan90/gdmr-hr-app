import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, default as AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetail from './pages/EmployeeDetail';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Leave from './pages/Leave';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './styles/variables.css';
import './styles/global.css';

// Protected Route Component
const ProtectedRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="employees/:id" element={<EmployeeDetail />} /> {/* Keep original component name */}
              <Route path="attendance" element={<Attendance />} />
              <Route path="leave" element={<Leave />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="performance" element={<Performance />} />
              <Route path="settings" element={<div>Settings Page</div>} /> {/* Change element as per instruction */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
