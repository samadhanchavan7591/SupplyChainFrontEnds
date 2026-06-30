import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BagCheckFill, Truck, BoxSeam, HouseFill } from 'react-bootstrap-icons';

const UserPanel = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Retrieve the logged-in user's email
    const userEmail = localStorage.getItem("userEmail") || "Guest User";

    const fetchMyOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/supply/products/getAll");
            
            // Fix: Ensure res.data is an array before filtering
            const data = Array.isArray(res.data) ? res.data : [];
            
            // Logic: Show products that are NOT 'Available' (meaning someone bought them)
            // In a production app, you would filter by: p.buyerEmail === userEmail
            const filtered = data.filter(p => p.status && p.status !== "Available");
            
            setMyOrders(filtered);
            setError(null);
        } catch (err) {
            console.error("Error loading user panel data:", err);
            setError("Unable to connect to the Supply Chain server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Ordered': return <BagCheckFill className="text-info me-2" />;
            case 'Packed': return <BoxSeam className="text-warning me-2" />;
            case 'Shipped': return <Truck className="text-primary me-2" />;
            case 'Delivered': return <HouseFill className="text-success me-2" />;
            default: return null;
        }
    };

    const getBadgeVariant = (status) => {
        if (status === 'Delivered') return 'success';
        if (status === 'Shipped') return 'primary';
        if (status === 'Ordered') return 'info';
        return 'secondary';
    };

    return (
        <Container className="mt-5 pt-3">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="fw-bold">My Order Dashboard</h2>
                        <p className="text-muted">Tracking orders for: <strong>{userEmail}</strong></p>
                    </Col>
                </Row>

                {error && <Alert variant="danger">{error}</Alert>}

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="grow" variant="primary" />
                        <p className="mt-2">Synchronizing with Supply Chain...</p>
                    </div>
                ) : (
                    <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                        <Card.Body className="p-0">
                            <Table responsive hover className="mb-0 align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3">Product Details</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Tracking Status</th>
                                        <th className="pe-4">Product ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {myOrders.length > 0 ? myOrders.map((order, idx) => (
                                            <motion.tr 
                                                key={order.productId}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <td className="ps-4 py-3">
                                                    <div className="d-flex align-items-center">
                                                        <img 
                                                            src={order.imageData} 
                                                            alt="" 
                                                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                                            className="rounded me-3 shadow-sm"
                                                        />
                                                        <span className="fw-bold text-dark">{order.name}</span>
                                                    </div>
                                                </td>
                                                <td><Badge bg="light" text="dark" className="border">{order.category}</Badge></td>
                                                <td className="fw-bold text-success">₹{order.price}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {getStatusIcon(order.status)}
                                                        <Badge bg={getBadgeVariant(order.status)} pill>
                                                            {order.status}
                                                        </Badge>
                                                    </div>
                                                </td>
                                                <td className="pe-4 text-muted font-monospace small">{order.productId}</td>
                                            </motion.tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 text-muted">
                                                    <h5>No orders found.</h5>
                                                    <p>Items you purchase will appear here for tracking.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                )}
            </motion.div>
        </Container>
    );
};

export default UserPanel;