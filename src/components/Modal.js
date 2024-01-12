import React from 'react';
import './Modal.css';
import Thanks from './Thanks'; // Adjust the import path

const Modal = ({ onClose, orderNumber }) => {
  console.log('Modal', orderNumber);
  console.log('onClose', onClose);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <Thanks orderNumber={orderNumber} />
      </div>
    </div>
  );
};

export default Modal;