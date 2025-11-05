
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./shortlist.css";

export const Shortlist = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const stud = location.state;

  if (!stud) {
    return (
      <div className="shortlist-container">
        <p>No student selected.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="shortlist-container">
      <h2>Student Profile</h2>
      <div className="profile-card">
        <p><b>Reg No:</b> {stud.reg}</p>
        <p><b>Name:</b> {stud.name}</p>
        <p><b>Degree:</b> {stud.degree}</p>
        <p><b>Specialization:</b> {stud.specilization}</p>
        <p><b>Age:</b> {stud.age}</p>
        <p><b>Phone:</b> {stud.phone_no}</p>
        <p><b>Address:</b> {stud.address}</p>
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>Back to Dashboard</button>
    </div>
  );
};
