import React, { useEffect } from 'react';
import './Card_all.css';
import { Link, useLocation } from 'react-router-dom';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';

const fallbackImage = "/assets/images/as7.png";

export default function Card_all({ id, name, translatedDescription, price, discount, image, isAboutProductPage,isMainPage }) {
  const discountedPrice = price - (price * (discount / 100));
  const { targetLanguage } = useLanguage();
  const location = useLocation();

  const getCurrency = () => {
    return targetLanguage === 'en' ? 'uah' : 'грн';
  };

  const backgroundImageStyle = {
    backgroundImage: `url(../assets/images/${image})`
  };

  useEffect(() => {
    // Scroll to the top of the page when the id changes
    window.scrollTo(0, 0);
  }, [id]);



  return (
    <Link to={`/product/${id}`} className={` ${isAboutProductPage ? 'main-containerc11' : isMainPage ? 'main-containerc12' : 'main-containerc'}`}>
      <div className={` ${isAboutProductPage ? 'groupc11' : 'groupc'}`}>
        <img
          className={` ${isAboutProductPage ? 'picc_a11' : 'picc_a'}`}
          src={`https://blisspu.com.ua/photo/${image}`}
          alt={name}
          onError={(e) => {
            console.error('Error loading image:', e);
            e.target.src = fallbackImage;
          }}
        />
      </div>
      <span className='text-2c'>{name}</span><br />
      <span className={` ${isAboutProductPage ? 'text-4c11' : 'text-4c'}`}>{translatedDescription}</span>
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
