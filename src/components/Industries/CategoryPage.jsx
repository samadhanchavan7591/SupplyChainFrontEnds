import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';

const CategoryPage = () => {
    const { sectorName } = useParams(); // Gets 'agriculture', 'electronics', etc., from URL
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSectors = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:8080/supply/products/getAll");
                // Filter logic matching your Spring Boot 'category' field
                const filtered = res.data.filter(p => 
                    p.category.toLowerCase() === sectorName.toLowerCase()
                );
                setProducts(filtered);
            } catch (err) {
                console.error("Error fetching sector data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSectors();
    }, [sectorName]);

    return (
        <Container className="mt-5 pt-4">
            <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3"
            >
                <h2 className="text-uppercase fw-bold text-dark">
                    {sectorName} <span className="text-primary">Inventory</span>
                </h2>
                <Badge bg="primary" pill>{products.length} Items Available</Badge>
            </motion.div>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <Row>
                    {products.length > 0 ? products.map((item, idx) => (
                        <Col key={item.productId} xs={12} md={4} lg={3} className="mb-4">
                            <motion.div 
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="h-100 border-0 shadow-sm overflow-hidden custom-sector-card">
                                    <div className="img-hover-zoom">
                                        <Card.Img 
                                            variant="top" 
                                            src={item.imageData} 
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <Card.Body>
                                        <Card.Title className="fs-6 fw-bold">{item.name}</Card.Title>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <h5 className="text-success mb-0">₹{item.price}</h5>
                                            <Button 
                                                variant="warning" 
                                                size="sm" 
                                                className="fw-bold px-3 shadow-sm"
                                                onClick={() => navigate(`/buy/${item.productId}`)}
                                            >
                                                Buy Now
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    )) : (
                        <Col className="text-center py-5">
                            <h4 className="text-muted">No products found in this sector yet.</h4>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default CategoryPage;