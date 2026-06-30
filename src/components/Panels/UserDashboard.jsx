import React from 'react';
import { Container, Button } from 'react-bootstrap';

const UserDashboard = () => {
  return (
    <Container className="mt-5">
      <div className="user-dashboard-body animate-fade-in">
        <h3>Welcome to the Store</h3>
        <p>Browse products, add to cart, and place orders.</p>

        <div className="management-tools p-4 bg-light rounded shadow-sm">
          <Button variant="primary" className="me-3">View Products</Button>
          <Button variant="success" className="me-3">My Cart</Button>
          <Button variant="info">Order History</Button>
        </div>
      </div>
    </Container>
  );
};

export default UserDashboard;
