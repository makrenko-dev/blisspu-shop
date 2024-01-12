import React, { useEffect } from 'react';
import { useState } from 'react';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { useCart } from '../containers/CartContext';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
import  './Navbar.css';
import img from '../assets/images/cart.png';

export default function Navbar() {
  const { isCartOpen, toggleCart, updateCart } = useCart();
  const { handleLanguageChange } = useLanguage();
  const { targetLanguage } = useLanguage();
   const [textColor, setTextColor] = useState('black');

  const textElements = [
    { className: 'text-5', originalText: 'Головна' },
    { className: 'text-2', originalText: 'Каталог' },
    { className: 'text-6', originalText: 'Про нас' },
    { className: 'text-4', originalText: 'Допомога' },
    { className: 'text-3', originalText: 'Контакти' },
  ];

  useEffect(() => {
  const handleTranslate = async () => {
    try {
      const translationPromises = textElements.map(async (element) => {
        const textElement = document.querySelector(`.${element.className}`);

        if (textElement) {
          let translatedTextResult = element.originalText;

          if (targetLanguage === 'en') {
            translatedTextResult = await translateText(element.originalText, 'en');
          }

          return { textElement, translatedTextResult };
        }

        return null;
      });

      const translations = await Promise.all(translationPromises);

      translations
        .filter((translation) => translation !== null)
        .forEach(({ textElement, translatedTextResult }) => {
          textElement.textContent = translatedTextResult;
        });
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  handleTranslate();
}, [targetLanguage, textElements]);
  

  const handleCartClick = () => {
    toggleCart();
  };

  const handleCartClose = () => {
    toggleCart();
  };

  const handleContactsClick = (event) => {
    event.preventDefault();
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

   return (
    <BootstrapNavbar expand="lg" variant="dark" style={{ background: 'rgb(105, 79, 66)' }} className="justify-content-between " >
      <BootstrapNavbar.Brand>
        <Link to="/" style={{ textDecoration: 'none', marginLeft: '80px' }}>
          <span className='text'>BLISSPU</span>
        </Link>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav" style={{ marginLeft: '5vw' }}>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" style={{ textDecoration: 'none' }}>
            <span className='text-5'>Головна</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/all" style={{ textDecoration: 'none' }}>
            <span className='text-2'>Каталог</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/about" style={{ textDecoration: 'none' }}>
            <span className='text-6'>Про нас</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/help" style={{ textDecoration: 'none' }}>
            <span className='text-4'>Допомога</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/contacts" onClick={handleContactsClick} style={{ textDecoration: 'none' }}>
            <span className='text-3'>Контакти</span>
          </Nav.Link>
            <Nav className="ml-auto language-links">
              <Nav.Link style={{ cursor: 'pointer' }} onClick={() => handleLanguageChange('en')}>
              {targetLanguage === 'en'
              ? <span style={{color:'white'}}className='text-7'>En</span>
              : <span style={{color:'silver'}}className='text-7'>En</span>
              }
              </Nav.Link>
              <Nav.Link>
                <span className='text-5'>|</span>
              </Nav.Link>
              <Nav.Link style={{ cursor: 'pointer' }} onClick={() => handleLanguageChange('uk')}>
              {targetLanguage === 'uk'
              ? <span style={{color:'white'}}className='text-8'>Uk</span>
              : <span style={{color:'silver'}}className='text-8'>Uk</span>
              }
              </Nav.Link>
           </Nav>
            <Nav.Link style={{ cursor: 'pointer' }} onClick={handleCartClick}>
            <span className='img' style={{ cursor: 'pointer' }}> {/* Your cart icon here */}</span>
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
      <Offcanvas show={isCartOpen} onHide={handleCartClose} placement="end">
        <Cart handleClose={handleCartClose} updateCart={updateCart} />
      </Offcanvas>
    </BootstrapNavbar>
  );
}
