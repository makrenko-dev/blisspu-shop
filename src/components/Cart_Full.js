import React, { useState, useEffect } from 'react';
import './Cart_Full.css';
import { Link } from 'react-router-dom';
import { useCart } from '../containers/CartContext';
import CartCounterVert from './CartcounterVert';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
const fallbackImage = "/assets/images/as7.png";


const ProductDetails = ({ targetLanguage }) => {
  useEffect(() => {
    const textDcaElement = document.querySelector('.text-dca');
    const textCcaElement = document.querySelector('.text-cca');
    const textAcaElement = document.querySelector('.text-aca');
    const textBcaElement = document.querySelector('.text-bca');
    const textEcaElement = document.querySelector('.text-eca');

    if (textDcaElement && textCcaElement) {
      const computedStylesDca = window.getComputedStyle(textDcaElement);
      const currentTextDcaLeft = parseInt(computedStylesDca.getPropertyValue('left'), 10);

      const computedStylesCca = window.getComputedStyle(textCcaElement);
      const currentTextCcaLeft = parseInt(computedStylesCca.getPropertyValue('left'), 10);

      const computedStylesAca = window.getComputedStyle(textAcaElement);
      const currentTextAcaLeft = parseInt(computedStylesAca.getPropertyValue('left'), 10);

      const computedStylesBca = window.getComputedStyle(textBcaElement);
      const currentTextBcaLeft = parseInt(computedStylesBca.getPropertyValue('left'), 10);

      const computedStylesEca = window.getComputedStyle(textEcaElement);
      const currentTextEcaLeft = parseInt(computedStylesEca.getPropertyValue('left'), 10);


      if (targetLanguage === 'en') {
        textDcaElement.style.left = `${currentTextDcaLeft + 50}px`;
        textCcaElement.style.left = `${currentTextCcaLeft + 40}px`;
        textAcaElement.style.left = `${currentTextAcaLeft + 30}px`;
        textBcaElement.style.left = `${currentTextBcaLeft + 30}px`;
        textEcaElement.style.left = `${currentTextEcaLeft + 30}px`;
      } else if (targetLanguage === 'uk') {
        textDcaElement.style.left = `${currentTextDcaLeft - 50}px`;
        textCcaElement.style.left = `${currentTextCcaLeft - 40}px`;
        textAcaElement.style.left = `${currentTextAcaLeft - 30}px`;
        textBcaElement.style.left = `${currentTextBcaLeft - 30}px`;
        textEcaElement.style.left = `${currentTextEcaLeft - 30}px`;
      }
    }

    // Additional logic for text-9ca element if needed

  }, [targetLanguage]);
};




