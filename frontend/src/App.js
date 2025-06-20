// src/App.js (The Final, Working Version)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header'; // <-- ADD THIS
import Footer from './components/Footer';
import HomeScreen from './screens/Homescreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import SearchScreen from './screens/SearchScreen';



function App() {
  return (
    <Router>
      {/* Replace the test nav with our real Header */}
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />

            <Route path="/search/category/:category" element={<SearchScreen />} />
            <Route path="/login" element={<LoginScreen />} /> {/* ADD THIS */}
            <Route path="/register" element={<RegisterScreen />} /> {/* ADD THIS */}

            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      
      <Footer />
    </Router>
  );
}
//import RegisterScreen from './screens/RegisterScreen';
export default App;