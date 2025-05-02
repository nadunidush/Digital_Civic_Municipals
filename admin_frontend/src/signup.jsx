import React, { useState } from "react";
import "./LoginPage.css";

function SignupPage() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    // Input validations
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const newUser = {
      role: role,
      userName: email, // Email as the username
      password: password,
    };

    try {
      setIsLoading(true); // Set loading state
      const response = await fetch("http://localhost:8080/adminsignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      setIsLoading(false); // Reset loading state

      if (response.status === 200) {
        alert(data.message); // Success message
        // Optionally redirect to the login page
        window.location.href = "/login";
      } else {
        setErrorMessage(data.message); // Show error message from the server
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
        <h1 className="login-title">Create Your Account</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Role"
            className="login-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="login-footer">
          Already have an account? <a href="/login">Login here!</a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
