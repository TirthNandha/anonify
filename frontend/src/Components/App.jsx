import React from "react";
import "../styles/App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from "./Signin";
import SignUp from "./SignUp";
import NewPost from "./NewPost";
import { AuthProvider } from '../AuthContext';
import ProtectedRoute from '../ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Newpost" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;