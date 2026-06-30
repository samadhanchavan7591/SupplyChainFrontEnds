import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import OperationalNavbar from '../Operation_On_Products/OperationalNavbar';
import AddProductModal from '../Operation_On_Products/AddProductModal';
import ProductDisplayGrid from '../Operation_On_Products/ProductDisplayGrid';

const RawMaterial = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const sectionName = "Raw Material";

  // This function forces the grid to update when a new product is added
  const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <OperationalNavbar 
        sectionTitle={sectionName} 
        onAdd={() => setShowModal(true)} 
      />

      <Container>
        <h3 className="mb-4">Available {sectionName}s</h3>
        {/* Only this component is responsible for the cards */}
        <ProductDisplayGrid categoryFilter={sectionName} key={refreshTrigger} />
      </Container>

      <AddProductModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        onSave={handleRefresh} 
        sectionTitle={sectionName}
      />
    </div>
  );
};

export default RawMaterial;