// import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import cookieCutter from 'cookie-cutter'
import Cookies from 'cookies'

// import en from './i18n/_en.json'
// import tr from './i18n/tr.json'

// const zzDictionary = {
//   en: en,
//   tr: tr,
// }

export const getInitialProps = ({ req }) => {
 
}

export function initMiaTranslate() {}

export function t(key, ...values) {
  if (!key) return
  if (typeof key != 'string') return key
  return key
  // const lang = localStorage.getItem('lang')
  // var text = key

  // if (zzDictionary[lang] && zzDictionary[lang][key]) {
  //   return zzDictionary[lang][key]
  // } else if (zzDictionary.en && zzDictionary.en[key]) {
  //   return zzDictionary.en[key]
  // } else {
  //   return text
  // }
}

export const changeLang = function (lang) {
  localStorage.setItem('lang', lang)
  window.location.reload(false)
}

export const languageList = [
  { lang: 'en', name: 'English' },
  { lang: 'tr', name: `Türkçe` },
  { lang: 'ru', name: 'Русский' },
]

export function initialLang(lang) {
  if (lang || !localStorage.getItem('lang')) {
    localStorage.setItem('lang', lang || navigator.language.split('-')[0])
  }
  if (
    languageList.findIndex((e) => e.lang === localStorage.getItem('lang')) < 0
  ) {
    localStorage.setItem('lang', 'en')
  }

  locale(localStorage.getItem('lang'))
  loadMessages(zzDictionary)
}

initialLang()
