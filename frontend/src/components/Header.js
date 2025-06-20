// frontend/src/components/Header.js (Corrected and Explained)

import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice'; // Import the logout action

const Header = () => {
  // Get the user's info from the global Redux state
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      // Dispatch the logout action from our authSlice.
      // This will set userInfo to null in the Redux state and remove it from local storage.
      dispatch(logout());
      // Redirect the user to the login page after they log out.
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            AmazonClone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>

              {/* === THIS IS THE KEY LOGIC === */}
              { userInfo ? (
                // If userInfo exists (user is logged in), show the dropdown menu.
                <NavDropdown title={`Hi, ${userInfo.name}`} id='username'>

                  {/*
                    CORRECTED LINE:
                    We use NavDropdown.Item, which is meant to be inside a dropdown.
                    We then use the 'as={Link}' prop to make it behave like a router link.
                  */}
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>

                </NavDropdown>
              ) : (
                // If userInfo is null (user is not logged in), show the "Sign In" link.
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;