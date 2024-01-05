import React, { useEffect, useState } from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';

export default function Main() {
  const { targetLanguage } = useLanguage();

  const textElements = [
    { className: 'text2', originalText: 'Про нас' },
    { className: 'text-23', originalText: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.' },
    { className: 'text-24', originalText: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.' },
    { className: 'text-25', originalText: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.' },
    { className: 'text-26', originalText: 'Дізнатися більше' },
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
    <div className='main-container2'>
      <div className='box2'>
      <div>
      <span className='text2'>Про нас</span>
          <div className='pic2' />
          </div>
        <div className='group2'>
          <div className='group-22'>
            <div className='img2' />
          </div>
          <div className='wrapper2'>
            <div className='img-22'>
              <div className='section2'>
                <span className='text-22'>BLISSPU</span>
              </div>
            </div>
          </div>
        </div>
        <div className='wrapper-22'>
          <span className='text-23'>
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </span>
          <span className='text-24'>
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </span>
          <span className='text-25'>
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </span>
        </div>
        <div className='bbut'>
          <div className='bbut'>
          <Link to="/about" className='text-26' style={{ textDecoration: 'none' }}>Дізнатися більше</Link>
          <div className='img-23'></div>
          </div>
          <div className='box-22'></div>
        </div>
     </div>
    </div>
  );
}
