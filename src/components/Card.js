import React, { useEffect, useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';

export default function Card({ id, name, description, price, discount, img }) {
  const discountedPrice = price - (price * (discount / 100));
  const { targetLanguage } = useLanguage();
  const getCurrency = () => {
    return targetLanguage === 'en' ? 'uah' : 'грн';
  };
  return (
    <Link to={`/product/${id}`} className='main-containerc'>
      <div className='groupc'>
        <div className='imgc' />
        {discount !== 0 && <span className='textc'>sale</span>}
        <div className='group-2c'>
         {img && img.length > 0 && (
          <img className='picc' src={`http://chbliss50457.corsa.chost.com.ua/photo/${img[0].img}`} alt={name} />
        )}
        </div>
      </div>
      <span className='text-2c'>{name}</span>
      <div className='group-3c11'>
      {discount !== 0 ? (
          <>
            <span className='text-4c11'>{`${discountedPrice.toFixed(2)} ${getCurrency()}`}</span>
            <span className='text-3c11'>{`${price} грн`}</span>
          </>
        ) : (
          <span className='text-4c11'>{`${price} грн`}</span>
        )}

      </div>
    </Link>
  );
}
