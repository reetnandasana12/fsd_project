import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import DefaultPage from "./components/DefaultPage";
import Admin from "./components/Admin";
import Welcome from "./components/Welcome";
import AdminWelcome from "./components/AdminWelcome";
import './App.css'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // You can implement a function here to check if the user is already logged in
    // and set the user state accordingly.
  }, []);

  const handleLogout = () => {
    // Implement a function to log out the user and update the user state
  };

  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/signup" element={<Signup setUser={setUser} />} />
                  <Route path="/" element={<DefaultPage />} />
                  {/*<Route path="/login" element={<Login setUser={setUser} />} />*/}
                  {/*<Route path="/admin" element={<Admin setUser={setUser} />} />*/}
                  <Route path="/adminWelcome" element={<AdminWelcome />} />
                  <Route path="/welcome" element={<Welcome />} />
              </Routes>
          </Router>
      </div>

  );
};

export default App;
