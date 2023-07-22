'use client'

import { Sidebar, Dropdown, Navbar, Avatar } from 'flowbite-react'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi'
import BrandLogo from '../BrandLogo/BrandLogo'
import ThemeButton from '../Buttons/ThemeButton'
import LogoutButton from '../Buttons/LogoutButton'
import { useEffect, useState } from 'react'
import { basePath } from '../../../next.config'

import ActiveLink from '@/utils/ActiveLink'
import { useRouter } from 'next/router'

export const MainNavbar = (props) => {
  const [loginInfo, setLoginInfo] = useState(false)

  useEffect(() => {
    try {
      let s = localStorage.getItem('loginInfo')
      if (s) {
        setLoginInfo(JSON.parse(s))
      }
    } catch (error) {
      console.error('try err:', error)
    }
  }, [])

  return (
    <Navbar fluid rounded className=' bg-black text-white dark:bg-slate-900'>
      <Navbar.Brand href='/'>
        <BrandLogo />
      </Navbar.Brand>
      <div className='flex md:order-2'>
        
        <ThemeButton />
        {loginInfo ? (
          <Dropdown
            inline
            label={
              <Avatar alt='User settings' img={loginInfo.picture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>{loginInfo.name}</span>
              <span className='block truncate text-sm font-medium'>
                {loginInfo.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>My Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className='px-2 bg-zinc-600 text-white hover:bg-zinc-500 hover:text-gray-300'>
              <LogoutButton> Sign out</LogoutButton>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <div>...</div>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}


export const SidebarCustomTheme = {
  root: {
    base: 'h-full',
    collapsed: {
      on: 'w-16',
      off: 'w-64',
    },
    inner:
      'h-full overflow-y-auto overflow-x-hidden py-1 px-1  bg-gray-200  dark:bg-slate-900 shadow',
  },
  collapse: {
    button:
      'group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700',
    icon: {
      base:
        'h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
      open: {
        off: '',
        on: 'text-gray-900',
      },
    },
    label: {
      base: 'ml-3 flex-1 whitespace-nowrap text-left',
      icon: 'h-6 w-6',
    },
    list: 'space-y-2 py-2',
  },
  cta: {
    base: 'mt-6 rounded-lg p-4 bg-gray-100 dark:bg-slate-900',
    color: {
      blue: 'bg-cyan-50 dark:bg-cyan-900',
      dark: 'bg-dark-50 dark:bg-dark-900',
      failure: 'bg-red-50 dark:bg-red-900',
      gray: 'bg-alternative-50 dark:bg-alternative-900',
      green: 'bg-green-50 dark:bg-green-900',
      light: 'bg-light-50 dark:bg-light-900',
      red: 'bg-red-50 dark:bg-red-900',
      purple: 'bg-purple-50 dark:bg-purple-900',
      success: 'bg-green-50 dark:bg-green-900',
      yellow: 'bg-yellow-50 dark:bg-yellow-900',
      warning: 'bg-yellow-50 dark:bg-yellow-900',
    },
  },
  item: {
    base:
      'flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700',
    active: 'bg-gray-100 dark:bg-slate-900',
    collapsed: {
      insideCollapse: 'group w-full ps-8 transition duration-75',
      noIcon: 'font-bold',
    },
    content: {
      base: 'px-3 flex-1 whitespace-nowrap',
    },
    icon: {
      base:
        'h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
      active: 'text-gray-700 dark:text-gray-100',
    },
    label: '',
    listItem: '',
  },
  items: '',
  itemGroup:
    'mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700',
  logo: {
    base: 'mb-5 flex items-center pl-2.5',
    collapsed: {
      on: 'hidden',
      off:
        'self-center whitespace-nowrap text-xl font-semibold dark:text-white',
    },
    img: 'mr-3 h-6 sm:h-7',
  },
}


export const MainSidebar = (props) => {
  const router = useRouter()

  return (
    <>
      
      <Sidebar
        theme={SidebarCustomTheme}
        className='fixed top-22 start-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
      >
        
       
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <ActiveLink href={{hash:`/main/dashboard`}} >Dashboard</ActiveLink>
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label='Invoice'>
              <Sidebar.Item>
                  <ActiveLink href={{hash:`/invoice/inbox`}} >Inbox</ActiveLink>
              </Sidebar.Item>
              <Sidebar.Item>
                  <ActiveLink href={{hash:`/invoice/outbox`}} >Outbox</ActiveLink>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item icon={HiShoppingBag}>
              <ActiveLink href={{hash:`/invoice/outbox/create`}} >Create Outbox Invoice</ActiveLink>
            </Sidebar.Item>
            <Sidebar.Item icon={HiShoppingBag}>
              <ActiveLink href={{hash:`/products`}} >Products</ActiveLink>
            </Sidebar.Item>
            <Sidebar.Item href='#/users' icon={HiUser}>
              <p>Users</p>
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiArrowSmRight}>
              <p>Sign In</p>
            </Sidebar.Item>
            <Sidebar.Item href='#' icon={HiTable}>
              <p>Sign Up</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  )
}

export const MainPanel = (props) => {
  return (
    <div className='p-4 sm:ms-64'>
      <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
        {props.children}
      </div>
    </div>
  )
}
export const MainLayout = (props) => {
  const router = useRouter()
  console.log('router.basePath:', router.basePath)
  console.log('router.pathname:', router.pathname)
  console.log('router.defaultLocale:', router.defaultLocale)
  console.log('router.query:', router.query)
  console.log('router.asPath:', router.asPath)
  console.log('router.route:', router.route)
  
  return (
    <>
      <MainNavbar />
      <MainSidebar />

      <MainPanel {...props} />
    </>
  )
}

// export default MainLayout
