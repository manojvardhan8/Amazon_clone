// // src/components/Product.js
// import React from 'react';
// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Product = ({ product }) => {
//   return (
//     <Card className="my-3 p-3 rounded">
//       {/* We use a regular Link here since Card.Img doesn't have an 'as' prop */}
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image} variant="top" />
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
//           <Card.Title as="div">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>

//         <Card.Text as="h3">${product.price}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Product;
// frontend/src/components/Product.js (New Amazon Style)
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Rating from './Rating'; // We already have this component

// A small reusable component for color swatches
const ColorSwatches = ({ colors }) => {
    const MAX_SWATCHES = 6;
    const displayedColors = colors.slice(0, MAX_SWATCHES);
    const remainingColors = colors.length - MAX_SWATCHES;

    return (
        <div className="product-colors">
        {displayedColors.map((color, index) => (
            <div key={index} className="color-swatch" style={{ backgroundColor: color }}></div>
        ))}
        {remainingColors > 0 && <span className='color-swatch-more'>+{remainingColors}</span>}
        </div>
    );
};

const Product = ({ product }) => {
  // Helper to calculate discount
  const discountPercent = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <div className="product-card-amazon">
      {product.isBestSeller && <div className="bestseller-tag">Best seller</div>}
      
      <Link to={`/product/${product._id}`}>
        <div className="product-image-container">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>
      
      <div className="product-card-body">
        {product.colors && product.colors.length > 0 && <ColorSwatches colors={product.colors} />}
        
        <div className="product-brand">{product.brand}</div>

        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <div className="product-name">{product.name}</div>
        </Link>

        <div className="product-rating">
          <Rating 
            value={product.rating} 
            ext={product.numReviews.toLocaleString('en-IN')} 
          />
        </div>

        {product.boughtInPastMonth > 0 && 
            <div className="bought-in-past-month">
                {product.boughtInPastMonth.toLocaleString('en-IN')}+ bought in past month
            </div>
        }

        <div className="price-section">
            <span className="current-price">
                ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp && (
                <>
                <span className="mrp-price">M.R.P: ₹{product.mrp.toLocaleString('en-IN')}</span>
                <span className="discount">({discountPercent}% off)</span>
                </>
            )}
        </div>

        {product.isLimitedTimeDeal && <div className="limited-deal-tag">Limited time deal</div>}

        <div className="delivery-info">
            <span className="prime-logo">✓prime</span> FREE delivery <strong>Mon, 23 Jun</strong>
        </div>

        <Button className="add-to-cart-btn mt-3">Add to cart</Button>
      </div>
    </div>
  );
};

export default Product;