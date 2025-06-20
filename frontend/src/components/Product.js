// src/components/Product.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      {/* We use a regular Link here since Card.Img doesn't have an 'as' prop */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;