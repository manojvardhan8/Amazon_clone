// frontend/src/screens/LoginScreen.js
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" disabled={isLoading}>Sign In</Button>
        </Form>
        <Row className="py-3">
          <Col>New Customer? <Link to="/register">Register</Link></Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;