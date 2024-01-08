import React, { useState, useEffect, useRef } from 'react';
import './Oformlenie.css';
import CustomSelect from './CustomSelect';
import NovaPoshta from './NovaPoshta';
import { useCart } from '../containers/CartContext';
import Modal from './Modal';
import translateText from './translateText';
import { useLanguage } from './LanguageContext';
import { Link } from 'react-router-dom';


export default function Oformlenie() {

   const [deliveryMethod, setDeliveryMethod] = useState('');
  const [city, setCity] = useState('');
  const [branches, setBranches] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cardPayment');
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
   const [totalPrice, setTotalPrice] = useState(0)
   const formRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeliveryMethodChange = (event) => {
    setDeliveryMethod(event.target.value);
  };
 const { cart, clearCart } = useCart();
 const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



useEffect(() => {
  // Calculate the total price when the cart changes
  const calculatedTotalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = calculatedTotalPrice.toFixed(2);
  setTotalPrice(formattedTotalPrice);
}, [cart]);

 const handleSubmit1 = async (event) => {
  event.preventDefault();

  // Collect cart data in the required format
  const cartData = cart.map((item) => ({
    productId: item.id,
    color: item.colors[0]?.color || '', // Adjust as per your data structure
    quantity: item.quantity,
  }));

   const formData = new FormData(formRef.current);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  const firstName = formObject.firstName;
  const lastName = formObject.lastName;
  const email = formObject.email;
  const phoneNumber = formObject.phoneNumber;
  const deliveryMethod = formObject.deliveryMethod;
  const paymentMethod = formObject.paymentMethod;


  if (!firstName || !lastName || !email || !phoneNumber || !deliveryMethod || !paymentMethod || cartData.length === 0) {
    // If any required field is empty, display an error message
    alert('Please fill in all required fields');
    return;
  }

  // Combine form and cart data
  const requestData = {
    phone_number: phoneNumber,
    email: email,
    first_name: firstName,
    last_name: lastName,
    infOrder: JSON.stringify(cartData),
    selectcity: deliveryMethod,
    selecthouse: paymentMethod,
    money: paymentMethod,
  };

  // Make API call
  try {

    const response = await fetch('http://localhost:3000/api/order/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (response.ok) {
      // Handle successful response, e.g., redirect to a success page

      openModal();
      clearCart();
    } else {
      // Handle error response
      throw new Error(response.message);
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error.message);
  };
};


  const TextInput = ({ label, value, onChange }) => (
    <div className='text-input'>
      <span className='text-1eo'>{label}</span>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const CheckBoxWithAutocomplete = ({ label, options, selectedValue, onValueChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    // Filter options based on inputValue, you need to implement this logic
    const filtered = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  return (
    <div className='text-input'>
      <span className='text-1eo'>{label}</span>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className='autocomplete-options'>
        {filteredOptions.map(option => (
          <div key={option} onClick={() => onValueChange(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const handlePayButtonClick = async () => {

  try {
    // Create a synthetic event object
    const syntheticEvent = { preventDefault: () => {} };

    // Manually call your custom submit function with the synthetic event
    await handleSubmit1(syntheticEvent);

  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

 const { targetLanguage } = useLanguage();
  const viewportWidth = window.innerWidth;
  return (
    <div className='main-containero'>
     <div className='wrappero'>
       <Link to="/" className='texto' style={{ textDecoration: 'none' }}>{targetLanguage === 'en'
        ? 'Main'
        : 'Головна'}</Link>
        <span className='text-2o'>/</span>
        <Link to="/all" className='text-3o' style={{ textDecoration: 'none' }}>
        {targetLanguage === 'en'
        ? 'Catalogue'
        : 'Каталог'}</Link>
        <span className='text-4o'>/</span>
        <Link to="/cart" className='text-5o' style={{ textDecoration: 'none' }}> {targetLanguage === 'en'
        ? 'Cart'
        : 'Корзина'}</Link>
        <span className='text-8o'>/</span>
        <Link to="/cart" className='text-9o' style={{ textDecoration: 'none' }}> {targetLanguage === 'en'
        ? 'Placing order'
        : 'Оформлення замовлення'}</Link>
      </div>
    <div className='wrappero11'>
    <div className='wrappero1'>
     
        <span className='text-14o'>{targetLanguage === 'en'
        ? 'Placing order'
        : 'Оформлення'}</span>
        <span className='text-15o'>{targetLanguage === 'en'
        ? 'Your data'
        : 'Ваші дані'}</span>
        <form className='myForm' onSubmit={handleSubmit1} ref={formRef}>
          <div className='form-row'>
            <input type='text' name='firstName' className='text-input' placeholder={targetLanguage === 'en'
        ? '*Name'
        : '*Ім’я'} />
            <input type='text' name='lastName' className='text-input' placeholder={targetLanguage === 'en'
        ? '*Surname'
        : '*Прізвище'} />
          </div>
          <div className='form-row'>
            <input type='email' name='email' className='text-input' placeholder={targetLanguage === 'en'
        ? '*Email'
        : '*Електрона адреса'} />
            <input type='text' name='phoneNumber' className='text-input' placeholder={targetLanguage === 'en'
        ? '*Phone number'
        : '*Номер телефону'} />
          </div>
        
        <div className='form-zag'>
          <span className='text-1ao'>{targetLanguage === 'en'
        ? 'Delivery Method'
        : 'Спосіб доставки'}</span>
          <span className='text-1bo'>
         {targetLanguage === 'en'
      ? 'We send our candles exclusively by Nova Poshta.'
      : 'Ми відправляємо свої свічки виключно Новою Поштою.'}
        {targetLanguage === 'en' && <br />}
        {targetLanguage === 'uk' && <br />}
        {targetLanguage === 'en' && 'If you are in Dnipro, then delivering through the city.'}
        {targetLanguage === 'uk' && 'Якщо ви знаходитесь у Дніпрі, то доставка містом.'}
          </span>
        </div >
       {viewportWidth < 1200 && viewportWidth > 991 ? (
          <>
            <div className='form-row1'>
              <input
                type='radio'
                id='novaPoshta'
                name='deliveryMethod'
                value='novaPoshta'
                checked={deliveryMethod === 'novaPoshta'}
                onChange={handleDeliveryMethodChange}
              />
              <label htmlFor='novaPoshta' className='radio-label'>
                {targetLanguage === 'en'
                  ? 'Delivering by Nova Poshta'
                  : 'Доставка новою поштою'}
              </label>
            </div>
            <div className='form-row1'>
              <input
                type='radio'
                id='cityDelivery'
                name='deliveryMethod'
                value='cityDelivery'
                checked={deliveryMethod === 'cityDelivery'}
                onChange={handleDeliveryMethodChange}
              />
              <label htmlFor='cityDelivery' className='radio-label'>
                {targetLanguage === 'en'
                  ? 'Delivery around the city'
                  : 'Доставка по місту'}
              </label>
            </div>
          </>
        ) : (
          <div className='form-row'>
            <input
              type='radio'
              id='novaPoshta'
              name='deliveryMethod'
              value='novaPoshta'
              checked={deliveryMethod === 'novaPoshta'}
              onChange={handleDeliveryMethodChange}
            />
            <label htmlFor='novaPoshta' className='radio-label'>
              {targetLanguage === 'en'
                ? 'Delivering by Nova Poshta'
                : 'Доставка новою поштою'}
            </label>
            <input
              type='radio'
              id='cityDelivery'
              name='deliveryMethod'
              value='cityDelivery'
              checked={deliveryMethod === 'cityDelivery'}
              onChange={handleDeliveryMethodChange}
            />
            <label htmlFor='cityDelivery' className='radio-label'>
              {targetLanguage === 'en'
                ? 'Delivery around the city'
                : 'Доставка по місту'}
            </label>
          </div>
        )}


        
        {deliveryMethod === 'novaPoshta' && (
          <div className='form-row'>
            <NovaPoshta />
          </div>
        )}

       
        <div className='form-zag1'>
          <span className='text-20o'>{targetLanguage === 'en'
        ? 'Payment method'
        : 'Спосіб оплати'}</span>
        </div>
          {viewportWidth < 1200 && viewportWidth > 991 ? (
            <>
              <div className='form-row1'>
                <input
                  type='radio'
                  id='cardPayment'
                  name='paymentMethod'
                  value='cardPayment'
                  checked={paymentMethod === 'cardPayment'}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor='cardPayment' className='radio-label'>
                  {targetLanguage === 'en'
                    ? 'Payment by details'
                    : 'Оплата за реквізитами'}
                </label>
              </div>
              <div className='form-row1'>
                <input
                  type='radio'
                  id='cashPayment'
                  name='paymentMethod'
                  value='cashPayment'
                  checked={paymentMethod === 'cashPayment'}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor='cashPayment' className='radio-label'>
                  {targetLanguage === 'en'
                    ? 'Cash on delivery'
                    : 'Наложеним платежем'}
                </label>
              </div>
            </>
          ) : (
            <div className='form-row'>
              <input
                type='radio'
                id='cardPayment'
                name='paymentMethod'
                value='cardPayment'
                checked={paymentMethod === 'cardPayment'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor='cardPayment' className='radio-label'>
                {targetLanguage === 'en'
                  ? 'Payment by details'
                  : 'Оплата за реквізитами'}
              </label>
              <input
                type='radio'
                id='cashPayment'
                name='paymentMethod'
                value='cashPayment'
                checked={paymentMethod === 'cashPayment'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor='cashPayment' className='radio-label'>
                {targetLanguage === 'en'
                  ? 'Cash on delivery'
                  : 'Наложеним платежем'}
              </label>
            </div>
          )}

      
        <span className='text-26o'>
        {targetLanguage === 'en'
        ? '*Please indicate "Candles" in the comments during payment, and send a screenshot of the payment to our Instagram to confirm the order'
        : '*Будь ласка, вказуйте під час оплати в коментарях "Свічки", та скріншот оплати відправляйте у наш інстаграм, для підтвердження замовлення'}
          
        </span>      
      </form>
       {isModalOpen && <Modal onClose={closeModal} />}
      </div>
        <div className='boxo'>
          <span className='text-ao'>{targetLanguage === 'en'
        ? 'Order'
        : 'Замовлення'}</span>
          {cart.map((item) => (
              <div key={item.productId}>
                <span className='text-b'>{item.quantity}x {item.name}</span>
                <span className='text-c'>{`${targetLanguage === 'en'
        ? 'Price'
        : 'Ціна'}: ${item.price} ${targetLanguage === 'en'
        ? 'uah'
        : 'грн'}`}</span>
                <hr className='custom-hr'/>
              </div>
            ))}
          <span className='text-11o'>{targetLanguage === 'en'
        ? 'Order Amount'
        : 'Всього до сплати'}</span>
          <span className='text-12o'>{totalPrice} {targetLanguage === 'en'
        ? 'uah'
        : 'грн'}</span>
          <button type='button' className='box-2o' onClick={handlePayButtonClick}>
            <span className='text-13o'>{targetLanguage === 'en'
        ? 'Checkout'
        : 'Сплатити'}</span>
            <div className='pic-2o' />
          </button>
        </div>
    </div>
    </div>

  );
}
