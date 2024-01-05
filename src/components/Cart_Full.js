import React, { useState, useEffect } from 'react';
import './Cart_Full.css';
import { Link } from 'react-router-dom';
import { useCart } from '../containers/CartContext';
import CartCounterVert from './CartcounterVert';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
const fallbackImage = "/assets/images/as7.png";

export default function Cart_Full({ cartItems } ) {
   const { cart, increaseQuantity, decreaseQuantity,removeFromCart } = useCart();
   const [translatedCart, setTranslatedCart] = useState([]);
   const [buttonWidth, setButtonWidth] = useState(0);
     console.log('Карт',cart);
      const { targetLanguage } = useLanguage();

   const textElements = [
    { className: 'textca', originalText: 'Головна' },
    { className: 'text-3ca', originalText: 'Каталог' },
    { className: 'text-7ca', originalText: 'Корзина' },
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
    console.log('New Button Width:', newButtonWidth);
    setButtonWidth(newButtonWidth);
  } else {
    console.log('Button Text or Img Element not found.');
  }
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

          if (aromaElement && sizeElement && timeElement) {
            let translatedName = item.aroma;
            let translatedSize = getTranslatedSize(item.size, targetLanguage);
            let translatedTimeText = item.time === 5
              ? '5 hours'
              : item.time > 10 && item.time <= 30
                ? 'from 10 to 30 hours'
                : item.time > 30 && item.time < 100
                  ? 'from 30 to 100 hours'
                  : '';

            if (targetLanguage === 'en') {
              translatedName = await translateText(item.aroma, 'en');
              translatedTimeText = await translateText(translatedTimeText, 'en');
              translatedSize = getTranslatedSize(item.size, 'en'); // Translate size to English
            } else {
              translatedSize = getTranslatedSize(item.size, 'uk'); // Translate size to Ukrainian
            }

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

  return (
    <div className='main-containerca'>
      <div className='groupca'>
        <Link to="/" className='textca' style={{ textDecoration: 'none' }}>Головна</Link>
        <span className='text-2ca'>/</span>
        <Link to="/all" className='text-3ca' style={{ textDecoration: 'none' }}>Каталог</Link>
        <span className='text-4ca'>/</span>
        <span className='text-7ca'>Корзина</span>
      </div>
      <span className='text-8ca'>Кошик</span>
      <div className='wrapperca'>
        <span className='text-9ca'>Продукт</span>
        <span className='text-aca'>Колір</span>
        <span className='text-bca'>Аромат</span>
        <span className='text-cca'>Розмір</span>
        <span className='text-dca'>Кіл-ть</span>
        <span className='text-eca'>Ціна</span>
      </div>
      {cart.map((item, index) => (
          <div key={item.id} className='boxca'>
            {/* Render individual item properties here */}
            <div className='wrapper-2ca'>
              <img className='bg-img'
              src={`http://localhost:3000/photo/${item.img[0].img}`} 
              alt={item.name}   
              onError={(e) => {
              e.target.src = fallbackImage;}}
              />
            </div>
            <span className='text-10ca'>{item.name}</span>
                    <div className='wrapper-3ca'>
             <CartCounterVert
                id={item.id}
                color={item.colors[0]?.color}
                quantity={item.quantity}
                increaseQuantity={() => {
                  console.log('Increasing quantity for id:', item.id, 'and color:', item.colors[0]?.color);
                  increaseQuantity(item.id, item.colors[0]?.color);
                }}
                decreaseQuantity={() => {
                  console.log('Decreasing quantity for id:', item.id, 'and color:', item.colors[0]?.color);
                  decreaseQuantity(item.id, item.colors[0]?.color);
                }}
              />
            </div>
            <div className='sectionca'>
              <span className='text-12ca'>{item.price} </span>
              <span className='text-13ca'>{getCurrency()}</span>
            </div>
            <div className='pic-2ca' onClick={() => removeFromCart(item.id, item.colors[0]?.color)}/>
             {item.colors.map((colorObj, index) => (
              <div
                key={index}
                className='section-2ca'
                 style={{ width:'30px',backgroundColor: colorObj.color_num, marginBottom: '10px' }}
              />
            ))}
            <div className='section-2ca' />
            <span className={`text-14ca text-14ca-${index + 1}`}>{item.aroma}</span>
            <span className={`text-15ca text-15ca-${index + 1}`}>{item.size}</span>
           
            <span className={`text-17ca text-17ca-${index + 1}`}>{item.time === 5
                      ? '5 годин'
                      : item.time > 10 && item.time <= 30
                        ? 'від 10 до 30 годин'
                        : item.time > 30 && item.time < 100
                          ? 'від 30 до 100 годин'
                          : ''}</span>
          </div>
        ))}

      <div className='group-6ca' style={{ width: `${buttonWidth}px` }}>
        <Link to="/zakaz" className='text-2aca'>Оформити замовлення</Link>
        <div className='img1111' />
      </div>
      <div className='img-2ca' />
      <div className='pic-6ca' />
      <div className='img-3ca' />
      <div className='img-4ca' />
    </div>
  );
}
