// // src/App.js (The Final, Working Version)

// import React,{useEffect} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
// import Header from './components/Header'; // <-- ADD THIS
// import Footer from './components/Footer';
// import HomeScreen from './screens/Homescreen';
// import LoginScreen from './screens/loginScreen';
// import RegisterScreen from './screens/registerScreen';
// import SearchScreen from './screens/SearchScreen';

// import CartScreen from './screens/CartScreen';
// import { useGetCartQuery } from './slices/cartApiSlice';
// import { setCartItems } from './slices/cartSlice';
// import { useDispatch, useSelector } from 'react-redux';



// function App() {
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);

//   // Fetch cart data when user logs in
//   const { data: cart, isLoading } = useGetCartQuery(undefined, {
//     skip: !userInfo, // Skip fetching if user is not logged in
//   });

//   useEffect(() => {
//     if (!isLoading && cart) {
//       dispatch(setCartItems(cart));
//     }
//   }, [cart, isLoading, dispatch]);

//   return (
//     <Router>
//       {/* Replace the test nav with our real Header */}
//       <Header />

//       <main className="py-3">
//         <Container>
//           <Routes>
//             <Route path="/" element={<HomeScreen />} />

//             <Route path="/search/category/:category" element={<SearchScreen />} />
//             <Route path="/login" element={<LoginScreen />} /> {/* ADD THIS */}
//             <Route path="/register" element={<RegisterScreen />} /> {/* ADD THIS */}
//             <Route path='/cart' element={<CartScreen />} />
//             <Route path="/" element={<HomeScreen />} />
//           </Routes>
//         </Container>
//       </main>
      
//       <Footer />
//     </Router>
//   );
// }
// //import RegisterScreen from './screens/RegisterScreen';
// export default App;

// frontend/src/App.js (More Robust Version)

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import CartScreen from './screens/CartScreen';

import { useGetCartQuery } from './slices/cartApiSlice';
import { setCartItems } from './slices/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // We now pass the userInfo object itself as a parameter to the query.
  // The query will only run if userInfo is not null.
  const { data: cart, isError, error, isSuccess } = useGetCartQuery(null, {
    skip: !userInfo,
  });

  // This useEffect is now more specific. It only runs when the query is successful.
  useEffect(() => {
    if (isSuccess && cart) {
      dispatch(setCartItems(cart));
    }
  }, [cart, isSuccess, dispatch]);

  // --- NEW DEBUGGING useEffect ---
  // This will log the REAL error if the query fails for any reason.
  useEffect(() => {
    if (isError) {
      console.error("--- RTK Query GetCart Error ---");
      console.error(error);
    }
  }, [isError, error]);
  // --- END DEBUGGING ---


  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/search/category/:category" element={<SearchScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;