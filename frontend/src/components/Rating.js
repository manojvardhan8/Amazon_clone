// src/components/Rating.js

import React from 'react';

const Rating = ({ value, text }) => {
  return (
    <div className="rating d-flex align-items-center">
      {/* Star 1 */}
      <span>
        <i
          style={{ color: '#FFA41C' }} // Amazon's star color
          className={
            value >= 1
              ? 'fas fa-star' // Full star
              : value >= 0.5
              ? 'fas fa-star-half-alt' // Half star
              : 'far fa-star' // Empty star
          }
        ></i>
      </span>

      {/* Star 2 */}
      <span>
        <i
          style={{ color: '#FFA41C' }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      {/* Star 3 */}
      <span>
        <i
          style={{ color: '#FFA41C' }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      {/* Star 4 */}
      <span>
        <i
          style={{ color: '#FFA41C' }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      {/* Star 5 */}
      <span>
        <i
          style={{ color: '#FFA41C' }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      {/* Optional review text */}
      {text && <span className="rating-text ms-2">{text}</span>}
    </div>
  );
};

export default Rating;