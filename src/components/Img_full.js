import React, { useEffect } from 'react';
import './Img_full.css';
import { Link } from 'react-router-dom';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';

export default function Img_full() {
  const { targetLanguage } = useLanguage();

  const textElements = [
    { className: 'text-12', originalText: 'Запрошуємо вас завітати до нашого чарівного світу і обрати той аромат, який стане вашим особливим супутником!' },
    { className: 'text-13', originalText: 'Перейти до каталогу' },
    // Добавьте другие элементы, как необходимо
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

  return (
    <div className='main-container1'>
      <div className='group1'>
        <span className='text1'>BLISSPU</span>
        <span className='text-12'>
          Запрошуємо вас завітати до нашого чарівного світу і обрати той аромат, який стане вашим особливим супутником!
        </span>
        <button className='section1'>
          <Link to="/all" className='text-13' style={{ textDecoration: 'none' }}>
            Перейти до каталогу
          </Link>
          <div className='img1' />
        </button>
      </div>
    </div>
  );
}
