import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const DistributorPanel = () => {
  const [isVerified, setIsVerified] = useState(true); // assume verified after login

  return (
    <Container className="mt-5">
      {isVerified ? (
        <div className="distributor-dashboard-body animate-fade-in">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h3>Distributor Dashboard</h3>
            <Button variant="outline-danger" size="sm" onClick={() => setIsVerified(false)}>
              Lock Panel
            </Button>
          </div>

          <div className="management-tools p-4 bg-light rounded shadow-sm">
            <h4>Distribution Management</h4>
            <Button variant="primary" className="me-3">Manage Stock</Button>
            <Button variant="info" className="me-3">View Orders</Button>
            <Button variant="success">Track Deliveries</Button>
          </div>
        </div>
      ) : (
        <p>Login required to access Distributor features.</p>
      )}
    </Container>
  );
};

export default DistributorPanel;
