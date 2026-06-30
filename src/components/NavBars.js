import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBars.css';

const NavBars = () => {
  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm sticky-top">
      <Container fluid>
        {/* BRAND */}
        <Navbar.Brand as={Link} to="/" className="brand-left fw-bold">
          <span className="brand-icon">📦</span> SUPPLY CHAIN
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto align-items-center">
            {/* 1. PRIMARY LINKS */}
            <Nav.Link as={Link} to="/" className="menu-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/product" className="menu-link">Products</Nav.Link>

           {/* SECTORS DROPDOWN */}
<NavDropdown title="Sectors" id="sectors-dropdown" className="menu-link-dropdown">
  <NavDropdown.Item as={Link} to="/sector/agriculture">🌱 Agriculture</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/sector/electronics">💻 Electronics</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/sector/fishing">🐟 Fishing</NavDropdown.Item>
  <NavDropdown.Item as={Link} to="/sector/raw-material">🧱 Raw Materials</NavDropdown.Item>
</NavDropdown>

            {/* 3. CHAIN NODES DROPDOWN */}
            <NavDropdown title="Chain Nodes" id="nodes-dropdown" className="menu-link-dropdown">
              <NavDropdown.Item as={Link} to="/supplier">Supplier</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/factory">Factory</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/distribution">Distribution</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/retail">Retail</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/customer">Customer</NavDropdown.Item>
            </NavDropdown>

            {/* 4. CONTROL PANELS DROPDOWN */}
            <NavDropdown title="Control Panels" id="control-dropdown" className="menu-link-dropdown">
  {/* Admin: User & Entity Management */}
  <NavDropdown.Item as={Link} to="/admin">
        🛡️ Admin Dashboard
    </NavDropdown.Item>

    {/* Employee: Add/Remove Products */}
    <NavDropdown.Item as={Link} to="/employee-panel">
        👷 Employee Portal
    </NavDropdown.Item>

    <NavDropdown.Divider />

    {/* Distributor: Logistics & Shipping */}
    <NavDropdown.Item as={Link} to="/distributor-panel">
        🚚 Logistics (Distributor)
    </NavDropdown.Item>

    {/* User: Track Orders & History */}
    <NavDropdown.Item as={Link} to="/user-panel">
        👤 My Orders (User)
    </NavDropdown.Item>
  
  <NavDropdown.Divider />
  <NavDropdown.Item as={Link} to="/query">❓ System Query</NavDropdown.Item>
</NavDropdown>
          </Nav>

          {/* SEARCH & LOGIN */}
          <Form className="d-flex align-items-center gap-2">
            <input type="text" placeholder="Search..." className="search-input-box" />
            <Button variant="outline-primary" as={Link} to="/login" className="login-btn-custom">
              Login
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBars;