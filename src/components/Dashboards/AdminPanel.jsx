import React, { useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import VerifyStaff from '../LoginComponents/VerifyStaff';
import UserForm from './UserForm';
import ShowUser from './ShowUser';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  return (
    <Container className="mt-5">
      {!isVerified ? (
        <div className="text-center">
          <h2 className="mb-4 text-danger">High Security Admin Panel</h2>
          <VerifyStaff onValidated={() => setIsVerified(true)} requiredRole="Admin" />
        </div>
      ) : (
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h3>System Control: Admin Active</h3>
            <Button variant="danger" size="sm" onClick={() => setIsVerified(false)}>Logout</Button>
          </div>

          <div className="management-tools p-4 bg-white rounded shadow-sm border">
            {activeForm === null ? (
              <>
                <h5 className="mb-4">Quick Actions</h5>
                <div className="d-flex gap-3 mb-5">
                  <Button variant="primary" onClick={() => setActiveForm('SUPPLIER')}>Register Supplier</Button>
                  <Button variant="info" className="text-white" onClick={() => setActiveForm('DISTRIBUTOR')}>Register Distributor</Button>
                  <Button variant="success" onClick={() => setActiveForm('EMPLOYEE')}>Register Employee</Button>
                </div>
                <ShowUser />
              </>
            ) : (
              <UserForm roleType={activeForm} onCancel={() => setActiveForm(null)} />
            )}
          </div>
        </motion.div>
      )}
    </Container>
  );
};

export default AdminPanel;