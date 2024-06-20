import React from "react";
import "../styles/App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./Signin";
import SignUp from "./SignUp";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
