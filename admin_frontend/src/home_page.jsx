import React, { useState } from "react";
import "./HomePage.css";

function ReimaginedHomePage() {
  const [userCategory, setUserCategory] = useState("Select Category");

  const renderCategoryContent = () => {
    switch (userCategory) {
        case "Select Category":
        return (
          <div className="category-card">
            <h2>Select Category</h2>
            <p>Choose a category to view content.</p>
            <div className="actions">
              <a href="/login" className="action-btn">Admin</a>
              <a href="/login" className="action-btn secondary">Department</a>
              <a href="/login" className="action-btn">Work Leaders</a>
              <a href="/login" className="action-btn secondary">Workers</a>
            </div>
          </div>
        ) 
      case "Admin":
        return (
          <div className="category-card">
            <h2>Admin Dashboard</h2>
            <p>Manage complaints, view insights, and configure system settings.</p>
            <div className="actions">
              <a href="/login" className="action-btn">View Dashboard</a>
              <a href="/settings" className="action-btn secondary">Settings</a>
            </div>
          </div>
        );
      case "Department":
        return (
          <div className="category-card">
            <h2>Department Panel</h2>
            <p>Supervise departmental activities and monitor ongoing tasks.</p>
            <div className="actions">
              <a href="/login" className="action-btn">View Reports</a>
              <a href="/login" className="action-btn secondary">Manage Complaints</a>
            </div>
          </div>
        );
      case "WorkLeaders":
        return (
          <div className="category-card">
            <h2>Work Leader Tools</h2>
            <p>Assign tasks, manage workflows, and ensure team collaboration.</p>
            <div className="actions">
              <a href="/login" className="action-btn">View Tasks</a>
              <a href="/login" className="action-btn secondary">Manage Team</a>
            </div>
          </div>
        );
      case "Workers":
        return (
          <div className="category-card">
            <h2>Worker Dashboard</h2>
            <p>Track assigned tasks and report work progress efficiently.</p>
            <div className="actions">
              <a href="/login" className="action-btn">View My Tasks</a>
              <a href="/login" className="action-btn secondary">Update Profile</a>
            </div>
          </div>
        );
      default:
        return <h2>Select a category to view content!</h2>;
    }
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>DigitalCivic</h1>
        </div>
        <ul className="navbar-links">
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
          <li>
            <select
              className="category-selector"
              value={userCategory}
              onChange={(e) => setUserCategory(e.target.value)}
            >
              <option value="Select Category">Select Category</option>
              <option value="Admin">Admin</option>
              <option value="Department">Department</option>
              <option value="WorkLeaders">Work Leader</option>
              <option value="Workers">Worker</option>
            </select>
          </li>
        </ul>
      </nav>
      <header className="hero-section">
        <h1>Welcome to the Complaint Management System</h1>
        <p>Streamlining workflows for Admins, Departments, Work Leaders, and Workers.</p>
      </header>
      <main className="category-content">
        {renderCategoryContent()}
      </main>
      <footer className="footer">
        <p>&copy; 2025 DigitalCivic System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default ReimaginedHomePage;
