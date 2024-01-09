import React, { useEffect, useState } from 'react';
import './About_Product.css'
import CartCounter from './Cartcounter'
import { useParams } from 'react-router-dom';
import Card_all from './Card_all';
import Cart from './Cart'; 
import { Button, Offcanvas } from 'react-bootstrap';
import { useCart } from '../containers/CartContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';

const fallbackImage = "/assets/images/as7_1.png";

const About_Product = () => {

  useEffect(() => {
    updateWrapperHeight();
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [allProducts, setAllProducts] = useState([]);
  const { cart, updateCart, toggleCart, showCart, setShowCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColors, setSelectedColors] = useState([]);

   const { targetLanguage } = useLanguage();

    const textElements = [
    { className: 'text76', originalText: 'Головна' },
    { className: 'text-376', originalText: 'Каталог' },
    { className: 'text-576', originalText: 'Картка товару' },
    { className: 'text-876', originalText: 'Ціна:' },
    { className: 'text-b76', originalText: 'Колір' },
    { className: 'text-1076', originalText: 'Є в наявності' },
    { className: 'text-1476', originalText: 'До кошика' },
    { className: 'text-1576', originalText: 'Опис' },
    { className: 'text-1676', originalText: 'Склад' },
    { className: 'text-1076', originalText: 'Є в наявності' },
    { className: 'text-1876', originalText: 'Схожі пропозиції' },
  ];

  const productDataTextElements = [
    { className: 'text-776', originalText: productData?.description || '' },
    {
    className: 'text-a76',
    originalText: productData
      ? `Час горіння свічки приблизно ${
          productData.time < 10
            ? '5 годин'
            : productData.time >= 10 && productData.time < 30
            ? 'від 10 до 30 годин'
            : productData.time >= 30 && productData.time < 100
            ? 'від 30 до 100 годин'
            : ''
        }`
      : '',
  },

  { className: 'text-1776', originalText: productData?.full_desc|| '' },
  { className: 'text-1776', originalText: productData?.compound|| '' },
];
   
  const updateWrapperHeight = () => {
    const wrapper276 = document.querySelector('.wrapper-276');
    const box676 = document.querySelector('.box-676');

    if (wrapper276 && box676) {
      const box676Bottom = box676.getBoundingClientRect().bottom;
      const wrapper276Top = wrapper276.getBoundingClientRect().top;

      // Установите высоту wrapper-276 так, чтобы её нижний край был равен нижнему краю box-676
      wrapper276.style.height = `${box676Bottom - wrapper276Top}px`;
    }
  };

useEffect(() => {
  const updateBoxWidth = () => {
    const text1476 = document.querySelector('.text-1476');
    const pic376 = document.querySelector('.pic-376');
    const box676 = document.querySelector('.box-676');

    if (text1476 && pic376 && box676) {
      const text1476Width = text1476.offsetWidth;
      const pic376Width = pic376.offsetWidth;

      // Установите ширину box-676 равной сумме ширины text-1476 и pic-376
      box676.style.width = `${text1476Width + pic376Width+50}px`;
    }
  };

    const handleLanguageChange = async () => {
    // Ваш код смены языка

    // Вызовите функции обновления ширины и высоты после смены языка
    updateBoxWidth();
    updateWrapperHeight();
  };

  // Вызовите функции при смене targetLanguage
  updateBoxWidth();
  updateWrapperHeight();

  // Возможно, у вас есть другие зависимости, которые влияют на ширину
}, [targetLanguage, /* другие зависимости, если есть */]);


 useEffect(() => {
  const handleTranslate = async () => {
    try {
      const translationPromises = textElements.map(async (element) => {
        const textElement = document.querySelector(`.${element.className}`);

        if (textElement) {
          let translatedHTML = element.originalText;

          if (targetLanguage === 'en') {
            translatedHTML = await translateText(element.originalText, 'en');
          }

          return { textElement, translatedHTML };
        }

        return null;
      });

      const translations = await Promise.all(translationPromises);

      translations
        .filter((translation) => translation !== null)
        .forEach(({ textElement, translatedHTML }) => {
          textElement.innerHTML = translatedHTML;

          // Пересчет размеров и положения подчеркивания
         if(activeTab=='description')
          {
             const tabElement = document.querySelector(`.text-1576`);
          const underlineElement = document.querySelector('.underline');

            if (tabElement && underlineElement) {
              const width = tabElement.offsetWidth;
              const left = tabElement.offsetLeft;
              
              underlineElement.style.width = `${width}px`;
              underlineElement.style.left = `${left}px`;
            }
          }

          if(activeTab=='compound')
          {
             const tabElement = document.querySelector(`.text-1676`);
          const underlineElement = document.querySelector('.underline');

            if (tabElement && underlineElement) {
              const width = tabElement.offsetWidth;
              const left = tabElement.offsetLeft;
              
              underlineElement.style.width = `${width}px`;
              underlineElement.style.left = `${left}px`;
            }
          }
        });
            } catch (error) {
              console.error('Translation error:', error);
            }
          };

  handleTranslate();
}, [targetLanguage, textElements, activeTab]);

const updateUnderline = (tabClassName) => {
  const tabElement = document.querySelector(`.${tabClassName}`);
  const underlineElement = document.querySelector('.underline');

  if (tabElement && underlineElement) {
    const width = tabElement.offsetWidth;
    const left = tabElement.offsetLeft;

    underlineElement.style.width = `${width}px`;
    underlineElement.style.left = `${left}px`;
  }
};

useEffect(() => {
  const handleTranslate = async () => {
    try {
      const translationPromises = productDataTextElements.map(async (element) => {
        const textElement = document.querySelector(`.${element.className}`);

        if (textElement) {
          let translatedHTML = element.originalText;

          if (targetLanguage === 'en') {
            if (element.className === 'text-1776') {
              translatedHTML = activeTab === 'description'
                ? await translateText(productData?.full_desc || '', 'en')
                : activeTab === 'compound'
                ? await translateText(productData?.compound || '', 'en')
                : translatedHTML;
            } else {
              // Если это не 'text-1776', просто переводим текст на английский
              translatedHTML = await translateText(element.originalText, 'en');
            }
          } else if (targetLanguage === 'uk') {
            if (element.className === 'text-1776') {
              // Вывод оригинального текста в зависимости от активной вкладки
              translatedHTML = activeTab === 'description'
                ? productData?.full_desc || ''
                : activeTab === 'compound'
                ? productData?.compound || ''
                : element.originalText;
            } else {
              // Если это не 'text-1776', просто оставляем оригинальный текст на украинском
              translatedHTML = element.originalText;
            }
          }

          return { textElement, translatedHTML };
        }

        return null;
      });

      const translations = await Promise.all(translationPromises);

      translations
        .filter((translation) => translation !== null)
        .forEach(({ textElement, translatedHTML }) => {
          textElement.innerHTML = translatedHTML;
        });
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  handleTranslate();
}, [targetLanguage, productDataTextElements, activeTab, productData]);



  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('quantity', JSON.stringify(quantity));
  }, [quantity]);

  useEffect(() => {
    localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
  }, [selectedColors]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart(storedCart);
  }, []);

  useEffect(() => {
    const storedQuantity = JSON.parse(localStorage.getItem('quantity')) || 1;
    setQuantity(storedQuantity);
  }, []);

  useEffect(() => {
    const storedColors = JSON.parse(localStorage.getItem('selectedColors')) || [];
    setSelectedColors(storedColors);
  }, []);

  useEffect(() => {
    // Fetch data for the specific product
    fetch(`http://chbliss50457.corsa.chost.com.ua/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => console.error('Error fetching product data:', error));

    // Fetch all products
    fetch(`http://chbliss50457.corsa.chost.com.ua/api/product/forclient`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => console.error('Error fetching all products data:', error));
  }, [id]);

  const handleTabClick = (tab) => {
  setActiveTab(tab);
  
 
};

 const handleCartToggle = () => {
  toggleCart();
};

const handleColorClick = (color, color_num) => {
  setSelectedColors([{ color, color_num }]);
};



const addToCart = () => {
  try {
    if (!selectedColors || selectedColors.length === 0) {
      // No color selected, display a message to the user
      Swal.fire({
        title: targetLanguage === 'en' ? 'Choose color' : 'Оберіть колір',
        text: targetLanguage === 'en' ? 'In order to add the product to the cart, select one of the available colors' : 'Для того, щоб додати товар до кошика оберід один з доступних кольорів',
        icon: 'error',
        confirmButtonText: 'OK',
        buttonsStyling: false, // Disable default styling
        confirmButtonColor: '#694f42',
      });

      return;
    }

    if (productData && selectedColors.length > 0) {
      updateCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(
          (item) =>
            item.id === productData.id &&
            item.colors.some((color) => color.color_num === selectedColors[0]?.color_num)
        );

        if (existingProductIndex !== -1) {
          // Product with the same id and color is already in the cart
          const updatedCart = [...prevCart];
          const existingProduct = updatedCart[existingProductIndex];
          existingProduct.quantity += quantity;
          return updatedCart;
        } else {
          // Product is not in the cart with the selected color, add a new entry
          const newCartItem = {
            ...productData,
            price: discountedPrice, // Use discounted price instead of regular price
            quantity,
            colors: [{ color: selectedColors[0]?.color, color_num: selectedColors[0]?.color_num }],
          };
          toggleCart(); // Close the cart before updating
          return [...prevCart, newCartItem];
        }
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};


const getSimilarColorProducts = () => {
    if (!productData) {
      return [];
    }

    const similarColorProducts = allProducts.filter((product) =>
      product.colors.some((productColor) => productColor.color === productData.colors[0].color)
    );

    if (similarColorProducts.length === 0) {
      const priceRange = 100;
      return allProducts
        .filter(
          (product) =>
            Math.abs(productData.price - product.price) <= priceRange &&
            product.id !== productData.id
        )
        .slice(0, 3);
    }

    const filteredSimilarColorProducts = similarColorProducts.filter(
      (product) => product.id !== productData.id
    );

    return filteredSimilarColorProducts.slice(0, 3);
};

const getCurrency = () => {
    return targetLanguage === 'en' ? 'uah' : 'грн';
};
let discountedPrice;

if (productData) {
  discountedPrice = productData.price - (productData.price * (productData.discount / 100));
}
  return (
    <div className='main-container76'>
     {productData ? (
      <>
      <div className='box76'>
      <Link to="/" className='text76' style={{ textDecoration: 'none' }}>Головна</Link>
        <span className='text-276'>/</span>
      <Link to="/all" className='text-376' style={{ textDecoration: 'none' }}>Каталог</Link>
        <span className='text-476'>/</span>
        <span className='text-576'>Картка товару</span>
      </div>
      <div className='wrapper76'>
       <div className='wrapper-276'>
              {productData.img && (
                <img className='img76'
              src={`http://chbliss50457.corsa.chost.com.ua/photo/${productData.img[0].img}`}
              alt={productData.name}   
              onError={(e) => {console.error('Error loading image:', e);
              e.target.src = fallbackImage;}}
              />
              )}
            </div>
       <div className='container5567'>
          <span className='text-676'>{productData.name}</span>
          <span className='text-776'>{productData.description}</span>
          <div className='container55'>
          <span className='text-876'>Ціна:</span>
            {productData.discount !== 0 ? (
              <>
              <span className='text-976'>{`${discountedPrice.toFixed(2)} ${getCurrency()}`}</span>
              <span className='text-3c1'>{`${productData.price} грн`}</span>
              </>
            ) : (
              <span className='text-976'>{productData.price} {getCurrency()}</span>
            )}
           </div>
          <span className='text-a76'>
            {productData.time < 10
              ? '*Час горіння свічки приблизно 5 годин'
              : productData.time >= 10 && productData.time < 30
              ? '*Час горіння свічки приблизно від 10 до 30 годин'
              : productData.time >= 30 && productData.time < 100
              ? '*Час горіння свічки приблизно від 30 до 100 годин'
              : ''}
          </span>
          <span className='text-b76'>Колір</span>
          <div className='colors-container'>
            
            {productData.colors.map((color, index) => (
              <div key={index} className='color-item' onClick={() => handleColorClick(color.color, color.color_num)}>
                <div
                  className={`color-square ${selectedColors.some((c) => c.color === color.color) ? 'selected' : ''}`}
                  style={{ backgroundColor: color.color_num }}
                />
                <span className='color-text'>{color.color}</span>
              </div>
            ))}
          </div>
          <span className='text-1076'>Є в наявності</span>
        </div>
      </div>
       <div className='wrapper-676'>
        <div className='section76'>
          <div className='box-576'>
             <CartCounter
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
        <span className='box-676' >
        <span className='text-1476' onClick={addToCart} style={{ cursor: 'pointer' }}>
          До кошика
        </span>
        <div className='pic-376' />
         </span>
      </div>
     <div className='wrapper-976'>
        <div className='tabs-container'>
          <div className='tab'>
            <span className={`text-1576 ${activeTab === 'description' ? 'active' : ''}`} onClick={() => handleTabClick('description')}>Опис</span>
          </div>
          <div className='tab'>
            <span className={`text-1676 ${activeTab === 'compound' ? 'active' : ''}`} onClick={() => handleTabClick('compound')}>Склад</span>
          </div>
        </div>
        <div className='underline'></div>
        <div className='content-container'>
          <div className='wrapper-a76'>
            <div className='img-376' />
          </div>
          <span className='text-1776'>
            {activeTab === 'description' ? productData.full_desc : productData.compound}
          </span>
        </div>
      </div>


      <span className='text-1876'>Схожі пропозиції</span>
      
      <div className='similar-products-container' >
            {getSimilarColorProducts().map((similarProduct) => (
              <Card_all
                key={similarProduct.id}
                id={similarProduct.id}
                name={similarProduct.name}
                description={similarProduct.mini_desc}
                price={similarProduct.price}
                discount={similarProduct.discount}
                image={similarProduct.img && similarProduct.img[0].img}
              />
        ))}
          </div>
      </>
      ) : (
      <p>Loading...</p>
      // or any other loading indicator or message
     )}
       <Offcanvas show={showCart} onHide={() => setShowCart(false)} style={{ width: '500px' }}>
        <Cart handleClose={() => setShowCart(false)} />
      </Offcanvas>
    </div>
  );
};
export default About_Product;