export default function Cart_Full({ cartItems } ) {
   const { cart, increaseQuantity, decreaseQuantity,removeFromCart } = useCart();
   const [translatedCart, setTranslatedCart] = useState([]);
   const [buttonWidth, setButtonWidth] = useState(0);
      const { targetLanguage } = useLanguage();

   const textElements = [
    { className: 'textca', originalText: 'Головна' },
    { className: 'text-3ca', originalText: 'Каталог' },
    { className: 'text-7ca', originalText: 'Кошик' },
    { className: 'text-8ca', originalText: 'Кошик' },
    { className: 'text-9ca', originalText: 'Продукт' },
    { className: 'text-aca', originalText: 'Колір' },
    { className: 'text-bca', originalText: 'Аромат' },
    { className: 'text-cca', originalText: 'Розмір' },
    { className: 'text-dca', originalText: 'Кіл-ть' },
    { className: 'text-eca', originalText: 'Ціна' },
    { className: 'text-2aca', originalText: 'Оформити замовлення' },
    // Добавьте другие элементы, как необходимо
  ];

useEffect(() => {
  const getTranslatedSize = (originalSize, language) => {
    const sizeMapping = {
      велика: { en: 'big', uk: 'велика' },
      середня: { en: 'medium', uk: 'середня' },
      маленька: { en: 'small', uk: 'маленька' },
      // Add more size mappings as needed
    };

    // Choose the appropriate translation based on the original size text
    const sizeKey = originalSize.toLowerCase();
    const translatedSize = sizeMapping[sizeKey] && sizeMapping[sizeKey][language];

    return translatedSize || originalSize; // Return the translated size if available, otherwise, return the original size
  };

  const updateButtonWidth = () => {
  const buttonTextElement = document.querySelector('.text-2aca');
  const img111Element = document.querySelector('.img1111');

  if (buttonTextElement && img111Element) {
    const newButtonWidth = buttonTextElement.offsetWidth + img111Element.offsetWidth + 80; // Добавляем 60px для учета отступа
  
    setButtonWidth(newButtonWidth);
  } else {
    
  }
};

const translateColors = async (colors, targetLanguage) => {
    const translatedColors = await Promise.all(
      colors.map(async (colorObj) => {
        const translatedColor = await translateText(colorObj.color, targetLanguage);
        return translatedColor;
      })
    );
    return translatedColors.join(' ');
  };

  const handleTranslate = async () => {
    try {
      // Translate text elements (excluding "Name")
      const translationPromises = textElements.map(async (element) => {
        const textElement = document.querySelector(`.${element.className}`);

        if (textElement && element.className !== 'p121') {
          if (targetLanguage === 'en') {
            const translatedText = await translateText(element.originalText, 'en');
            // Capitalize the first letter of the translated text
            const capitalizedTranslatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
            return { element, translatedText: capitalizedTranslatedText };
          } else {
            return { element, translatedText: element.originalText };
          }
        }

        return null;
      });

      const translatedTexts = await Promise.all(translationPromises);

      // Update text content after all translations are done
      translatedTexts.forEach(({ element, translatedText }) => {
        const textElement = document.querySelector(`.${element.className}`);
        if (textElement) {
          textElement.textContent = translatedText;
        }
      });

      // Translate cart items if cart is not empty
     if (cart.length > 0) {
    const cartTranslationPromises = cart.map(async (item, index) => {
    const aromaElement = document.querySelector(`.text-14ca-${index + 1}`);
    const sizeElement = document.querySelector(`.text-15ca-${index + 1}`);
    const timeElement = document.querySelector(`.text-17ca-${index + 1}`);
    const colorElements = document.querySelectorAll(`.text-19ca-${index + 1}`);

    if (aromaElement && sizeElement && timeElement) {
      let translatedName = item.aroma;
      let translatedSize = getTranslatedSize(item.size, targetLanguage);
      let translatedTimeText = '';

      if (targetLanguage === 'en') {
        translatedName = await translateText(item.aroma, 'en');
        translatedSize = getTranslatedSize(item.size, 'en'); // Translate size to English
        translatedTimeText = item.time < 10
          ? '5 hours'
          : item.time > 9 && item.time <= 30
            ? 'from 10 to 30 hours'
            : item.time > 30 && item.time < 100
              ? 'from 30 to 100 hours'
              : '';
      } else {
        translatedSize = getTranslatedSize(item.size, 'uk'); // Translate size to Ukrainian
        translatedTimeText = item.time < 10
          ? '5 годин'
          : item.time > 9 && item.time <= 30
            ? 'від 10 до 30 годин'
            : item.time > 30 && item.time < 100
              ? 'від 30 до 100 годин'
              : '';
      }
             const translatedColors = await translateColors(item.colors, targetLanguage);

            // Update color text content after all translations are done
            colorElements.forEach((colorElement) => {
              colorElement.textContent = translatedColors;
            });
      return {
        aromaElement,
        sizeElement,
        timeElement,
        translatedName,
        translatedSize,
        translatedTimeText,
        
      };
    }

    return null;
  });

  const cartTranslations = await Promise.all(cartTranslationPromises);

  // Update cart item text content after all translations are done
  cartTranslations.forEach(({ aromaElement, sizeElement, timeElement, translatedName, translatedSize, translatedTimeText }) => {
    if (aromaElement && sizeElement && timeElement) {
      aromaElement.textContent = ` ${translatedName}`;
      sizeElement.textContent = ` ${translatedSize}`;
      timeElement.textContent = ` ${translatedTimeText}`;
    }
  });
}


      // Call the updateButtonWidth function after translations
      updateButtonWidth();
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  // Call the handleTranslate function when targetLanguage, textElements, or cart change
  handleTranslate();

}, [targetLanguage, textElements, cart]);


const getCurrency = () => {
    return targetLanguage === 'en' ? 'uah' : 'грн';
};

const viewportWidth = window.innerWidth;
  return (
    <div className='main-containerca'>
     
      <div className='groupca'>
        <Link to="/" className='textca' style={{ textDecoration: 'none' }}>Головна</Link>
        <span className='text-2ca'>/</span>
        <Link to="/all" className='text-3ca' style={{ textDecoration: 'none' }}>Каталог</Link>
        <span className='text-4ca'>/</span>
        <span className='text-7ca'>Кошик</span>
      </div>
     
      <span className='text-8ca'>Кошик</span>
      {cart.length > 0 && (
      <>
      {viewportWidth < 991 && (
        <div style={{ position: 'relative', display: 'flex', flexDirection:'column',alignSelf: 'center' }}>
          <span className='text-81ca'>Продукт та інформація про нього</span>
          <hr className='horizontal-line' />
        </div>
      )}
       <ProductDetails targetLanguage={targetLanguage} />
      <div className='wrapperca'>
        <span className='text-9ca'>Продукт</span>
        <span className='text-aca'>Колір</span>
        <span className='text-bca'>Аромат</span>
        <span className='text-cca'>Розмір</span>
        <span className='text-dca'>Кіл-ть</span>
        <span className='text-eca'>Ціна</span>
      </div>
      {cart.map((item, index) => (
        <div className='boxca1'>
          <div key={item.id} className='boxca'>
            {/* Render individual item properties here */}
            <div className='wrapper-2ca'>
              <img className='bg-img'
              src={`http://chbliss50457.corsa.chost.com.ua/photo/${item.img[0].img}`} 
              alt={item.name}   
              onError={(e) => {
              e.target.src = fallbackImage;}}
              />
            </div>
            <div className='wrapper-21ca'>
            <span className='text-10ca'>{item.name}</span>
              <div className='wrapper-3ca'>
              {viewportWidth > 1200 ? (
                <CartCounterVert
                  id={item.id}
                  color={item.colors[0]?.color}
                  quantity={item.quantity}
                  increaseQuantity={() => {
                    
                    increaseQuantity(item.id, item.colors[0]?.color);
                  }}
                  decreaseQuantity={() => {
                    
                    decreaseQuantity(item.id, item.colors[0]?.color);
                  }}
                />
              ) : (
                <div  className='text-16ca'>
                  {targetLanguage === 'en'
        ? 'Quantity'
        : 'Кількість'}: {item.quantity}
                </div>
              )}
            </div>
            <div className='sectionca'>
              <span className='text-12ca'>{item.price * item.quantity} </span>
              <span className='text-13ca'>{getCurrency()}</span>
            </div>
            {viewportWidth > 1200 ? (
              item.colors.map((colorObj, index) => (
                <div
                  key={index}
                  className='section-2ca'
                  style={{ width: '30px', backgroundColor: colorObj.color_num, marginBottom: '10px' }}
                />
              ))
            ) : (
              item.colors.map((colorObj, index) => (
                <span key={index} style={{ display: 'inline-flex' }} className={`text-19ca text-19ca-${index + 1}`}>
                  {colorObj.color}{' '}
                </span>
              ))
            )}
            <span className={`text-14ca text-14ca-${index + 1}`}>{item.aroma}</span>
            <span className={`text-15ca text-15ca-${index + 1}`}>{item.size}</span>
           
            <span className={`text-17ca text-17ca-${index + 1}`}>{item.time < 10
                      ? '5 годин'
                      : item.time > 9 && item.time <= 30
                        ? 'від 10 до 30 годин'
                        : item.time > 30 && item.time < 100
                          ? 'від 30 до 100 годин'
                          : ''}</span>
            </div>
            {viewportWidth > 991 ? (
            <div className='pic-2ca' onClick={() => removeFromCart(item.id, item.colors[0]?.color)}/>):''}
          </div>
          {viewportWidth < 991 ? (
            <div className='pic-2ca' onClick={() => removeFromCart(item.id, item.colors[0]?.color)}/>):''}
          {viewportWidth < 1200 ? (
          <hr className='horizontal-line' />):''}

        </div>
        ))}
       
      <div className='group-6ca' style={{ width: `${buttonWidth}px` }}>
        <Link to="/zakaz" className='text-2aca'>Оформити замовлення</Link>
        <div className='img1111' />
      </div>
      </>
    )}
      {!cart.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className='text-811ca'>
            {targetLanguage === 'en'
              ? 'Your cart is empty.'
              : 'У вашому кошику поки що нічого немає, але наші свічки дуууууже зачекалися тебе :)'}
          </span>
          <div className='group-6ca' style={{ width: `373px`, textDecoration:'none' }}>
            <Link to="/" className='text-2aca' style={{textDecoration:'none' }}>
              {targetLanguage === 'en' ? 'Back to Home' : 'Повернутися на головну'}
            </Link>
            <div className='img1111' />
          </div>
        </div>
       )}
    </div>
  );
}