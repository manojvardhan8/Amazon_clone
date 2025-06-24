// src/screens/HomeScreen.js (Dynamic Version)

import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Import axios

import Product from '../components/Product'; // We will create this component next
import { Row, Col, Container, Button } from 'react-bootstrap';
//import categories from '../categories'; // Import our static data
import CategoryCard from '../components/CategoryCard'; // Import our new component



const fashionCategories = [
    { name: "Men's Fashion", image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Women's Fashion", image: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Kids' Fashion", image: "https://images.pexels.com/photos/1619779/pexels-photo-1619779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Footwear", image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Luggage & Bags", image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Jewellery", image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Watches", image: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Beauty", image: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Handbags", image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Sunglasses", image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];


// Reusable Category Card Component



const HomeScreen = () => {
  // useState is a hook to create a state variable within a functional component.
  // 'products' will hold our data. 'setProducts' is the function to update it.
  const [products, setProducts] = useState([]);

  // useEffect is a hook that runs a piece of code based on a dependency array.
  // If the dependency array is empty [], it runs ONCE when the component first loads.
  useEffect(() => {
    const fetchProducts = async () => {
      // Make a GET request to our backend API endpoint for products.
      // Because of the proxy we set up, '/api/products' will correctly go to 'http://localhost:5000/api/products'.
      const { data } = await fetch('/api/products');
      console.log("Products:",products);
      setProducts(data); // Update our state with the data from the API
    };

    fetchProducts(); // Call the function
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="m-0">Amazon Fashion</h1>
        <div className="d-none d-md-flex">
          <a href="#" className="nav-link px-3">Women</a>
          <a href="#" className="nav-link px-3">Men</a>
          <a href="#" className="nav-link px-3">Kids</a>
          <a href="#" className="nav-link px-3">Bags & Luggage</a>
          <a href="#" className="nav-link px-3">Sportswear</a>
          <a href="#" className="nav-link px-3">Sales & Deals</a>
        </div>
      </div>

      {/* Category Bubbles Section */}
      <div className="category-row-container">
        {fashionCategories.map((cat) => (
          <CategoryCard key={cat.name} category={cat} />
        ))}
      </div>

      <hr className="my-5" />

      {/* You can add your posters/banners below here */}
      <h2>Featured Deals</h2>
      <img 
        src="https://placehold.co/1200x400/FDBA74/431407?text=Huge+Sale+Poster!" 
        alt="Promotional Banner"
        className="img-fluid w-100 my-4 rounded"
      />

      {/* Promotional Banner */}
      <div className="promo-banner">
        <Container>
            <Row className="align-items-center">
                <Col md={8} className="text-md-start">
                    <h1>Get Up To 20% Cashback*</h1>
                    <h1>+ Free Delivery*</h1>
                </Col>
                <Col md={4}>
                    <Button className="btn-order">On First Order</Button>
                </Col>
            </Row>
             <p className="tnc">*T&C Apply</p>
        </Container>
      </div>

      {/* Additional Content/Image Section */}
      <img 
        src="https://placehold.co/1200x400/CCCCCC/FFFFFF?text=Awesome+Deals+Here!" 
        alt="Promotional" 
        className="img-fluid w-100 my-4"
      />


      <h1>Latest Products</h1>
      <Row>
        {/* We map over the 'products' state variable */}
        {products && products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;