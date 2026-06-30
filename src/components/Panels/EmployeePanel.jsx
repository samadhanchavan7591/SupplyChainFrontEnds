import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Form, InputGroup, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddProductModal from '../Operation_On_Products/AddProductModal';


const EmployeePanel = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Agriculture");

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        const res = await axios.get("http://localhost:8080/supply/products/getAll");
        setProducts(res.data);
    };

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.length > 1) {
            const res = await axios.get(`http://localhost:8080/supply/products/search?query=${e.target.value}`);
            setProducts(res.data);
        } else {
            loadInventory();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Admin Alert: Are you sure you want to PERMANENTLY delete this product?")) {
            await axios.delete(`http://localhost:8080/supply/products/${id}`);
            toast.error("Product Deleted Successfully");
            loadInventory();
        }
    };

    const updateStatus = async (id, newStatus) => {
        await axios.put(`http://localhost:8080/supply/products/${id}/status?status=${newStatus}`);
        toast.success(`Status updated to ${newStatus}`);
        loadInventory();
    };

    return (
        <Container className="py-5">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="fw-bold text-dark">Inventory Control Center</h2>
                    <p className="text-muted">Manage stock, update prices, and track orders</p>
                </Col>
                <Col md={4}>
                    <InputGroup className="shadow-sm">
                        <InputGroup.Text className="bg-white border-end-0">🔍</InputGroup.Text>
                        <Form.Control 
                            placeholder="Search by ID or Name..." 
                            className="border-start-0"
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
                <Col md="auto">
                    <Button variant="primary" className="fw-bold px-4" onClick={() => setShowAddModal(true)}>
                        + Add Product
                    </Button>
                </Col>
            </Row>

            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                    <div className="d-flex gap-2">
                        {["Agriculture", "Electronics", "Fishing", "Raw Materials"].map(cat => (
                            <Button 
                                key={cat}
                                variant={selectedCategory === cat ? "dark" : "outline-secondary"}
                                size="sm"
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </Card.Header>
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="table-light text-uppercase small">
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock Status</th>
                            <th>Workflow Actions</th>
                            <th className="text-end">Danger Zone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.filter(p => p.category === selectedCategory).map(product => (
                            <tr key={product.productId}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img src={product.imageData} alt="img" className="rounded me-3" style={{width:'45px', height:'45px', objectFit:'cover'}} />
                                        <div>
                                            <div className="fw-bold">{product.name}</div>
                                            <div className="text-muted small">ID: {product.productId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><Badge bg="light" text="dark" className="border">{product.category}</Badge></td>
                                <td className="fw-bold text-primary">₹{product.price}</td>
                                <td>
                                    <Badge bg={product.status === 'Available' ? 'success' : 'warning'}>
                                        {product.status}
                                    </Badge>
                                </td>
                                <td>
                                    <Form.Select 
                                        size="sm" 
                                        className="w-auto"
                                        value={product.status}
                                        onChange={(e) => updateStatus(product.productId, e.target.value)}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Packed">Packed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </Form.Select>
                                </td>
                                <td className="text-end">
                                    <Button variant="link" className="text-danger p-0" onClick={() => handleDelete(product.productId)}>
                                        🗑️ Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            <AddProductModal 
                show={showAddModal} 
                handleClose={() => setShowAddModal(false)}
                sectionTitle={selectedCategory}
                onSave={loadInventory}
            />
        </Container>
    );
};

export default EmployeePanel;