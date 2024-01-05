import React from 'react';
import './Thanks.css';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';

export default function Thanks() {
   const { targetLanguage } = useLanguage();
  return (
    <div className='main-containerth'>
      <span className='textth'>
      {targetLanguage === 'en'
        ? 'We have already started processing your order. You can be sure that every detail is manufactured and tested by our specialists to ensure quality and the highest level of customer satisfaction.'
        : 'Ми вже приступили до обробки вашого замовлення. Ви можете бути впевнені,що кожна деталь виготовлена та перевірена нашими фахівцями для забезпечення якості,та найвищого рівня задоволеності клієнтів.'}
      
      </span>
      <div className='imgth' />
      <div className='boxth'>
        <div className='img-2th' />
        <div className='img-3th' />
        <div className='picth' />
        <div className='img-4th' />
        <div className='pic-2th' />
        <span className='text-2th'>{targetLanguage === 'en'
        ? 'Thank you for your order!'
        : 'Дякуємо за ваше замовлення!'}</span>
        <div className='img-5th' />
        <div className='pic-3th' />
        <div className='pic-4th' />
        <div className='pic-5th' />
        <div className='pic-6th' />
        <div className='img-6th' />
        <div className='img-7th' />
        <div className='img-8th' />
        <div className='img-9th' />
        <div className='wrapperth'>
          <Link to="/" className='text-3th' style={{ textDecoration: 'none' }}>{targetLanguage === 'en'
        ? 'Return to the main page'
        : 'Повернутися на головну'}</Link>
          <div className='img-ath' />
        </div>
      </div>
    </div>
  );
}
