// frontend/src/screens/CartScreen.js

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// We will need these later for quantity changes and removal
// import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  // Calculate totals
  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0);

  const checkoutHandler = () => {
    // Navigate to shipping page (we'll build this next)
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty <Link to='/'>Go Back</Link></p>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.product.image} alt={item.product.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.product.price.toLocaleString('en-IN')}</Col>
                  <Col md={2}>
                    {/* We will add a quantity selector here later */}
                    Qty: {item.qty}
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light'>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({itemsCount}) items
              </h2>
              <h4 style={{ fontWeight: 'bold' }}>
                Total: ₹{subtotal.toLocaleString('en-IN')}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block w-100'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;