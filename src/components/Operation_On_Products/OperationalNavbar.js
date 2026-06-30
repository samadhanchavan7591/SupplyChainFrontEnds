import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { PlusCircle, Trash } from 'react-bootstrap-icons';

const OperationalNavbar = ({ sectionTitle, onAdd, onClear }) => {
  return (
    <Navbar bg="white" expand="lg" className="mb-4 border-bottom shadow-sm sticky-top">
      <Container>
        <Navbar.Brand className="fw-bold text-primary">
          {sectionTitle} <span className="text-dark">Portal</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="success" className="me-2 d-flex align-items-center" onClick={onAdd}>
            <PlusCircle className="me-2" /> Add {sectionTitle}
          </Button>
          <Button variant="outline-danger" className="d-flex align-items-center" onClick={onClear}>
            <Trash className="me-2" /> Clear All
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default OperationalNavbar;