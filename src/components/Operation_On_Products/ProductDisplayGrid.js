import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartFill, Trash } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';

const ProductDisplayGrid = ({ categoryFilter, refreshTrigger }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/supply/products/getAll");
      const filtered = res.data.filter(p => p.category === categoryFilter);
      setProducts(filtered);
      toast.success("Products loaded successfully");
    } catch (err) {
      toast.error("Failed to load products from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, refreshTrigger]);

  const handleDelete = async (productId) => {
    if (window.confirm(`Are you sure you want to delete Product ID: ${productId}?`)) {
      try {
        await axios.delete(`http://localhost:8080/supply/products/${productId}`);
        toast.warn("Product deleted from database");
        fetchProducts();
      } catch (err) {
        toast.error("Error deleting product");
      }
    }
  };

  const handleBuy = async (product) => {
    try {
      await axios.put(`http://localhost:8080/supply/products/${product.productId}/status?status=Ordered`);
      toast.info(`${product.name} marked as Ordered`);
      fetchProducts();
    } catch (err) {
      toast.error("Error updating product status");
    }
  };

  if (loading) return <div className="text-center py-5">Loading Products...</div>;

  return (
    <Row>
      {products.length > 0 ? (
        products.map((item, index) => (
          <Col key={item.productId} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card 
                className="h-100 shadow-sm border-0"
                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <Card.Img 
                    variant="top" 
                    src={item.imageData} 
                    style={{ height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <Card.Title className="fs-6 mb-0 text-truncate" style={{maxWidth: '120px'}}>
                        {item.name}
                      </Card.Title>
                      <small className="text-muted">ID: {item.productId}</small>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Badge bg="secondary" className="fw-light">{item.category}</Badge>
                    </motion.div>
                  </div>
                  
                  <h5 className="text-success my-3">${item.price}</h5>
                  <p className="text-muted mb-2">Status: {item.status || "N/A"}</p>

                  <div className="d-flex gap-2">
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button 
                        variant="success" 
                        className="flex-grow-1 d-flex align-items-center justify-content-center"
                        onClick={() => handleBuy(item)}
                      >
                        <CartFill className="me-1" /> Buy
                      </Button>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button 
                        variant="outline-danger" 
                        onClick={() => handleDelete(item.productId)}
                      >
                        <Trash />
                      </Button>
                    </motion.div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))
      ) : (
        <Col className="text-center py-5">
          <p className="text-muted">No products available in {categoryFilter} section.</p>
        </Col>
      )}
    </Row>
  );
};

export default ProductDisplayGrid;
