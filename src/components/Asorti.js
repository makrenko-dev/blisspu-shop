import React, { useEffect, useState } from 'react';
import './Asorti.css';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';


export default function Asorti() {
 const { targetLanguage } = useLanguage();

  const textElements = [
    { className: 'text5', originalText: 'Наш асортимент' },
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
    <div className='main-container5'>
      <div className='group5'>
        <span className='text5'>Наш асортимент</span>
        <div className='pic5' />
      </div>
      <div className='wrapper5'>
        <div className='section5'>
          <div className='pic-52' />
        </div>
        <div className='wrapper-52'>
          <div className='pic-53' />
        </div>
        <div className='group-52'>
          <div className='pic-54' />
        </div>
        <div className='section-52'>
          <span className='text-52'>BLISSPU</span>
        </div>
        <div className='group-53'>
          <div className='pic-55' />
        </div>
        <div className='wrapper-53'>
          <div className='img5' />
        </div>
        <div className='group-54'>
          <div className='pic-56' />
        </div>
      </div>
    </div>
  );
}
