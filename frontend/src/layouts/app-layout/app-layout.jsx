import Drawer from 'devextreme-react/drawer'
import ScrollView from 'devextreme-react/scroll-view'
import React, { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Header, SideNavigationMenu } from '../../components'
import './app-layout.scss'
import { useScreenSize } from '../../utils/media-query'
import { Template } from 'devextreme-react/core/template'
import { useMenuPatch } from '../../utils/patches'
import appInfo from '../../app-info'


const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3
}



export default function AppLayout({ title, children }) {
  const scrollViewRef = useRef(null)
  const navigate = useNavigate()
  const { isXSmall, isLarge } = useScreenSize()
  const [patchCssClass, onMenuReady] = useMenuPatch()
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed
  )

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    )
    event.stopPropagation()
  }, [])

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus
    )
  }, [])

  const onOutsideClick = useCallback(() => {
    setMenuStatus(
      prevMenuStatus => prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus
    )
    return menuStatus === MenuStatus.Closed ? true : false
  }, [isLarge, menuStatus])

  const onNavigationChanged = useCallback(({ itemData, event, node }) => {
    if (menuStatus === MenuStatus.Closed || !itemData.path || node.selected) {
      event.preventDefault()
      return
    }

    navigate(itemData.path)
    scrollViewRef.current.instance.scrollTo(0)

    if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
      setMenuStatus(MenuStatus.Closed)
      event.stopPropagation()
    }
  }, [navigate, menuStatus, isLarge])

  const search = useCallback(() => {
    console.log("search")
  }, [])

  return (
    <div className={'app-layout'}>
      <Header
        menuToggleEnabled
        toggleMenu={toggleMenu}
        title={title}
        search={search}
      />
      <Drawer
        className={['drawer', patchCssClass].join(' ')}
        position={'before'}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? 'shrink' : 'overlap'}
        revealMode={isXSmall ? 'slide' : 'expand'}
        minSize={isXSmall ? 0 : 36}
        maxSize={240}
        shading={isLarge ? false : true}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        template={'menu'}
        animationEnabled={false}
        
      >
        <div className={'container'}>
          <ScrollView ref={scrollViewRef} className={'layout-body with-footer'}>
            <div className={'content'}>{children}</div>
            {/* <footer className={'content-block footer'}>
              Copyright © {new Date().getFullYear()} {appInfo.copyright}
            </footer> */}

          </ScrollView>
        </div>
        <Template name={'menu'}>
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          >
          </SideNavigationMenu>
        </Template>

      </Drawer>

    </div>
  )
}
