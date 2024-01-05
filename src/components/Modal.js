// Modal.js
import React from 'react';
import './Modal.css';
import Thanks from './Thanks'; // Adjust the import path

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <Thanks />
      </div>
    </div>
  );
};

export default Modal;
