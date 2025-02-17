import React, { useState } from 'react';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Chatbot from './components/chatbot';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formName) => {
      setCurrentForm(formName);
  }

  const handleLogin = () => {
      setIsLoggedIn(true);
  }

  const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentForm('login');
  }

  if (isLoggedIn) {
      return (
          <div className="App">
              <Chatbot />
              <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
      );
  }

  return (
      <div className="App">
          {currentForm === "login" ? (
              <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
          ) : (
              <Register onFormSwitch={toggleForm} />
          )}
      </div>
  );
}

export default App;
