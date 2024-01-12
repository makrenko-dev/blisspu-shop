import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../containers/CartContext';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
const fallbackImage = "/assets/images/as7.png";

const Cart = React.memo(({ handleClose }) => {
  const { cart, removeFromCart, clearCart, updateCart } = useCart();
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const { targetLanguage } = useLanguage();
  const textElements = [
    { className: 'offc', originalText: 'Ваше замовлення' },
    { className: 'text-131', originalText: 'Перейти до кошика' },
  ];

useEffect(() => {
  const handleTranslate = async () => {
    try {
      // Translate text elements (excluding "Name")
      for (const element of textElements) {
        const textElement = document.querySelector(`.${element.className}`);

        if (textElement && element.className !== 'p121') {
          if (targetLanguage === 'en') {
            const translatedText = await translateText(element.originalText, 'en');
            // Capitalize the first letter of the translated text
            const capitalizedTranslatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
            textElement.textContent = capitalizedTranslatedText;
          } else {
            textElement.textContent = element.originalText;
          }
        }
      }

      // Translate cart items if cart is not empty
      if (cart.length > 0) {
        const translationPromises = cart.map(async (item, index) => {
        const aromaElement = document.querySelector(`.p122-${index + 1}`);
        const timeElement = document.querySelector(`.p123-${index + 1}`);
        const colorElement = document.querySelector(`.p124-${index + 1}`);

        if (aromaElement && timeElement && colorElement) {
          let translatedName = item.aroma;
          let translatedTimeText = item.time < 10
            ? '5 hours'
            : item.time > 9 && item.time < 30
              ? 'from 10 to 30 hours'
              : item.time >= 30 && item.time < 100
                ? 'from 30 to 100 hours'
                : '';

          if (targetLanguage === 'en') {
            translatedName = await translateText(item.aroma, 'en');
            translatedTimeText = await translateText(translatedTimeText, 'en');
          }

          const translatedColors = await Promise.all(item.colors.map(async (colorObj) => {
            const translatedColor = targetLanguage === 'uk' ? colorObj.color : await translateText(colorObj.color, 'en');
            return translatedColor;
          }));

          const formattedTranslatedColors = translatedColors.join(', ');

          aromaElement.textContent = `- ${translatedName}`;
          
          if (targetLanguage === 'uk') {
            timeElement.textContent = `- ${item.time < 10
                      ? ' 5 годин'
                      : item.time > 9 && item.time < 30
                      ? ' від 10 до 30 годин'
                      : item.time >= 30 && item.time < 100
                      ? 'від 30 до 100 годин'
                      : ''}`;
          } else {
            timeElement.textContent = `- ${translatedTimeText}`;
          }

          colorElement.textContent = `- ${targetLanguage === 'uk' ? item.colors.map((colorObj) => colorObj.color).join(', ') : formattedTranslatedColors}`;
        }
      });

      await Promise.all(translationPromises);

      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  handleTranslate();
}, [targetLanguage, textElements, cart]);

 useEffect(() => {
  const fetchCartFromServer = async () => {
    try {
      const cartDataToSend = cart.map(({ id, colors, quantity }) => ({
        productId: id,
        color: colors[0]?.color,
        quantity: quantity,
      }));

      const response = await fetch('http://chbliss50457.corsa.chost.com.ua/api/product/basket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ basket: JSON.stringify(cartDataToSend) }),
      });

      const responseBody = await response.text(); // Get the response body as text
      const updatedCart = JSON.parse(responseBody);

      // Update the local cart state
      const updatedCartIds = updatedCart.map((item) => item.productId);
      const newCart = cart.filter((item) => updatedCartIds.includes(item.id));

      // Update the local cart state
      updateCart(newCart);
    } catch (error) {
      console.error('Error updating cart from server:', error);
    }
  };

  fetchCartFromServer();
}, []); 


  const getCurrency = () => {
    return targetLanguage === 'en' ? 'uah' : 'грн';
};

  return (
    <>

      <Offcanvas.Header closeButton style={{ width:'450px', backgroundColor: '#694F42',color: 'white',fontFamily: 'Montserrat Alternates, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "Source Han Sans CN", sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        lineHeight: '30px'}}>
        <Offcanvas.Title className='offc' style={{marginTop:'50px',fontSize: '36px', fontWeight: 400,}}>Ваше замовлення</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ width:'450px',backgroundColor: '#694F42',color: 'white',fontFamily: 'Montserrat Alternates, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "Source Han Sans CN", sans-serif',
        fontSize: '18px',
        fontWeight: 400,
        lineHeight: '30px' }}>
        {cart.length === 0 ? (
          <p className='p111'>
            {targetLanguage === 'en'
              ? 'Your cart is currently empty:('
              : 'У кошику поки нічого немає:('}
          </p>
        ) : (
          cart.map((item, index) => (
            <div key={item.id}>
            {console.log(item.time)}
              <div style={{ marginBottom: '50px', display: 'flex' }}>
                <div>
                  <img
                    className={`bg-img1 img-${index + 1}`}
                    src={`http://chbliss50457.corsa.chost.com.ua/photo/${item.img[0].img}`}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                  />
                </div>

                <div style={{ marginLeft: '20px' }}>
                  <p className={`p121 p121-${index + 1}`} style={{ marginBottom: '0px', fontSize: '20px' }}>{item.name}</p>
                  <p className={`p122 p122-${index + 1}`} style={{ marginBottom: '0px', fontSize: '16px' }}>- {item.aroma}</p>
                  <p className={`p123 p123-${index + 1}`} style={{ marginBottom: '0px', fontSize: '16px' }}>
                    - {item.time < 10
                      ? '5 годин'
                      : item.time > 9 && item.time < 30
                      ? 'від 10 до 30 годин'
                      : item.time >= 30 && item.time < 100
                      ? ' від 30 до 100 годин'
                      : ''}
                  }
                  </p>
                  <p className={`p124 p124-${index + 1}`} style={{marginBottom:'0px',fontSize:'16px'}}>- {item.colors.map((colorObj) => colorObj.color).join(', ')}</p>
                  <p style={{ marginBottom: '0px', fontSize: '20px' }}>{(item.price * item.quantity).toFixed(2)} {getCurrency()}</p>
                </div>
              </div>
            </div>
          ))

        )}

        <div>
          <button  className='section111' >
            <Link to="/cart" className='text-131' style={{ textDecoration: 'none' }} onClick={handleClose}>
              Перейти до кошика
            </Link>
            <div className='img111' />
          </button >
        </div>
      </Offcanvas.Body>
    </>
   );
});

export default Cart;
