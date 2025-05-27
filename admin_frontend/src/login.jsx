import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const credentials = {
      userName: email, // Email as username
      password: password,
    };

    try {
      setIsLoading(true); // Set loading state
      const response = await fetch("http://localhost:8080/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

      const data = await response.json();
      setIsLoading(false); // Reset loading state

      if (response.status === 200) {
        alert(data.message); // Login successful
        localStorage.setItem("token", data.token); // Store JWT token in localStorage
        switch (data.role) {
          case "Admin":
              navigate("/allcomplaintadmin"); // Admin page
              break;
          case "Road Department":
              navigate("/allcomplaintdep", {
                  state: {
                      departmentName: data.department[0]?.departmentName || "",
                      complaints: data.department.flatMap((dept) => dept.complaintId) || [],
                  },
              });
              break;
          case "Waste Department":
              navigate("/allcomplaintdep", {
                  state: {
                      departmentName: data.department[0]?.departmentName || "",
                      complaints: data.department.flatMap((dept) => dept.complaintId) || [],
                  },
              });
              break;
          case "Lighting Of Street":
              navigate("/allcomplaintdep", {
                  state: {
                      departmentName: data.department[0]?.departmentName || "",
                      complaints: data.department.flatMap((dept) => dept.complaintId) || [],
                  },
              });
              break;
          case "Waste Team Leader":
              navigate("/allcomplaintleader", {
                  state: {
                    endDate: data.endDate || "No deadline provided",
                    departmentName: data.teamleader[0]?.departmentName || "",
                    complaints: data.teamleader?.flatMap((workLeader) => workLeader.complaintId) || [],
                  },
              });
              break;
          case "Road Team Leader":
            navigate("/allcomplaintleader", {
                state: {
                  endDate: data.endDate || "No deadline provided",
                  departmentName: data.teamleader[0]?.departmentName || "",
                  complaints: data.teamleader?.flatMap((workLeader) => workLeader.complaintId) || [],
                },
            });
            break;
          case "Lighting Team Leader":
            navigate("/allcomplaintleader", {
                state: {
                  endDate: data.endDate || "No deadline provided",
                  departmentName: data.teamleader[0]?.departmentName || "",
                  complaints: data.teamleader?.flatMap((workLeader) => workLeader.complaintId) || [],
                },
            });
            break;
          default:
              alert("Role not recognized.");
              break;
      }
      } else {
        setErrorMessage(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login to Your Account</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign up here!</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
