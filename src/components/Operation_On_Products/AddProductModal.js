import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AddProductModal = ({ show, handleClose, sectionTitle, onSave }) => {
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    price: '',
    category: sectionTitle,
    imageData: '',
    status: 'Available' // default status
  });

  // Update category automatically when switching sections
  useEffect(() => {
    setFormData(prev => ({ ...prev, category: sectionTitle }));
  }, [sectionTitle]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageData: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/supply/products", formData);
      toast.success(`${formData.name} added to ${sectionTitle}!`);
      onSave(formData); 
      setFormData({ productId: '', name: '', price: '', category: sectionTitle, imageData: '', status: 'Available' });
      handleClose();
    } catch(err) {
      toast.error("Error occurred while adding product");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {sectionTitle}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control 
                required 
                placeholder="e.g. P-101"
                value={formData.productId}
                onChange={(e) => setFormData({...formData, productId: e.target.value})} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                value={formData.category} 
                disabled 
                readOnly 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type="number" 
                required 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Available">Available</option>
                <option value="Ordered">Ordered</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" accept="image/*" required onChange={handleImageChange} />
              {formData.imageData && (
                <div className="mt-2 text-center">
                  <img src={formData.imageData} alt="Preview" style={{ maxHeight: '120px', borderRadius: '8px' }} />
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">Save Product</Button>
          </Modal.Footer>
        </Form>
      </motion.div>
    </Modal>
  );
};

export default AddProductModal;
