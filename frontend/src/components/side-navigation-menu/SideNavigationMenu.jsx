import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import TreeView from 'devextreme-react/tree-view'
import { useNavigate } from 'react-router-dom'
import { navigation } from '../../app-navigation'
import { useNavigation } from '../../providers/navigation'
import { useScreenSize } from '../../utils/media-query'
import './SideNavigationMenu.scss'
import * as events from 'devextreme/events'
// import UserPanel from './../user-panel/UserPanel';
import ContextMenu, { Position } from 'devextreme-react/context-menu'
import {Link, Button} from '../ui/FormItems'
import { useAuth } from '../../providers/auth-provider'

export default function SideNavigationMenu(props) {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady,
  } = props
  const { signOut } = useAuth()
	const navigate = useNavigate()

	const navigateToProfile = useCallback(() => navigate('/profile'), [navigate])

  const { isLarge } = useScreenSize()
  function normalizePath() {
    return navigation.map((item) => ({
      ...item,
      expanded: isLarge,
      path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
    }))
  }

  const items = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const {
    navigationData: { currentPath },
  } = useNavigation()

  const treeViewRef = useRef(null)
  const wrapperRef = useRef()
  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current
      if (prevElement) {
        events.off(prevElement, 'dxclick')
      }

      wrapperRef.current = element
      events.on(element, 'dxclick', (e) => {
        openMenu(e)
      })
    },
    [openMenu]
  )

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance
    if (!treeView) {
      return
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath)
      treeView.expandItem(currentPath)
    }

    if (compactMode) {
      treeView.collapseAll()
    }
  }, [currentPath, compactMode])

  return (
    <div
      className={'dx-swatch-additional side-navigation-menu'}
      ref={getWrapperRef}
    >
      {children}

      <div
        className={'menu-container'}
        // style={{ left: 'unset', right: '0px', paddingBottom: '60px' }}
      >
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={'path'}
          selectionMode={'single'}
          focusStateEnabled={false}
          expandEvent={'click'}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={'100%'}
          animationEnabled={false}
          activeStateEnabled={true}
        />

        <div className={'kullanici-panel'}>
        
          <Button onClick={navigateToProfile} stylingMode='text' className='flex-between' width={'100%'}>
            {/* <img src={'https://randomuser.me/api/portraits/women/12.jpg'} alt={'userpicture'} className='user-img' /> */}
            <i class="fa-solid fa-user "></i>
            <div style={{marginLeft:'18px'}}>Kullanici adi</div>
          </Button>
          
          <Button onClick={signOut} className='flex-between' stylingMode='text' width={'100%'}>
          <i class="fa-solid fa-person-running "></i>
          <div style={{marginLeft:'18px'}}>Çıkış</div>
          </Button>  
        </div>
      </div>
    </div>
  )
}
