import React from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from "./Signin";
import SignUp from "./SignUp";
import NewPost from "./NewPost";
import { AuthProvider } from '../AuthContext';
import { DataProvider } from "../DataContext";
import PostPage from "./PostPage";
import Home from "./Home";
import Admission from "./Admission";
import Placements from "./Placements.jsx";
import GeneralQueries from "./GeneralQueries";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Signin" element={<SignIn />} />
              <Route path="/Signup" element={<SignUp />} />
              <Route path="/Newpost" element={<NewPost />} />
              <Route path="/post/:postId" element={<PostPage />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/general-queries" element={<GeneralQueries />} />
            </Routes>
          </Router>
        </DataProvider>
    </AuthProvider>
  );
}

export default App;