import React, { useState } from 'react';
import './Cartcounter.css'

function CartCounter({ quantity, setQuantity }) {
  
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className='cart-counter'>
      <button className='cart-counter-btn' onClick={handleDecrement}>-</button>
      <span className='cart-counter-quantity'>{quantity}</span>
      <button className='cart-counter-btn' onClick={handleIncrement}>+</button>
    </div>
  );
}

export default CartCounter;
