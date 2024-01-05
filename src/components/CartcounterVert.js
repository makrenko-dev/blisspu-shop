import React from 'react';
import './CartcounterVert.css';

function CartCounterVert({ id, color, quantity, increaseQuantity, decreaseQuantity }) {
  const handleIncrement = () => {
    increaseQuantity(id, color);
  };

  const handleDecrement = () => {
     if (quantity > 1) {
    decreaseQuantity(id, color);
    }
  };

  return (
    <div className='cart-counter1'>
      <button className='cart-counter-btn1' onClick={handleIncrement}>+</button>
      <span className='cart-counter-quantity1'>{quantity}</span>
       <button className='cart-counter-btn1' onClick={handleDecrement}>-</button>
    </div>
  );
}

export default CartCounterVert;

