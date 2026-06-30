import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // custom animation styles

const AnimatedSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    role: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.fullName || !formData.role) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/supply/usermanage/addUser", formData);
      toast.success("Account created successfully!");
      const role = res.data.role.toLowerCase();
      if (role === "admin") navigate("/admin");
      else if (role === "supplier") navigate("/supplier");
      else if (role === "distributor") navigate("/distributor");
      else navigate("/user");
    } catch (err) {
      toast.error("Signup failed. Try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="signup-card shadow-lg border-0 p-4 animate-fade-in">
            <h2 className="text-center mb-4 text-primary animate-slide-up">✨ Join Supply Chain ✨</h2>
            <Form onSubmit={handleSubmit} className="animate-form">
              
              <Form.Group className="mb-3 animate-input">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="fullName" 
                  placeholder="Enter your name" 
                  onChange={handleChange} 
                />
              </Form.Group>

              <Form.Group className="mb-3 animate-input">
                <Form.Label className="fw-bold">Username</Form.Label>
                <Form.Control 
                  type="text" 
                  name="username" 
                  placeholder="Create username" 
                  onChange={handleChange} 
                />
              </Form.Group>

              <Form.Group className="mb-3 animate-input">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  placeholder="Minimum 6 characters" 
                  onChange={handleChange} 
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4 animate-input">
                    <Form.Label className="fw-bold">User Role</Form.Label>
                    <Form.Select name="role" onChange={handleChange}>
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Customer">Customer</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-4 animate-input">
                    <Form.Label className="fw-bold">Business Field</Form.Label>
                    <Form.Select name="category" onChange={handleChange}>
                      <option value="">Select Category</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Automotive">Automotive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 fw-bold py-2 shadow animate-button"
              >
                🚀 Create Account
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnimatedSignUp;
