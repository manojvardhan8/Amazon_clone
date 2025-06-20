// src/components/CategoryCard.js
import React from 'react';
//import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CategoryCard = ({ category }) => {
  return (
    <div className="category-item-wrapper">
      <Link to={`/search/category/${category.name}`} className="category-card-link">
        <div className="category-card">
          <div className="category-image-wrapper">
              <img src={category.image} alt={category.name} className="category-image" />
          </div>
          <h6>{category.name}</h6>
        </div>
      </Link>
    </div>
  );
};
export default CategoryCard;