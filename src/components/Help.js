import React, { useEffect } from 'react';
import './Help.css';
import { Link } from 'react-router-dom';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



export default function Help() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   const { targetLanguage } = useLanguage();

  const textElements = [
  { className: 'texthh', originalText: 'Головна' },
  { className: 'text-3hh', originalText: 'Допомога' },
  { className: 'text-4hh', originalText: 'Питання та відповіді' },
  { className: 'text-6hh', originalText: 'дбає про своїх клієнтів, тому тут Ви можете знайти питання на свої відповіді' },
  { className: 'text-60hh', originalText: "Доставка виконується після 50% або 100% оплати. <br/> Доставка виконується сервісом 'Нова Пошта'. <br/>Посилка страхується сервісом доставки. У разі пошкодження посилки ми не несемо за це відповідальності." },
  { className: 'text-61hh', originalText: "Якщо у вас виникли питання, з нами можна зв'язатися через електронну пошту або телеграм" },
  { className: 'text-62hh', originalText: 'Послуги повернення ми не надаємо, оскільки кожен продукт виготовляється індивідуально.' },
  { className: 'text-63hh', originalText: "Оптові замовлення виконуються індивідуально від 3-х днів до 2-х тижнів, в залежності від кількості свічок. <br /> Також є можливість виготовлення в будь-якому кольорі та ароматі." },
  { className: 'text-dhh', originalText: "Нам важливо дбати про Вас<br /><br /> У нашому інтернет-магазині ми прагнемо створити найприємніше та найзручніше спілкування з кожним нашим клієнтом. Ваше задоволення - наш головний пріоритет, тому ми готові надати всебічну підтримку та допомогу в усіх питаннях. <br /> <br /> Якщо у вас виникли запитання або сумніви, які не вписуються в перераховані категорії, будь ласка, зв'яжіться з нами. <br /> <br /> Ми завжди тут, щоб зробити ваше шопінг-досвід приємним та безпроблемним. Не соромтеся звертатися до нас і будьте впевнені, що ми докладемо всіх зусиль, щоб забезпечити вам найкращий сервіс та підтримку." },
  
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
    <div className='main-containerhh'>
      <div className='wrapperhh'>
      <Link to="/" className='texthh' style={{ textDecoration: 'none' }}>Головна</Link>
        <span className='text-2hh'>/</span>
        <span className='text-3hh'>Допомога</span>
      </div>
      <div className='wrapper-2hh'>
        <div className='sectionhh'>
          <div className='pichh' />
        </div>
        <div className='sectionhh1'>
        <span className='text-4hh'>Питання та відповіді</span>
        <div className='section-2hh'>
          <span className='text-5hh'>Blisspu</span>
          <span className='text-6hh'>
            
            дбає про своїх клієнтів, тому тут Ви можете знайти питання на свої
            відповіді
          </span>
        </div>
        <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header >{targetLanguage === 'en'
        ? 'Delivery and Payment'
        : 'Доставка та оплата'}</Accordion.Header>
              <Accordion.Body className='text-60hh'>
                Доставка виконується після 50% або 100% оплати. <br/> 
                Доставка виконується сервісом "Нова Пошта". <br/>
                Посилка страхується сервісом доставки. У разі пошкодження посилки ми не несемо за це відповідальність.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header >{targetLanguage === 'en'
        ? 'Contact info'
        : 'Контактна інформація'}</Accordion.Header>
              <Accordion.Body className='text-61hh'>
                Якщо у вас виникли питання, з нами можна зв'язатися через електронну пошту або телеграм
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header >{targetLanguage === 'en'
        ? 'Product return'
        : 'Повернення'}</Accordion.Header>
              <Accordion.Body className='text-62hh'>
                Послуги повернення ми не надаємо, оскільки кожен продукт виготовляється індивідуально.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" >
              <Accordion.Header >{targetLanguage === 'en'
        ? 'Wholesale orders'
        : 'Оптові замовлення'}</Accordion.Header>
              <Accordion.Body className='text-63hh'>
                Оптові замовлення виконуються індивідуально від 3-х днів до 2-х тижнів, в залежності від кількості свічок. <br />
                Також є можливість виготовлення в будь-якому кольорі та ароматі.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </div>
      </div>
      <div className='wrapper-3hh'>
      <span className='text-dhh'>
          Нам важливо дбати про Вас
          <br />
          <br /> У нашому інтернет-магазині ми прагнемо створити найприємніше та
          найзручніше спілкування з кожним нашим клієнтом. Ваше задоволення -
          наш головний пріоритет, тому ми готові надати всебічну підтримку та
          допомогу в усіх питаннях.
          <br />
          <br /> Якщо у вас виникли запитання або сумніви, які не вписуються в
          перераховані категорії, будь ласка, зв'яжіться з нами.
          <br />
          <br /> Ми завжди тут, щоб зробити ваше шопінг-досвід приємним та
          безпроблемним. Не соромтеся звертатися до нас і будьте впевнені, що ми
          докладемо всіх зусиль, щоб забезпечити вам найкращий сервіс та
          підтримку.
        </span>
        <div className='wrapper-mini'>
        <div className='section-3hh'>
          <div className='pic-ahh' />
        </div>
        <div className='boxhh'>
          <div className='img-3hh'>
          </div>
        </div>
        
        <div className='box-3hh'>
          <div className='img-4hh'>
            <div className='grouphh' />
            <div className='box-4hh'>
              <span className='text-ehh'>BLISSPU</span>
            </div>
          </div>
        </div>
        <div className='box-5hh'>
          <div className='pic-bhh' />
        </div>
      </div>
    </div>
  </div>
  );
}
