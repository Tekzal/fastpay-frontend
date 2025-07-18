import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard'
import StudentPaymentsInterface from './pages/StudentPaymentsInterface'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import SuperUserDashboard from './pages/SuperUserDashboard';
import { getCurrentUser } from './services/api';
import { LogOut, LayoutDashboard, CreditCard, BarChart } from 'lucide-react';

// Navigation component with responsive design
function TopNav({ user, onLogout }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'manager': return 'Manager';
      case 'cashier': return 'Cashier';
      default: return role;
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {user.role === 'admin' && (
              <button 
                onClick={() => navigate('/admin')} 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Admin</span>
              </button>
            )}
            <button 
              onClick={() => navigate('/student')} 
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <CreditCard className="w-5 h-5" />
              <span>Payments</span>
            </button>
            {(user.role === 'admin' || user.role === 'manager') && (
              <button 
                onClick={() => navigate('/reports')} 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <BarChart className="w-5 h-5" />
                <span>Reports</span>
              </button>
            )}
          </div>

          {/* User Info - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{user.username}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-500">{getRoleDisplayName(user.role)}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
          {user.role === 'admin' && (
            <button 
              onClick={() => {
                navigate('/admin');
                setIsMobileMenuOpen(false);
              }} 
              className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <LayoutDashboard className="w-6 h-6" />
              <span>Admin Dashboard</span>
            </button>
          )}
          <button 
            onClick={() => {
              navigate('/student');
              setIsMobileMenuOpen(false);
            }} 
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <CreditCard className="w-6 h-6" />
            <span>Student Payments</span>
          </button>
          {(user.role === 'admin' || user.role === 'manager') && (
            <button 
              onClick={() => {
                navigate('/reports');
                setIsMobileMenuOpen(false);
              }} 
              className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <BarChart className="w-6 h-6" />
              <span>Reports</span>
            </button>
          )}
          
          {/* Mobile User Info */}
          <div className="px-3 py-2 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium text-gray-900">{user.username}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-500">{getRoleDisplayName(user.role)}</span>
            </div>
            <button 
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 text-left text-sm text-red-600 hover:text-red-800 font-medium px-3 py-2 rounded-md hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('jwt_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  // Function to handle successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <TopNav user={user} onLogout={handleLogout} />}
        <Routes>
          {/* Login route */}
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
          } />
          {/* Signup route */}
          <Route path="/signup" element={
            user ? <Navigate to="/" replace /> : <Signup />
          } />
          {/* Forgot Password route */}
          <Route path="/forgot-password" element={
            user ? <Navigate to="/" replace /> : <ForgotPassword />
          } />
          
          {/* Default route - redirect to login if not authenticated */}
          <Route path="/" element={
            user ? (
              user.role === 'admin' ? (
                <AdminDashboard user={user} />
              ) : (
                <StudentPaymentsInterface user={user} />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Admin Dashboard */}
          <Route path="/admin" element={
            user && user.role === 'admin' ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Student Interface */}
          <Route path="/student" element={
            user ? (
              <StudentPaymentsInterface user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Reports */}
          <Route path="/reports" element={
            user && (user.role === 'admin' || user.role === 'manager') ? (
              <Reports user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />

          {/* Super User Dashboard */}
          <Route path="/superuser-dashboard" element={<SuperUserDashboard />} />

          {/* Catch all */}
          <Route path="*" element={
            user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App

//<AdminDashboard />
//<StudentPaymentsInterface />