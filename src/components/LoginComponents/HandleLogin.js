import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './HandleLogin.css';

const HandleLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/supply/login", credentials);
      const user = res.data;

      if (user && user.role) {
        // Normalize role to lowercase for consistent matching
        const role = user.role.toLowerCase();
        
        // Store user data for use in the dashboards
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", user.username);

        // Role-based navigation logic
        switch (role) {
          case "admin":
            toast.success("Welcome, Admin!");
            navigate("/admin");
            break;
          case "supplier":
            toast.success("Welcome, Supplier!");
            navigate("/supplier");
            break;
          case "distributor":
            toast.success("Welcome, Distributor!");
            navigate("/distributor");
            break;
          case "customer": // Added for your Customer Dashboard
            toast.success("Welcome, Customer!");
            navigate("/customer");
            break;
          case "employee": // Added for your Employee Dashboard
            toast.success("Welcome, Employee!");
            navigate("/employee");
            break;
          default:
            toast.error("Access Denied: Role not recognized");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Login Failed: Invalid credentials or Server error");
    }
  };

  return (
    <div className="login-container">
      <form className='login-form shadow p-4 bg-white rounded' onSubmit={handleSubmit}>
        <h2 className="text-center mb-4 fw-bold">Supply Chain Portal</h2>
        
        <div className='input-group-custom'>
          <input 
            type='text' name='username' placeholder='Username' 
            className="form-control mb-3" onChange={handleChange} required
          />
          <input 
            type='password' name='password' placeholder='Password' 
            className="form-control mb-4" onChange={handleChange} required
          />
        </div>

        <div className="d-grid gap-2">
          <Button variant='dark' type='submit' className="fw-bold">Login</Button>
          <div className="text-center mt-3">
             <small>Don't have an account? <Link to="/signup">SignUp</Link></small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HandleLogin;