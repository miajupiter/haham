import React,{useCallback} from 'react'
import Toolbar, { Item } from 'devextreme-react/toolbar'
import Button from 'devextreme-react/button'
import UserPanel from '../user-panel/UserPanel'
import './Header.scss'
import { Template } from 'devextreme-react/core/template'
import { ReactComponent as MiaLogo } from '../../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom'

export default function Header({
  menuToggleEnabled,
  title,
  toggleMenu,
  search,
}) {
  const navigate = useNavigate()

	const navigateToHome = useCallback(() => navigate('/home'), [navigate])

  return (
    <header className={'header-component'}>
      <Toolbar className={'header-toolbar'}>
        <Item
          visible={menuToggleEnabled}
          location={'before'}
          widget={'dxButton'}
          cssClass={'menu-button'}
        >
          <Button icon='menu' stylingMode='text' onClick={toggleMenu} />
        </Item>

        <Item
          location={'before'}
          cssClass={'header-title'}
        >
          <Button onClick={navigateToHome} stylingMode='text' style={{color:'goldenrod', backgroundColor:'transparent'}} >
            <MiaLogo height={45} width={200} />
          </Button>
        </Item>
        <Item location={'after'}>
          <Button icon={'search'} onClick={search} />
        </Item>
        <Item
          location={'after'}
          locateInMenu={'auto'}
          menuItemTemplate={'userPanelTemplate11'}
        >
          <Button
            className={'user-button authorization'}
            width={210}
            height={'100%'}
            stylingMode={'text'}
          >
            <UserPanel menuMode={'context'} />
          </Button>
        </Item>
        <Template name={'userPanelTemplate11'}>
          <UserPanel menuMode={'list'} />
        </Template>
      </Toolbar>
    </header>
  )
}
