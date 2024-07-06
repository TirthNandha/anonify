import React, { useEffect, useState } from "react";
import { useAuth } from '../AuthContext';
import axios from "axios";

function YourDetails() {
    const [department, setDepartment] = useState('');
    const [passoutYear, setPassoutYear] = useState('');
    const [college, setCollege] = useState('');
    const [username, setUsername] = useState('')
    const { isLoggedIn, user } = useAuth();   

    useEffect(() => {
        async function getDetails(email) {
            try{
                const response = await axios.post("http://localhost:5000/getDetails", {email})
                const { department, passoutYear, college, username } = response.data;
                setDepartment(department);
                setPassoutYear(passoutYear);
                setCollege(college);
                setUsername(username);
            } catch (error) {
                console.error('Error getting user details:', error);
            
            }
        }

        if (user && user.email) {
            getDetails(user.email);
          }
    },[user])
  
    if (!isLoggedIn) {
      return <h3>Please Login to see your details</h3>;
    }
  
    return (
      <div style={{ paddingLeft: '8px' }}>
        <h3>
          <span style={{ color: "dark" }}>Username:</span>
          <span style={{ fontWeight: "normal" }}> {username}</span>
        </h3>
        <h3>
          <span style={{ color: "dark" }}>Department:</span>
          <span style={{ fontWeight: "normal" }}> {department}</span>
        </h3>
        <h3>
          <span style={{ color: "dark" }}>Passout Year:</span>
          <span style={{ fontWeight: "normal" }}> {passoutYear}</span>
        </h3>
        <h3>
          <span style={{ color: "dark" }}>College:</span>
          <span style={{ fontWeight: "normal" }}> {college}</span>
        </h3>
      </div>
    );
  }

export default YourDetails;