import React, { useState, useEffect } from 'react';
import './Full_product.css';
import Card_all from './Card_all';
import filtrImage from '../assets/images/filtr.png';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';


export default function Full_product() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
   
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColors, setSelectedColors] = useState([]);
  const [burnTime, setBurnTime] = useState(null);
  const [priceRange, setPriceRange] = useState([150, 1500]);
  const [translatedDescriptions, setTranslatedDescriptions] = useState([]);


  const { targetLanguage } = useLanguage();

  const textElements = [
    { className: 'txt1', originalText: 'Фільтри' },
    { className: 'txt2', originalText: 'Кольори' },
    { className: 'txt3', originalText: 'Час горіння' },
    { className: 'txt4', originalText: 'Ціна' },
    { className: 'text-f9', originalText: 'Головна' },
    { className: 'text-119', originalText: 'Каталог' },
    { className: 'text-129', originalText: 'Свічки' },
    { className: 'text-139', originalText: 'Сезонні пропозіції' },
    { className: 'text-149', originalText: 'Бестселер' },
    { className: 'text-159', originalText: 'Всі свічки' },
    { className: 'txt5', originalText: 'Упс, товарів в цій категорії немає :(' },
    { className: 'text-289', originalText: 'Дивитися більше' },
    { className: 'text-299', originalText: 'Показати менше' },
    // text-289
  ];

 useEffect(() => {
  const handleTranslate = async () => {
    try {
      if (targetLanguage === 'en') {
        const translatedDescriptionsMap = {};
        for (const product of products) {
          const translatedText = await translateText(product.mini_desc, 'en');
          translatedDescriptionsMap[product.id] = translatedText;
        }
        setTranslatedDescriptions(translatedDescriptionsMap);
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  handleTranslate();
}, [targetLanguage, products]);
 

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
        });
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  handleTranslate();
}, [targetLanguage, textElements]);


  useEffect(() => {
    // Fetching data from the API when the component mounts
    fetchFilteredData();
  }, [selectedColors, burnTime, priceRange, selectedCategory, visibleProducts]);

  const fetchFilteredData = () => {
    const queryParams = [];

    // Add selected colors to the query parameters
    if (selectedColors.length > 0) {
      queryParams.push(`colors=${selectedColors.join(',')}`);
    }

    // Add burn time to the query parameters
    if (burnTime) {
      queryParams.push(`burningtime=${burnTime}`);
    }

    // Add price range to the query parameters
    queryParams.push(`prices=${priceRange[0]},${priceRange[1]}`);

    // Add bestseller and season filters if selected
    if (selectedCategory === 'bestseller') {
      queryParams.push('bestseller=true');
    } else if (selectedCategory === 'season') {
      queryParams.push('season=true');
    }

    // Construct the final API query string
    const queryString = queryParams.join('&');
    console.log(queryString);
    // Fetch data from the API with the constructed query string
    fetch(`http://localhost:3000/api/product/forclient?${queryString}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching filtered data:', error));
  };

  const handleColorChange = color => {
    setSelectedColors(prevColors =>
      prevColors.includes(color)
        ? prevColors.filter(c => c !== color)
        : [...prevColors, color]
    );
  };

  const applyFilters = () => {
    
  };

  const handleBurnTimeChange = time => {
    setBurnTime(prevTime => {
    // Check if the time is already selected
    const isTimeSelected = prevTime === time;

    // If selected, remove it; if not selected, add it
    return isTimeSelected ? null : time;
  });
  };

  const handlePriceRangeChange = range => {
    setPriceRange(range);
  };

  const handleSelectCategory = category => {
    setSelectedCategory(category);
    setVisibleProducts(6);
  };

  const handleLoadMore = () => {
    setVisibleProducts(prevVisible => prevVisible + 6);
  };

  const handleShowLess = () => {
    setVisibleProducts(6);
  };

  return (

    <div className='main-container9'>
    <div style={{width: '20%', height: '100vh', backgroundColor: '#694F42', padding: '20px', position: 'relative', left: 0, marginBottom: '20px', color:'white' }}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',textAlign: 'left', marginTop:'40px', marginRight:'40px'}}>
       <img src={filtrImage} alt="Изображение" style={{ marginBottom: '10px', marginRight:'20px' }} />
        <h2 className='txt1' style={{ fontSize: '24px', fontWeight: '400'}}>Фільтри</h2>
        </div>
        <div style={{ textAlign: 'left' }}>
        <div>
          <h3 className='txt2' style={{ fontSize: '20px', fontWeight: '400', marginTop:'30px'}}>Кольори</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={selectedColors.includes('Білий')} onChange={() => handleColorChange('Білий')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: selectedColors.includes('Білий') ? '#F9F5F2' : 'transparent' }} />
              Білий
            </label>
            <label  style={{ fontSize: '18px', fontWeight: '400'}}>
              <input   type="checkbox" checked={selectedColors.includes('Бежевий')} onChange={() => handleColorChange('Бежевий')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: selectedColors.includes('Бежевий') ? '#D8C4B3' : 'transparent' }} />
              Бежевий
            </label>
            <label  style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={selectedColors.includes('Зелений')} onChange={() => handleColorChange('Зелений')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: selectedColors.includes('Зелений') ? '#8F9F97' : 'transparent' }} />
              Зелений
            </label>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={selectedColors.includes('Коричневий')} onChange={() => handleColorChange('Коричневий')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: selectedColors.includes('Коричневий') ? '#C28F7A' : 'transparent' }} />
              Коричневий
            </label>
          </div>
        </div>
        <div>
          <h3 className='txt3' style={{ fontSize: '20px', fontWeight: '400', marginTop:'27px'}}>Час горіння</h3>
          <div>
            <label className='7' style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={burnTime === '5'} onChange={() => handleBurnTimeChange('5')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: burnTime === '5' ? '#F9F5F2' : 'transparent' }} />
              5 годин
            </label>
          </div>
          <div>
            <label className='8' style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={burnTime === '10,29'} onChange={() => handleBurnTimeChange('10,29')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: burnTime === '10,29' ? '#F9F5F2' : 'transparent' }} />
              від 10 до 30 годин
            </label>
          </div>
          <div>
            <label className='9' style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={burnTime === '30,100'} onChange={() => handleBurnTimeChange('30,100')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: burnTime === '30,100' ? '#F9F5F2' : 'transparent' }} />
              від 30 до 100 годин
            </label>
          </div>
        </div>
        <div>
          <h3 className='txt4' style={{ fontSize: '20px', fontWeight: '400', marginTop:'27px'}}>Ціна</h3>
          {/* Пример слайдера для выбора ценового диапазона */}
          <input type="range" min="150" max="1500" step="1" value={priceRange[0]} onChange={(e) => handlePriceRangeChange([parseInt(e.target.value, 10), priceRange[1]])} /><br />
          <span style={{ fontSize: '18px', fontWeight: '400'}}>{priceRange[0]} грн - </span>
          <span style={{ fontSize: '18px', fontWeight: '400'}}>{priceRange[1]} грн</span>
        </div>
        </div>
      </div>
    </div>
    <div className='main-all'>
      <div className='text-container'>
        <Link to="/" className='text-f9' style={{ textDecoration: 'none' }}>Головна</Link>
        <span className='text-109'>/</span>
        <span className='text-119'>Каталог</span>
      </div>
      <div className='text-container1'>
      <span className='text-129'>Свічки</span>
      </div>
       <div className='text-container2'>
        <span className='text-139' onClick={() => handleSelectCategory('season')}>Сезонні пропозіції</span>
        <span className='text-169'>|</span>
        <span className='text-149' onClick={() => handleSelectCategory('bestseller')}>Бестселер</span>
        <span className='text-169'>|</span>
        <span className='text-159' onClick={() => handleSelectCategory('all')}>Всі свічки</span>
      </div>
      <div className='product-grid'>
      {products.length > 0 ? (
        products.slice(0, visibleProducts).map(product => (
          <Card_all
            key={product.id}
            id={product.id}
            name={product.name}
            translatedDescription={
              targetLanguage === 'en'
                ? translatedDescriptions[product.id] || product.mini_desc
                : product.mini_desc
            }
            price={product.price}
            image={product.img && product.img[0].img}
          />
        ))
      ) : (
       <h2 className='txt5' style={{ fontSize: '24px', fontWeight: '400', marginTop:'20px', textAlign: 'center'}}>Упс, товарів в цій категорії немає :(</h2>
      )}
      </div>
      {(visibleProducts < products.length) && products.length > 6 && (
        <div className='box-899' onClick={handleLoadMore}>
          <span className='text-289'>Дивитися більше</span>
          <div className='pic-899' />
        </div>
      )}

      {(visibleProducts >= products.length) && products.length > 6 &&(
        <div className='box-899' onClick={handleShowLess}>
          <span className='text-299'>Показати менше</span>
          <div className='pic-899' />
        </div>
      )}
    </div>
  </div>
  );
}
