import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../components/About.js';
import Full_product from '../components/Full_product';
import Filter from '../components/Filter';



function All_products() {
  return (
    <div className="App" style={{ fontFamily: 'Montserrat Alternates, sans-serif', display: 'flex' }}>
      <Full_product />
    </div>
  );
}

export default All_products;