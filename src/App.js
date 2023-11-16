import React  from 'react'
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import AppRouter from './components/AppRouter';
import Contexts from './components/Contexts';





i18n.use(initReactI18next).use(LanguageDetector).use(HttpApi).init({
  supportedLngs: ['en', 'ru', 'de'],
  fallbackLng: 'ru',
  detection: {
    order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
    caches: ['cookie']
  },
  backend: {
    loadPath: '/locales/{{lng}}/translation.json'
  }
})

function App() {


  return (
    <Contexts>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Contexts>
  )
}

export default App;
