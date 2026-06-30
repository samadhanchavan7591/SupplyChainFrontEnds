import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import VerifyStaff from '../LoginComponents/VerifyStaff';

const CustomerPanel = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [customerData, setCustomerData] = useState({ profile: {}, orders: [] });
    const [availableProducts, setAvailableProducts] = useState([]);
    const [currentUser, setCurrentUser] = useState("");

    const fetchData = async (username) => {
        try {
            // This calls your @GetMapping("/dashboard/{username}") in Spring Boot
            const res = await axios.get(`http://localhost:8080/supply/customer/dashboard/${username}`);
            setCustomerData(res.data);
            
            // Get products that are not yet assigned to any customer
            const allProds = await axios.get("http://localhost:8080/supply/products/getAll");
            setAvailableProducts(allProds.data.filter(p => !p.customerUsername));
            
            setIsVerified(true);
        } catch (err) {
            toast.error(err.response?.data || "Backend Authorization Failed");
            setIsVerified(false);
        }
    };

    const handleBuy = async (productId) => {
        try {
            // This calls your @PostMapping("/buy/{productId}/{username}")
            await axios.post(`http://localhost:8080/supply/customer/buy/${productId}/${currentUser}`);
            toast.success("Order Placed Successfully!");
            fetchData(currentUser); // Refresh tabs
        } catch (err) {
            toast.error("Purchase failed");
        }
    };

    const handleLogout = () => {
        setIsVerified(false);
        setCurrentUser("");
        toast.info("Panel Locked.");
    };

    if (!isVerified) return (
        <Container className="mt-5">
            <VerifyStaff 
                onValidated={(user) => {
                    setCurrentUser(user.username);
                    fetchData(user.username);
                }} 
                requiredRole="Customer" 
            />
        </Container>
    );

    return (
        <Container className="mt-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm border-start border-4 border-primary">
                    <div>
                        <h4 className="mb-0">Welcome, {customerData.profile.name}</h4>
                        <span className="text-muted small">Account Type: {customerData.profile.role}</span>
                    </div>
                    <Button variant="danger" size="sm" onClick={handleLogout}>🔒 Exit Dashboard</Button>
                </div>

                <Tabs defaultActiveKey="shop" className="mb-4">
                    <Tab eventKey="shop" title="🛒 Available Products">
                        <Row className="mt-3">
                            {availableProducts.map(product => (
                                <Col md={4} key={product.productId} className="mb-3">
                                    <Card className="h-100 border-0 shadow-sm">
                                        <Card.Body>
                                            <Badge bg="light" text="dark" className="mb-2 border">{product.category}</Badge>
                                            <h5>{product.name}</h5>
                                            <h4 className="text-primary">${product.price}</h4>
                                            <Button variant="dark" className="w-100 mt-2" onClick={() => handleBuy(product.productId)}>Buy Now</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tab>

                    <Tab eventKey="orders" title="📋 My Purchases">
                        <Table hover responsive className="bg-white mt-3 shadow-sm rounded">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerData.orders.map(order => (
                                    <tr key={order.productId}>
                                        <td>{order.name}</td>
                                        <td>{order.category}</td>
                                        <td>${order.price}</td>
                                        <td><Badge bg="success">{order.status}</Badge></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </motion.div>
        </Container>
    );
};

export default CustomerPanel;