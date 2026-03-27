import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import Dashboard from './pages/Dashboard';
import MyReports from './pages/MyReports';
import SubmitIssue from './pages/SubmitIssue';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AddDetails from './pages/AddDetails';

// Moved outside App to prevent full unmount/remount on re-renders
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-details" element={<AddDetails />} />
      </Route>

      {/* Main App Routes */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-reports" element={<MyReports />} />
        <Route path="submit-issue" element={<SubmitIssue />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
