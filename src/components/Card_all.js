import React, { useEffect } from 'react';
import './Card_all.css';
import { Link } from 'react-router-dom';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';
const fallbackImage = "/assets/images/as7.png";

export default function Card_all({ id, name, translatedDescription, price, discount, image}) {
const discountedPrice = price - (price * (discount / 100));
 const { targetLanguage } = useLanguage();
 const getCurrency = () => {
    return targetLanguage === 'en' ? 'uah' : 'грн';
  };

  const backgroundImageStyle = {
    backgroundImage: `url(../assets/images/${image})`
  };
  return (
    <Link to={`/product/${id}`} className='main-containerc'>
      <div className='groupc'>
        <img 
          className='picc_a'
          src={`http://localhost:3000/photo/${image}`} 
          alt={name}   
          onError={(e) => {console.error('Error loading image:', e);
          e.target.src = fallbackImage;}}
          />
        }
      </div>
      <span className='text-2c'>{name}</span>
      <span className='text-4c'>{translatedDescription}</span>
      <div className='group-3c'>
      {discount !== 0 ? (
          <>
            <span className='text-4c1111'>{`${discountedPrice.toFixed(2)}  ${getCurrency()}`}</span>
            <span className='text-3c11'>{`${price} грн`}</span>
          </>
        ) : (
          <span className='text-4c1111'>{`${price} грн`}</span>
        )}
        
        
      </div>
    </Link>
  );
}
