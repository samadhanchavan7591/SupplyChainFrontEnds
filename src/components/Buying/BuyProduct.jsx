import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';

const BuyProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [address, setAddress] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/supply/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleOrder = async (e) => {
        e.preventDefault();
        try {
            const orderPayload = {
                productId: id,
                address: address,
                status: "Ordered"
            };
            // Calling your process endpoint
            await axios.post('http://localhost:8080/supply/payments/process', orderPayload);
            alert("Success! Your order for " + product.name + " has been placed.");
            navigate('/');
        } catch (err) {
            alert("Error placing order.");
        }
    };

    if (!product) return <div className="text-center mt-5 p-5">Loading Order Details...</div>;

    return (
        <Container className="mt-5 py-5">
            <Row className="g-4">
                <Col lg={7}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card className="border-0 shadow-sm p-4">
                            <Row>
                                <Col md={5}>
                                    <Card.Img src={product.imageData} className="rounded shadow" />
                                </Col>
                                <Col md={7}>
                                    <small className="text-primary text-uppercase">{product.category}</small>
                                    <h2 className="fw-bold">{product.name}</h2>
                                    <h3 className="text-success mt-3">Total: ₹{product.price}</h3>
                                    <hr />
                                    <p className="text-muted">Supply Chain ID: {product.productId}</p>
                                </Col>
                            </Row>
                        </Card>
                    </motion.div>
                </Col>
                <Col lg={5}>
                    <Card className="border-0 shadow p-4 bg-light">
                        <h4 className="mb-4">Shipping Details</h4>
                        <Form onSubmit={handleOrder}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Delivery Address</Form.Label>
                                <Form.Control 
                                    as="textarea" rows={4} required 
                                    placeholder="Enter full address with Landmark"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100 py-3 fw-bold">
                                PLACE ORDER NOW
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BuyProduct;