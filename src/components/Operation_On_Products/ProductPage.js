import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import AddProductModal from './AddProductModal';
import OperationalNavbar from './OperationalNavbar';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const sectionName = "Raw Material"; // You can change this for different pages

  const handleSave = (newProduct) => {
    setProducts([newProduct, ...products]); // Adds new product to the start of the list
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <OperationalNavbar 
        sectionTitle={sectionName} 
        onAdd={() => setShowModal(true)} 
        onClear={() => setProducts([])}
      />

      <Container>
        <Row>
          {products.length > 0 ? (
            products.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <Card.Img 
                      variant="top" 
                      src={item.image} 
                      style={{ height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="fs-6 mb-0 text-truncate">{item.name}</Card.Title>
                      <Badge bg="secondary" className="fw-light">{sectionName}</Badge>
                    </div>
                    <h5 className="text-success mb-0">RS{item.price}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <p className="text-muted">No products added yet. Click the green button above!</p>
            </Col>
          )}
        </Row>
      </Container>

      <AddProductModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        onSave={handleSave}
        sectionTitle={sectionName}
      />
    </div>
  );
};

export default ProductPage;