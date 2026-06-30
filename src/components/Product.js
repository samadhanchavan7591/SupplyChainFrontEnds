import React, { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import axios from 'axios';
import ProductDisplayGrid from './Operation_On_Products/ProductDisplayGrid';

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/supply/products/getAll");
        // Get unique categories from the list of all products
        const uniqueCategories = [...new Set(res.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Catalog...</div>;

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
      <div className="bg-dark text-white py-5 mb-5 text-center">
        <h1>Global Product Catalog</h1>
        <p>Explore all inventory across all supply chain departments</p>
      </div>

      <Container>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat} className="mb-5">
              {/* Category Header */}
              <div className="d-flex align-items-center mb-4 border-bottom pb-2">
                <h2 className="mb-0 me-3">{cat}</h2>
                <Badge bg="primary" pill>Section</Badge>
              </div>

              {/* We reuse the ProductDisplayGrid. 
                It will automatically filter products for this specific 'cat' 
              */}
              <ProductDisplayGrid categoryFilter={cat} />
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h3>No products found in the database.</h3>
            <p className="text-muted">Products added in Raw Material or other sections will appear here.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Product;