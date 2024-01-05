import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [targetLanguage, setTargetLanguage] = useState('uk');

  const handleLanguageChange = (language) => {
    setTargetLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ targetLanguage, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};
