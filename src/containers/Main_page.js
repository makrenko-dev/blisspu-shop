import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../components/About.js';
import Img_full from '../components/Img_full';
import Special from './Special';
import Asorti from '../components/Asorti';
import Footer from '../components/Footer';
import About_Product from '../components/About_Product';

function Main_page() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <Img_full />
      <Special />
      <About />
      <Asorti />
    </div>
  );
}

export default Main_page;