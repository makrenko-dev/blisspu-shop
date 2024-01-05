import React, { useState, useEffect } from 'react';
import filtrImage from '../assets/images/filtr.png';

const Filters = ({ loadProducts  }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [burnTime, setBurnTime] = useState('');
  const [priceRange, setPriceRange] = useState([150, 1500]);

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const applyFilters = () => {
    loadProducts({
      colors: selectedColors,
      time: burnTime,
      price: priceRange,
    });
  };

  const handleBurnTimeChange = (time) => {
    setBurnTime(time);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };


  return (
    <div style={{width: '20%', height: '100vh', backgroundColor: '#694F42', padding: '20px', position: 'relative', left: 0, marginBottom: '20px', color:'white' }}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',textAlign: 'left', marginTop:'40px', marginRight:'40px'}}>
       <img src={filtrImage} alt="Изображение" style={{ marginBottom: '10px', marginRight:'20px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: '400'}}>Фільтри</h2>
        </div>
        <div style={{ textAlign: 'left' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '400', marginTop:'30px'}}> Кольори</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={selectedColors.includes('Білий')} onChange={() => handleColorChange('Білий')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: selectedColors.includes('Білий') ? '#F9F5F2' : 'transparent' }} />
              Білий
            </label>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={selectedColors.includes('Бежевий')} onChange={() => handleColorChange('Бежевий')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: selectedColors.includes('Бежевий') ? '#D8C4B3' : 'transparent' }} />
              Бежевий
            </label>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
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
          <h3 style={{ fontSize: '20px', fontWeight: '400', marginTop:'27px'}}>Час горіння</h3>
          <div>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={burnTime === '5 годин'} onChange={() => handleBurnTimeChange('5 годин')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: burnTime === '5 годин' ? '#F9F5F2' : 'transparent' }} />
              5 годин
            </label>
          </div>
          <div>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={burnTime === 'від 10 до 30 годин'} onChange={() => handleBurnTimeChange('від 10 до 30 годин')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: burnTime === 'від 10 до 30 годин' ? '#F9F5F2' : 'transparent' }} />
              від 10 до 30 годин
            </label>
          </div>
          <div>
            <label style={{ fontSize: '18px', fontWeight: '400'}}>
              <input type="checkbox" checked={burnTime === 'від 30 до 100 годин'} onChange={() => handleBurnTimeChange('від 30 до 100 годин')} style={{ appearance: 'none', borderRadius: '4px', marginRight: '8px', width: '20px', height: '20px', border: '1px solid #FFFFFF', backgroundColor: burnTime === 'від 30 до 100 годин' ? '#F9F5F2' : 'transparent' }} />
              від 30 до 100 годин
            </label>
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '400', marginTop:'27px'}}>Ціна</h3>
          {/* Пример слайдера для выбора ценового диапазона */}
          <input type="range" min="150" max="1500" step="1" value={priceRange[0]} onChange={(e) => handlePriceRangeChange([parseInt(e.target.value, 10), priceRange[1]])} /><br />
          <span style={{ fontSize: '18px', fontWeight: '400'}}>{priceRange[0]} грн - </span>
          <span style={{ fontSize: '18px', fontWeight: '400'}}>{priceRange[1]} грн</span>
        </div>
        </div>
      </div>
       <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;
