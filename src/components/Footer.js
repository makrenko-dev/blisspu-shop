import React, { useEffect } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';


export default function Footer() {
  const { targetLanguage } = useLanguage();

  const textElements = [
    { className: 'text-42', originalText: '-це частинка нашої душі,яку ми готові подарувати вам' },
    { className: 'text-43', originalText: 'Головна' },
    { className: 'text-44', originalText: 'Каталог' },
    { className: 'text-45', originalText: 'Про нас' },
    { className: 'text-46', originalText: 'Допомога' },
    { className: 'text-47', originalText: 'Контакти' },
  ];

  useEffect(() => {
    const handleTranslate = async () => {
      try {
        for (const element of textElements) {
          // Find the text element using querySelector
          const textElement = document.querySelector(`.${element.className}`);

          // If the text element exists
          if (textElement) {
            // If target language is English ('en'), translate the original text
            if (targetLanguage === 'en') {
              const translatedText = await translateText(element.originalText, 'en');
              // Update the element with the translated text
              textElement.textContent = translatedText;
            } else {
              // If the target language is not English, use the original text
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

  const handleContactsClick = (event) => {
    event.preventDefault();
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id='footer' className='main-container4'>
      <div className='wrapper4'>
        <div className='section4'>
          <span className='text4'>BLISSPU</span>
          <span className='text-42'>
            -це частинка нашої душі,яку ми готові подарувати вам
          </span>
        </div>
        <div className='box4'>
          <div className='img4' />
          <div className='img-42' />
          <div className='pic4' />
          <div className='pic-42' />
        </div>
        <div className='section-42'>
          <Link to="/" className='text-43' style={{ textDecoration: 'none' }}>Головна</Link>
          <Link to="/all" className='text-44' style={{ textDecoration: 'none' }}>Каталог</Link>
          <Link to="/about" className='text-45' style={{ textDecoration: 'none' }}>Про нас</Link>
          <Link to="/help"  className='text-46' style={{ textDecoration: 'none' }}>Допомога</Link>
          <Link to="/contacts" className='text-47' style={{ textDecoration: 'none' }} onClick={handleContactsClick} >Контакти</Link>
        </div>
      </div>
    </div>
  );
}
