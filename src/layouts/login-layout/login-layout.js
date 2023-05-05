import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import './login-layout.scss';


export default function LoginLayout({ title, description, children }) {
  return (
    <ScrollView height={'100%'} width={'100%'} className={'with-footer login-layout'}>
      <div className={'dx-card'}>
        <div className={'header'}>
          <div className={'title'}>{title}</div>
          <div className={'description'}>{description}</div>
        </div>
        {children}
      </div>
    </ScrollView>
)}
