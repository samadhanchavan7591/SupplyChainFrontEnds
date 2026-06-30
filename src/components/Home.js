import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const navigate = useNavigate();

  // Define Category Emojis for better UI
  const categoryIcons = {
    "Agriculture": "🌱",
    "Electronics": "💻",
    "Fishing": "🐟",
    "Raw Materials": "🧱"
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/supply/products/getAll');
      const data = res.data;

      // Dynamically group products by category
      const groups = data.reduce((acc, product) => {
        const cat = product.category || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
        return acc;
      }, {});

      setGroupedProducts(groups);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleBuyNow = (productId) => {
    const userRole = localStorage.getItem("userRole");
    
    // Check if user is logged in as Customer
    if (!userRole) {
      alert("Please login to purchase products!");
      navigate('/login');
    } else if (userRole !== "customer") {
      alert("Only Customers can purchase items. Your role is: " + userRole);
    } else {
      navigate(`/buy-product/${productId}`);
    }
  };

  return (
    <div className="amazon-style-home bg-light pb-5">
      <Carousel fade interval={3000} className="shadow-sm">
  {/* 1. Global Logistics */}
  <Carousel.Item>
    <img className="d-block w-100 hero-img" 
         src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200" alt="Logistics" />
    <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4">
      <h2 className="fw-bold text-warning">Global Supply Chain Solutions</h2>
      <p>Seamless logistics and distribution management for your business.</p>
    </Carousel.Caption>
  </Carousel.Item>

  {/* 2. Agriculture */}
  <Carousel.Item>
    <img className="d-block w-100 hero-img" 
         src="https://images.unsplash.com/photo-1530260626688-048279320445?w=1200" alt="Agriculture" />
    <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4">
      <h2 className="fw-bold text-success">🌱 Agricultural Essentials</h2>
      <p>Premium quality seeds, fertilizers, and smart farming equipment.</p>
    </Carousel.Caption>
  </Carousel.Item>

  {/* 3. Electronics */}
  <Carousel.Item>
    <img className="d-block w-100 hero-img" 
         src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200" alt="Electronics" />
    <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4">
      <h2 className="fw-bold text-info">💻 Advanced Electronics</h2>
      <p>The latest industrial components and consumer tech at wholesale prices.</p>
    </Carousel.Caption>
  </Carousel.Item>

  {/* 4. Fishing */}
  <Carousel.Item>
    <img className="d-block w-100 hero-img" 
         src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200" alt="Fishing" />
    <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4">
      <h2 className="fw-bold text-primary">🐟 Professional Fishing Gear</h2>
      <p>High-end nets, rods, and maritime equipment for commercial fishing.</p>
    </Carousel.Caption>
  </Carousel.Item>

  {/* 5. Raw Materials */}
  <Carousel.Item>
    <img className="d-block w-100 hero-img" 
         src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200" alt="Raw Materials" />
    <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4">
      <h2 className="fw-bold" style={{color: '#cd7f32'}}>🧱 Quality Raw Materials</h2>
      <p>Supplying timber, steel, and construction minerals globally.</p>
    </Carousel.Caption>
  </Carousel.Item>

  {/* 6. Smart Warehousing */}
  <Carousel.Item>
  <img 
    className="d-block w-100 hero-img" 
    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&q=80" 
    alt="Smart Warehouse" 
  />
  <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-4">
    <h2 className="fw-bold text-warning">📦 Smart Inventory Control</h2>
    <p>Real-time tracking and automated warehousing for faster delivery.</p>
  </Carousel.Caption>
</Carousel.Item>
</Carousel>
      <Container className="mt-n5 position-relative" style={{ zIndex: 10 }}>
        {Object.keys(groupedProducts).map((category) => (
          <section key={category} className="category-section mb-5 p-4 bg-white rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
              <h4 className="section-title fw-bold">
                <span className="me-2">{categoryIcons[category] || "📦"}</span>
                {category}
              </h4>
              <Link to={`/category/${category}`} className="text-decoration-none fw-bold text-primary">
                Explore All &rarr;
              </Link>
            </div>
            
            <Row className="g-4">
              {groupedProducts[category].map((item) => (
                <Col key={item.productId} xs={12} sm={6} md={4} lg={3}>
                  <motion.div whileHover={{ y: -5 }}>
                    <ProductCard item={item} onBuyClick={() => handleBuyNow(item.productId)} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </section>
        ))}
      </Container>
    </div>
  );
};

const ProductCard = ({ item, onBuyClick }) => (
  <Card className="h-100 amazon-card border-0 shadow-sm transition-card">
    <div className="img-container p-3 text-center bg-light">
      <Card.Img 
        variant="top" 
        src={item.imageData || "https://via.placeholder.com/200"} 
        className="product-image rounded" 
      />
    </div>
    <Card.Body className="d-flex flex-column">
      <div className="mb-2">
        <Badge bg="secondary" className="fw-light">{item.category}</Badge>
      </div>
      <Card.Title className="fs-6 fw-bold mb-1">{item.name}</Card.Title>
      <small className="text-muted mb-3">ID: {item.productId}</small>
      <div className="mt-auto">
        <div className="price-tag fs-5 fw-bold text-dark mb-2">₹{item.price}</div>
        <Button 
          variant="warning" 
          className="w-100 fw-bold border-0" 
          onClick={onBuyClick}
          style={{ backgroundColor: '#ff9900', color: '#fff' }}
        >
          Buy Now
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default Home;