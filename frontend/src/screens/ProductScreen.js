// // frontend/src/screens/ProductScreen.js (New Version)
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import Rating from '../components/Rating';
// import { addToCart } from '../slices/cartSlice';
// import { useAddToCartMutation } from '../slices/cartApiSlice'; 

// const ProductScreen = () => {
//     const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
//   const { id: productId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [qty, setQty] = useState(1); // State for the quantity selector

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`/api/products/${productId}`);
//         setProduct(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Product not found or server error.');
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   const addToCartHandler = async () => {
//     console.log('--- Add to Cart button CLICKED ---');
//   console.log('Product ID to send:', productId);
//   console.log('Quantity to send:', qty);

//     try {
//       await addToCart({ productId, qty }).unwrap();
//       navigate('/cart');
//     } catch (err) {
//       alert(err?.data?.message || err.error);
//     }
//   };


//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
//   if (!product) return null;

//   return (
//     <>
//       <Link className="btn btn-light my-3" to="/">
//         Go Back
//       </Link>
//       <Row>
//         {/* Left Column: Image */}
//         <Col md={5}>
//           <Image src={product.image} alt={product.name} fluid />
//         </Col>

//         {/* Middle Column: Product Info */}
//         <Col md={4}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h3>{product.name}</h3>
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Rating value={product.rating} text={`${product.numReviews} reviews`} />
//             </ListGroup.Item>
//             <ListGroup.Item>
//               Price: ₹{product.price.toLocaleString('en-IN')}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               Description: {product.description}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>

//         {/* Right Column: Action Box */}
//         <Col md={3}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Price:</Col>
//                   <Col><strong>₹{product.price.toLocaleString('en-IN')}</strong></Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Status:</Col>
//                   <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
//                 </Row>
//               </ListGroup.Item>

//               {/* Quantity Selector - only show if product is in stock */}
//               {product.countInStock > 0 && (
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Qty</Col>
//                     <Col>
//                       <Form.Control
//                         as="select"
//                         value={qty}
//                         onChange={(e) => setQty(Number(e.target.value))}
//                       >
//                         {/* Create an array from 0 to countInStock-1 */}
//                         {[...Array(product.countInStock).keys()].map((x) => (
//                           <option key={x + 1} value={x + 1}>
//                             {x + 1}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//               )}

//               <ListGroup.Item>
//                 <Button
//                   className="btn-block"
//                   type="button"
//                   disabled={product.countInStock === 0 || isAddingToCart}
//                   onClick={addToCartHandler}
//                 >
//                   {isAddingToCart ? 'Adding...' : 'Add To Cart'}
//                 </Button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ProductScreen;

// frontend/src/screens/ProductScreen.js (Verified Version)

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Rating from '../components/Rating';
import { useAddToCartMutation } from '../slices/cartApiSlice'; // Make sure this is imported

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate(); // Make sure useNavigate is initialized
  const dispatch = useDispatch(); // We aren't using dispatch directly here anymore, but it's good practice to keep

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  // Initialize the RTK Query mutation hook
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found or server error.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // --- THE CORRECTED HANDLER ---
  const addToCartHandler = async () => {
    try {
      // This sends the request to the backend
      await addToCart({ productId, qty }).unwrap();
      // This line executes ONLY if the above await call succeeds
      navigate('/cart');
    } catch (err) {
      console.error("--- Add to Cart FAILED ---");
      console.error(err); // Log the entire error object
      alert(err?.data?.message || err.error);
    }
  };
  // --- END OF CORRECTION ---

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return null;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
      <Row>
        {/* ... The rest of your JSX for displaying the product ... */}
        {/* Ensure the button's onClick and disabled props are correct */}
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              {/* ... ListGroup.Items for price, status, etc. ... */}
              <ListGroup.Item>
                <Button
                  className="btn-block w-100"
                  type="button"
                  disabled={product.countInStock === 0 || isAddingToCart}
                  onClick={addToCartHandler}
                >
                  {isAddingToCart ? 'Adding...' : 'Add To Cart'}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;