import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

const VerifyStaff = ({ onValidated, requiredRole }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Call your login API
      const res = await axios.post("http://localhost:8080/supply/login", credentials);
      const user = res.data;

      if (user && user.role) {
        const userRole = user.role.toLowerCase();
        const targetRole = requiredRole.toLowerCase();

        // 2. Logic: Allow if Admin OR if the role matches the specific dashboard requirement
        if (userRole === "admin" || userRole === targetRole) {
          toast.success(`Access Granted: Welcome ${user.username}`);
          onValidated(user); // Pass user object back to CustomerPanel
        } else {
          toast.error(`Access Denied: ${user.role} role does not have ${requiredRole} privileges.`);
        }
      }
    } catch (err) {
      toast.error("Invalid Credentials or System Offline");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <Form className='login-form shadow p-4 bg-white rounded mx-auto border' style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <div className="text-center mb-4">
            <div style={{fontSize: '2rem'}}>🔐</div>
            <h3 className="fw-bold">{requiredRole} Access</h3>
        </div>
        <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">Username</Form.Label>
            <Form.Control 
              type='text' name='username' placeholder='Enter username' 
              onChange={handleChange} required
            />
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label className="small fw-bold">Password</Form.Label>
            <Form.Control 
              type='password' name='password' placeholder='Enter password' 
              onChange={handleChange} required
            />
        </Form.Group>
        <Button variant='primary' type='submit' className="w-100 py-2 fw-bold shadow-sm">
          Verify & Enter
        </Button>
      </Form>
    </motion.div>
  );
};

export default VerifyStaff;