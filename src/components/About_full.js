import React, { useEffect } from 'react';
import './About_full.css';
import { Link } from 'react-router-dom';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';

export default function About_full() {
  
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { targetLanguage } = useLanguage();

  const textElements = [
  { className: 'text6', originalText: 'Головна' },
  { className: 'text-63', originalText: 'Про нас' },
  { className: 'text-64', originalText: 'Про нас' },
  { className: 'text-65', originalText: 'Ласкаво просимо до нашого світу ароматичних свічок, де кожна пахощі віддзеркалює красу та затишок. Ми - команда ентузіастів, які пристрасно закохані в мистецтво створення неповторних ароматів.<br /><br />' },
  { className: 'text-66', originalText: 'У нашому асортименті ви знайдете найкращі ароматичні свічки, виготовлені з натуральних матеріалів. Кожен продукт ретельно підібраний з урахуванням найвищих стандартів якості, щоб подарувати вам неповторний ефект та приємні відчуття.' },
  { className: 'text-67', originalText: 'Наша місія<br />Наша місія - принести радість та затишок у ваш дім, створивши для вас атмосферу спокою та гармонії. Ми віримо, що пахощі можуть створити особливий настрій та заповнити ваш простір невимушеною теплотою та затишком.<br /><br />У нашому асортименті ви знайдете найкращі ароматичні свічки,виготовлені з натуральних матеріалів. Кожен продукт ретельно підібраний з урахуванням найвищих стандартів якості, щоб подарувати вам неповторний ефект та приємні відчуття.' },
  { className: 'text-68', originalText: 'Наші цінності<br />У нашій роботі ми виховуємося на принципах якості, довіри та відповідальності перед нашими клієнтами. Ми прагнемо створювати продукцію, яка не лише приносить задоволення, але й зберігає наш спільний дом - планету.<br /><br />Приєднуйтесь до нашої спільноти<br />Долучіться до нашої спільноти ароматних насолод та дозвольте нам занурити вас у світ неповторних ароматів. Ми завжди раді бачити нових клієнтів і поділитися нашою пристрастю до створення особливих моментів.<br /><br />Дякуємо за те, що обрали наш інтернет-магазин ароматичних свічок для вашого дому. Разом ми створимо простір повного затишку та приємних відчуттів.<br /><br />Сердечно,<br /> Команда' },
];


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


  return (
    <div className='main-container6'>
      <div className='section6'>
        <Link to="/" className='text6' style={{ textDecoration: 'none' }}>Головна</Link>
        <span className='text-62'>/</span>
        <span className='text-63'>Про нас</span>
      </div>
      <span className='text-64'>Про нас</span>
      <div className='box6'>
        <div className='pic6' />
        <div className='group6'>
          <span className='text-65'>
            Ласкаво просимо до нашого світу ароматичних свічок, де кожна пахощі
            віддзеркалює красу та затишок. Ми - команда ентузіастів, які
            пристрасно закохані в мистецтво створення неповторних ароматів.
            <br />
            <br />
          </span>
          <span className='text-66'>
            У нашому асортименті ви знайдете найкращі ароматичні свічки,
            виготовлені з натуральних матеріалів. Кожен продукт ретельно
            підібраний з урахуванням найвищих стандартів якості, щоб подарувати
            вам неповторний ефект та приємні відчуття.
          </span>
        </div>
        <div className='img6' />
        <span className='text-67'>
          Наша місія
          <br />
          Наша місія - принести радість та затишок у ваш дім, створивши для вас
          атмосферу спокою та гармонії. Ми віримо, що пахощі можуть створити
          особливий настрій та заповнити ваш простір невимушеною теплотою та
          затишком.
          <br />
          <br />У нашому асортименті ви знайдете найкращі ароматичні свічки,
          виготовлені з натуральних матеріалів. Кожен продукт ретельно
          підібраний з урахуванням найвищих стандартів якості, щоб подарувати
          вам неповторний ефект та приємні відчуття.
          <br />
        </span>
        <div className='group-621'>
        <div className='pic-62' />
        <div className='pic-621' />
        </div>
        <div className='group-62'>
          <span className='text-68'>
            Наші цінності
            <br />У нашій роботі ми виховуємося на принципах якості, довіри та
            відповідальності перед нашими клієнтами. Ми прагнемо створювати
            продукцію, яка не лише приносить задоволення, але й зберігає наш
            спільний дом - планету.
            <br />
            <br />
            Приєднуйтесь до нашої спільноти
            <br />
            Долучіться до нашої спільноти ароматних насолод та дозвольте нам
            занурити вас у світ неповторних ароматів. Ми завжди раді бачити
            нових клієнтів і поділитися нашою пристрастю до створення особливих
            моментів.
            <br />
            <br />
            Дякуємо за те, що обрали наш інтернет-магазин ароматичних свічок для
            вашого дому. Разом ми створимо простір повного затишку та приємних
            відчуттів.
            <br />
            <br />
            Сердечно,<br />
              Команда
          </span>
          <span className='text-69'>Blisspu</span>
        </div>
       </div>
      </div>
  );
}

