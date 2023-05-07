// import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { formatMessage, loadMessages, locale } from 'devextreme/localization'
import en from './i18n/_en.json'
import tr from './i18n/tr.json'



export function initialLang(lang){
  if(lang || !localStorage.getItem('lang')){
    localStorage.setItem('lang',lang || navigator.language.split('-')[0])
  }
  loadMessages({
    en:en,
    tr:tr
  })

  locale(localStorage.getItem('lang'))
}

initialLang()


export function t(key, ...values) {
  return formatMessage(key,values)
}

export const changeLang=function(lang){
  localStorage.setItem('lang',lang)
  window.location.reload(false)
}


export const languageList=[
    { lang:'en', name: 'English', translated: 'user' },
    { lang:'tr', name: `Türkçe`, icon1: 'group' },
    { lang:'ru', name: 'Russky', icon1: 'runner' },
  ]


// export const languageList=()=>{
//   return [
//     { id: 1, lang:'en', name: 'English', icon: 'user' },
//     { id: 2, lang:'tr', name: 'Türkçe', icon: 'group' },
//     { id: 3, lang:'ru', name: 'Russky', icon: 'runner' },
//   ]
// }