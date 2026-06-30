import React, { useState } from 'react';
import VerifyStaff from '../LoginComponents/VerifyStaff'; // Your existing verification logic
import { Container, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ProtectedPanel = ({ children, requiredRole, panelName }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [user, setUser] = useState(null);

    const handleSuccess = (userData) => {
        setUser(userData);
        setIsVerified(true);
    };

    return (
        <Container className="mt-5">
            {!isVerified ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="mb-4">
                        <h2 className="fw-bold text-dark">{panelName}</h2>
                        <Alert variant="info" className="d-inline-block px-4">
                            🔒 Restricted Area: {requiredRole} Authentication Required
                        </Alert>
                    </div>
                    {/* Reusing your VerifyStaff logic */}
                    <VerifyStaff onValidated={handleSuccess} requiredRole={requiredRole} />
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Header for the unlocked panel */}
                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                        <div>
                            <span className="text-muted small text-uppercase tracking-wider">Authenticated as {user.role}</span>
                            <h3 className="fw-bold">{panelName}</h3>
                        </div>
                        <Button variant="outline-danger" size="sm" onClick={() => setIsVerified(false)}>
                            Lock Panel
                        </Button>
                    </div>
                    
                    {/* This renders the actual Panel code (Admin, Employee, or Distributor) */}
                    {children}
                </motion.div>
            )}
        </Container>
    );
};

export default ProtectedPanel;