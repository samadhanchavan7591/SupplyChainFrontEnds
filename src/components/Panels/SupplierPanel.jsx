import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

const SupplierPanel = () => {
  const [isVerified, setIsVerified] = useState(true);

  return (
    <Container className="mt-5">
      {isVerified ? (
        <div className="supplier-dashboard-body animate-fade-in">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h3>Supplier Dashboard</h3>
            <Button variant="outline-danger" size="sm" onClick={() => setIsVerified(false)}>
              Lock Panel
            </Button>
          </div>

          <div className="management-tools p-4 bg-light rounded shadow-sm">
            <h4>Supply Management</h4>
            <Button variant="success" className="me-3">Add Products</Button>
            <Button variant="warning" className="me-3">Track Shipments</Button>
            <Button variant="info">View Inventory</Button>
          </div>
        </div>
      ) : (
        <p>Login required to access Supplier features.</p>
      )}
    </Container>
  );
};

export default SupplierPanel;
