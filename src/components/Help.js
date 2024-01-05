import React, { useEffect } from 'react';
import './Help.css';
import { Link } from 'react-router-dom';
import translateText from '../components/translateText';
import { useLanguage } from '../components/LanguageContext';

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
  { className: 'text-7hh', originalText: 'Які способи оплати ви приймаєте?' },
  { className: 'text-8hh', originalText: 'Як можу відстежити моє замовлення?' },
  { className: 'text-9hh', originalText: 'Чи можу я повернути чи обміняти свічку, яка мені не підійшла?' },
  { className: 'text-ahh', originalText: 'Чи є можливість доставки за межі країни?' },
  { className: 'text-bhh', originalText: "Якщо у мене виникли проблеми з моїм замовленням, як зв'язатися з вашоюслужбою підтримки?" },
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
        <span className='text-4hh'>Питання та відповіді</span>
        <div className='section-2hh'>
          <span className='text-5hh'>Blisspu</span>
          <span className='text-6hh'>
            
            дбає про своїх клієнтів, тому тут Ви можете знайти питання на свої
            відповіді
          </span>
        </div>
        <span className='text-7hh'>Які способи оплати ви приймаєте?</span>
        <div className='pic-2hh' />
        <div className='pic-3hh' />
        <span className='text-8hh'>Як можу відстежити моє замовлення?</span>
        <div className='pic-4hh' />
        <div className='imghh' />
        <span className='text-9hh'>
          Чи можу я повернути чи обміняти свічку, яка мені не підійшла?
        </span>
        <div className='pic-5hh' />
        <div className='pic-6hh' />
        <span className='text-ahh'>Чи є можливість доставки за межі країни?</span>
        <div className='pic-7hh' />
        <div className='pic-8hh' />
        <span className='text-bhh'>
          Якщо у мене виникли проблеми з моїм замовленням, як зв'язатися з вашою
          службою підтримки?
        </span>
        <div className='img-2hh' />
        <div className='pic-9hh' />
      </div>
      <div className='wrapper-3hh'>
        <div className='section-3hh'>
          <div className='pic-ahh' />
        </div>
        <div className='boxhh'>
          <div className='img-3hh'>
            <div className='box-2hh' />
            <div className='section-4hh'>
              <span className='text-chh'>BLISSPU</span>
            </div>
          </div>
        </div>
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
  );
}
