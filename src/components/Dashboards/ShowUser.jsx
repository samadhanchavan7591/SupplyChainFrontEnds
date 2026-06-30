import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    role: '',
    password: ''
  });

  // Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/supply/usermanage/getAllUser");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete user
  const deleteUser = async (username) => {
    try {
      await axios.delete(`http://localhost:8080/supply/usermanage/deleteUser/${username}`);
      setUsers(users.filter(user => user.username !== username));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open modal for update
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setFormData(user); // pre-fill form with existing user data
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleUpdateSubmit = async () => {
    try {
      await axios.patch(`http://localhost:8080/supply/usermanage/updateUser/${selectedUser.username}`, formData);
      setUsers(users.map(u => u.username === selectedUser.username ? formData : u));
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Table striped bordered hover className="bg-white">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  onClick={() => handleUpdateClick(user)}
                >
                  Update
                </Button>{' '}
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => deleteUser(user.username)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Update User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                disabled // username should not be editable
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control 
                type="text" 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowUser;
