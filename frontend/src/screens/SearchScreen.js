// frontend/src/screens/SearchScreen.js (Smart Version)

import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const SearchScreen = () => {
  // Get the main category from the URL path, e.g., "Men's Fashion"
  const { category: mainCategory } = useParams();

  // Get the sub-category from the URL query string, e.g., "?sub=Shirts"
  const [searchParams] = useSearchParams();
  const subCategory = searchParams.get('sub');

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const FASHION_CATEGORIES = ["Men's Fashion", "Women's Fashion"];
  const isFashionCategory = FASHION_CATEGORIES.includes(mainCategory);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Step 1: Fetch sub-categories if it's a main fashion category
        if (isFashionCategory) {
          const { data: subCatData } = await axios.get(`/api/products/subcategories/${mainCategory}`);
          setSubCategories(subCatData);
        } else {
          setSubCategories([]); // Clear sub-categories for generic pages
        }

        // Step 2: Fetch products based on filters
        let productUrl = `/api/products?category=${mainCategory}`;
        if (subCategory) {
          // If a sub-category is selected, add it to the query
          productUrl += `&subCategory=${subCategory}`;
        }
        const { data: productData } = await axios.get(productUrl);
        setProducts(productData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    // This effect runs whenever the main category or sub-category changes
  }, [mainCategory, subCategory, isFashionCategory]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Back to All Categories
      </Link>
      <Row>
        {/* Sidebar for Sub-categories */}
        {isFashionCategory && subCategories.length > 0 && (
          <Col md={3}>
            <h3>{mainCategory}</h3>
            <ListGroup>
              {/* Link to view all products in the main category */}
              <ListGroup.Item action as={Link} to={`/search/category/${mainCategory}`} active={!subCategory}>
                All
              </ListGroup.Item>
              {/* Links for each sub-category */}
              {subCategories.map((sc) => (
                <ListGroup.Item key={sc} action as={Link} to={`/search/category/${mainCategory}?sub=${sc}`} active={subCategory === sc}>
                  {sc}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        )}

        {/* Main Content Area for Products */}
        <Col md={isFashionCategory ? 9 : 12}>
          <h2>{subCategory ? `${mainCategory} - ${subCategory}` : mainCategory}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Row>
              {products.length === 0 ? (
                  <p>No products found.</p>
              ) : (
                products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
                    <Product product={product} />
                  </Col>
                ))
              )}
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SearchScreen;