import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Leads from './pages/Leads';
import LeadForm from './pages/LeadForm';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/leads/new" element={<LeadForm />} />
                    <Route path="/leads/edit/:id" element={<LeadForm />} />
                    <Route path="/" element={<Navigate to="/leads" />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;