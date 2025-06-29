import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard'
import StudentPaymentsInterface from './pages/StudentPaymentsInterface'
import Reports from './pages/Reports'
import Login from './pages/Login'
import { getCurrentUser } from './services/api';

function RequireAuth({ children, allowedRoles }) {
  const location = useLocation();
  const token = localStorage.getItem('jwt_token');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return React.cloneElement(children, { user });
}

function TopNav({ user }) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow border-b">
      <div className="flex gap-2">
        <button onClick={() => navigate('/')} className="font-semibold text-gray-700 hover:text-indigo-600 transition">Admin</button>
        <button onClick={() => navigate('/student')} className="font-semibold text-gray-700 hover:text-indigo-600 transition">Student</button>
        <button onClick={() => navigate('/reports')} className="font-semibold text-gray-700 hover:text-indigo-600 transition">Reports</button>
      </div>
      {user && (
        <div className="text-sm text-gray-500">Logged in as <span className="font-bold text-gray-700">{user.username}</span> ({user.role})</div>
      )}
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      getCurrentUser().then(setUser).catch(() => setUser(null));
    }
  }, []);

  return (
    <Router>
      {user && <TopNav user={user} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <RequireAuth>
            <StudentPaymentsInterface user={user} />
          </RequireAuth>
        } />
        <Route path="/admin" element={
          <RequireAuth allowedRoles={['admin']}>
            <AdminDashboard user={user} />
          </RequireAuth>
        } />
        <Route path="/student" element={
          <RequireAuth>
            <StudentPaymentsInterface user={user} />
          </RequireAuth>
        } />
        <Route path="/reports" element={
          <RequireAuth allowedRoles={['admin', 'manager']}>
            <Reports user={user} />
          </RequireAuth>
        } />
      </Routes>
    </Router>
  )
}

export default App

//<AdminDashboard />
//<StudentPaymentsInterface />