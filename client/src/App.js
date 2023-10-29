import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/SideBar/SideBar';
import Dashboard from './Pages/DashBoard';
import Analytics from './Pages/Analytics';
import CreateQuiz from './Pages/CreateQuiz';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';

const App = () => {
  // Use useState to manage the login state, set it to false initially if the user is not logged in.
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {loggedIn && <Sidebar />}
      <Routes>
        <Route path="/" element={loggedIn ? <Dashboard /> : <Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Login />} />
        <Route path="/analytics" element={loggedIn ? <Analytics /> : <Login />} />
        <Route path="/create" element={loggedIn ? <CreateQuiz /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
