// src/App.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';
import Signup from './Signup';
import StudentDashboard from './StudentDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return (
      <div className="auth-container">
        {showLogin ? <Login /> : <Signup />}
        <button className="toggle-btn" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h2>Student Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <StudentDashboard />
    </div>
  );
}

export default App;