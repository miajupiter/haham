import React, { useState } from 'react'
import ScrollView from 'devextreme-react/scroll-view'
import './login-layout.scss'
import {ReactComponent as ZZLogo } from '../../assets/images/logo.svg'
import { t, changeLang, languageList } from '../../utils/translate'
import { DropDownButton } from 'devextreme-react'

const SelectLanguage = () => {
  const [lang] = useState(localStorage.getItem('lang') || 'en')

  return <>
    <DropDownButton
      className={'language'}
      displayExpr={'name'}
      keyExpr={'lang'}
      icon={'fas fa-language'}
      selectedItemKey={lang}
      items={languageList}
      useSelectMode={true}
      onSelectionChanged={(e) => {
        if(e.item && e.item.lang && languageList.findIndex(l=>l.lang===lang)>-1){
          changeLang(e.item.lang)
        }
      }}
      
    />
  </>
}

export default function LoginLayout({ title, description, icon,  children }) {


  return (
    <ScrollView height={'100%'} width={'100%'} className={'with-footer login-layout'}>
      <div className={'dx-card'}>
        <div className={'header'}>
          <div className={'caption'}>
            {/* <div className={'login-logo'}><img src={resim} alt="resim" /> <span>MiaJupiter</span></div> */}
            <ZZLogo height={'40px'} width={'180px'} style={{}} />
            <SelectLanguage />
          </div>
          <div></div>
          {icon}
          <div className={'title'}>{title}</div>
        </div>
        {children}
      </div>
    </ScrollView>
  )
}
