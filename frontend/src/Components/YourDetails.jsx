// YourDetails.js
import React, { useContext } from 'react';
import { DataContext } from '../DataContext';
import { useAuth } from '../AuthContext';

export function YourDetails() {
  const { college, department, passoutYear, username } = useContext(DataContext);
  const { isLoggedIn, user } = useAuth();

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