import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../components/Card.js';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Special.css';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';

function Special() {
  const [specialProducts, setSpecialProducts] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(3); // Default to 3 items per slide
  const { targetLanguage } = useLanguage();

  const textElements = [
    { className: 'text3', originalText: 'Спеціальні пропозиції' },
  ];

  useEffect(() => {
    const handleTranslate = async () => {
      try {
        for (const element of textElements) {
          const textElement = document.querySelector(`.${element.className}`);
          if (textElement) {
            if (targetLanguage === 'en') {
              const translatedText = await translateText(element.originalText, 'en');
              const capitalizedTranslatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
              textElement.textContent = capitalizedTranslatedText;
            } else {
              textElement.textContent = element.originalText;
            }
          }
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    };

    handleTranslate();
  }, [targetLanguage, textElements]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product/forclient');
        const data = await response.json();
        setSpecialProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredSpecialProducts = specialProducts.filter(product => product.discount !== 0);

  // Determine the number of items per slide based on screen width
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setItemsPerSlide(3);
      } else if (screenWidth >= 992) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(2);
      }
    };

    // Initial call to set the items per slide based on current screen width
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='main-container3'>
      <div className='group3'>
        <span className='text3'>Спеціальні пропозиції</span>
        <div className='pic3' />
      </div>
      <Carousel style={{ marginTop: '35px', marginBottom: '100px' }}>
        {[...Array(Math.ceil(filteredSpecialProducts.length / itemsPerSlide))].map((_, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <div className="sp">
              {filteredSpecialProducts.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((product, index) => (
                <Card key={index} {...product} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Special;


