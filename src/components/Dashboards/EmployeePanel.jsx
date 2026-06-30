import React, { useState } from 'react';
import { Container, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import VerifyStaff from '../LoginComponents/VerifyStaff';
import ProductDisplayGrid from './ProductDisplayGrid'; // Your existing component
import AddProductModal from './AddProductModal'; // Your existing component
import { motion } from 'framer-motion';

const EmployeePanel = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Agriculture");

  return (
    <Container className="mt-5">
      {!isVerified ? (
        <div className="text-center">
          <h2 className="mb-4">Employee Inventory Portal</h2>
          <VerifyStaff onValidated={() => setIsVerified(true)} requiredRole="Employee" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h3>Inventory Management Dashboard</h3>
            <Button variant="success" onClick={() => setShowModal(true)}>+ Add New Product</Button>
          </div>

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4 custom-tabs">
            <Tab eventKey="Agriculture" title="🌱 Agriculture" />
            <Tab eventKey="Electronics" title="💻 Electronics" />
            <Tab eventKey="Fishing" title="🐟 Fishing" />
            <Tab eventKey="Raw Materials" title="🧱 Raw Materials" />
          </Tabs>

          {/* Grid handles Remove logic internally via its Delete button */}
          <ProductDisplayGrid categoryFilter={activeTab} />

          <AddProductModal 
            show={showModal} 
            handleClose={() => setShowModal(false)} 
            sectionTitle={activeTab}
            onSave={() => window.location.reload()} // Simple refresh
          />
        </motion.div>
      )}
    </Container>
  );
};

export default EmployeePanel;