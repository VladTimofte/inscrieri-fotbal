"use client";
import { createContext, useContext, useState, useEffect } from "react";
import en from "../public/locales/en.json";
import ro from "../public/locales/ro.json";

const translations = { en, ro };

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("ro"); // Default: Română
  const [t, setT] = useState(translations["ro"]); // Text curent

  // La montare, verifică localStorage pentru limbă
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setT(translations[savedLanguage]);
    }
  }, []);

  // Funcție pentru schimbarea limbii și salvarea în localStorage
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      setT(translations[lang]);
      localStorage.setItem("language", lang);
    }
  };

  return (
    <TranslationContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook personalizat pentru a accesa traducerile
export function useTranslation() {
  return useContext(TranslationContext);
}
