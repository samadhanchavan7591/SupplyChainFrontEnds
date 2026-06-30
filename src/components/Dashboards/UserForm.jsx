import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserForm = ({ roleType, onCancel }) => {
    // State matching your Java Entity fields
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        password: '',
        role: roleType // Pre-set based on which button was clicked
    });

    const handleInput = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Sending the UserManagement object to the backend
            await axios.post("http://localhost:8080/supply/usermanage/addUser", userData);
            toast.success(`${roleType} Registered Successfully!`);
            onCancel(); // Return to dashboard
        } catch (err) {
            toast.error("Error: Username might already exist or server is down.");
        }
    };

    return (
        <Card className="p-4 shadow border-0 mt-3 animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-primary">Register New {roleType}</h4>
                <Button variant="outline-secondary" size="sm" onClick={onCancel}>Back</Button>
            </div>

            <Form onSubmit={handleSave}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" name="name" placeholder="Enter display name"
                                onChange={handleInput} required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username (ID)</Form.Label>
                            <Form.Control 
                                type="text" name="username" placeholder="Create unique ID"
                                onChange={handleInput} required 
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Temporary Password</Form.Label>
                    <Form.Control 
                        type="password" name="password" placeholder="Assign password"
                        onChange={handleInput} required 
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Assigned Role</Form.Label>
                    <Form.Control type="text" value={userData.role} readOnly className="bg-light" />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 py-2">
                    Save {roleType} to System
                </Button>
            </Form>
        </Card>
    );
};

export default UserForm;