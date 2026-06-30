import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import VerifyStaff from '../LoginComponents/VerifyStaff';

const DistributorPanel = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/supply/products/getAll");
            // Filter only items that are in the delivery pipeline
            const pipeline = res.data.filter(p => ["Ordered", "Packed", "Shipped"].includes(p.status));
            setShipments(pipeline);
        } catch (err) {
            toast.error("Failed to fetch shipping queue");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (isVerified) fetchOrders(); }, [isVerified]);

    const updateProgress = async (productId, currentStatus) => {
        let nextStatus = "";
        if (currentStatus === "Ordered") nextStatus = "Packed";
        else if (currentStatus === "Packed") nextStatus = "Shipped";
        else if (currentStatus === "Shipped") nextStatus = "Delivered";

        try {
            await axios.put(`http://localhost:8080/supply/products/${productId}/status?status=${nextStatus}`);
            toast.success(`Package moved to ${nextStatus}`);
            fetchOrders();
        } catch (err) {
            toast.error("Status update failed");
        }
    };

    if (!isVerified) return (
        <Container className="mt-5 text-center">
            <VerifyStaff onValidated={() => setIsVerified(true)} requiredRole="Distributor" />
        </Container>
    );

    return (
        <Container className="mt-5">
            <h2 className="mb-4 fw-bold">🚚 Distribution & Logistics Queue</h2>
            <Row>
                {shipments.map((item) => (
                    <Col md={6} lg={4} key={item.productId} className="mb-3">
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <Card className="shadow-sm border-start border-4 border-info">
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <h6>ID: {item.productId}</h6>
                                        <Badge bg="warning" text="dark">{item.status}</Badge>
                                    </div>
                                    <h5 className="mt-2">{item.name}</h5>
                                    <p className="text-muted small">Category: {item.category}</p>
                                    <Button 
                                        variant="dark" 
                                        className="w-100 mt-2"
                                        onClick={() => updateProgress(item.productId, item.status)}
                                    >
                                        Mark as {item.status === "Ordered" ? "Packed" : item.status === "Packed" ? "Shipped" : "Delivered"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
                {shipments.length === 0 && !loading && <p className="text-center mt-5">No active shipments in queue.</p>}
            </Row>
        </Container>
    );
};

export default DistributorPanel;