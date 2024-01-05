import React from 'react';
import './E404.css';
import { Link } from 'react-router-dom';

export default function E404() {
  return (
    <div className='main-container404'>
      <div className='box404'>
        <div className='img404' />
        <div className='img-2404' />
        <div className='img-3404' />
        <div className='img-4404' />
        <div className='pic404' />
        <div className='pic-2404' />
        <div className='img-5404' />
        <div className='pic-3404' />
        <div className='pic-4404' />
        <div className='img-6404' />
        <span className='text404'>404</span>
        <span className='text-2404'>
          Упс ... На жаль,виникла помилка, але ми вже працюємо над нею
        </span>
        <div className='img-7404' />
        <div className='pic-5404' />
        <div className='img-8404'>
          <div className='box-2404'>
            <Link to="/" className='text-3404' style={{ textDecoration: 'none' }}>Повернутися на головну</Link>
            <div className='img-9404' />
          </div>
        </div>
        <div className='pic-6404' />
      </div>
      <div className='pic-7404' />
    </div>
  );
}
