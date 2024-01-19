import React from 'react';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import About_full from './components/About_full';
import Main_page from './containers/Main_page';
import All_products from './containers/All_products';
import About_Product from './components/About_Product';
import Oformlenie from './components/Oformlenie';
import { CartProvider } from './containers/CartContext';
import Cart_Full from './components/Cart_Full';
import Help from './components/Help';
import E404 from './components/E404';

function App() {

  return (
      <div className="App">
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main_page />} />
            <Route path="/about" element={<About_full />} />
            <Route path="/all" element={<All_products />} />
            <Route path="/zakaz" element={<Oformlenie />} />
            <Route path="/product/:id" element={<About_Product isAboutProductPage={true} />} />
            <Route path="/cart" element={<Cart_Full />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contacts" element={<Footer />} />
            <Route path="*" element={<E404 />} />
          </Routes>
          <Footer />
        </CartProvider>
      </div>
  );
}

export default App;
