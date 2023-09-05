import BrandLogo from '@/components/BrandLogo/BrandLogo'
import ThemeButton from '@/components/Buttons/ThemeButton'
import AccessDenied from '@/components/access-denied'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {
  FaSignOutAlt
} from 'react-icons/fa'
import { Dropdown } from 'flowbite-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const HahamLayout = (props) => {
  const { data } = useSession()
  if (!data) {
    return (
      <>
        <AccessDenied />
      </>
    )
  }
  return (
    <>
      <MainNavbar />
      <div className='flex items-start'>
        <MainSidebar />
        <MainContent>{props.children}</MainContent>
      </div>
    </>
  )
}

export default HahamLayout

export const MainSidebar = () => {
  const currentPage = usePathname()

  return (
    // <div class="relative top-22 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
    <div className='z-40 w-64 ' style={{ height: 'calc(100vh - 72px)' }}>
      <div className='h-full w-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-slate-900'>
        <ul className='space-y-2 font-medium'>
          <li>
            <Link
              href='/haham/main/dashboard'
              className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
            >
              <span className='ml-3'>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href='/haham/main/form-builder'
              className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
            >
              <span className='ml-3'>Form Builder</span>
            </Link>
          </li>
          <li>
            <Link
              href='/haham/invoice/inbox'
              className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
            >
              <span className='flex-1 ml-3 whitespace-nowrap'>
                Invoice list
              </span>
              <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                Pro
              </span>
            </Link>
          </li>
          <li>
            <Link
              href='/haham/invoice/outbox'
              className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
            >
              <span className='flex-1 ml-3 whitespace-nowrap'>Outbox</span>
              <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
                3
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export const MainNavbar = () => {
  return (
    // <nav className='w-full bg-gray-500 dark:bg-slate-900 flex items-center justify-between p-3' >
    <nav className='w-full bg-gray-200 dark:bg-blue-950 border border-b-slate-900 flex items-center justify-between p-3'>
      <a href={'/haham#'}><BrandLogo /></a>
      <div className='flex justify-end items-center'>
        <ThemeButton />

        <UserMenu />
      </div>
    </nav>
  )
}

export const MainContent = ({ children }) => {
  return (
    <main className='h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 mx-4 mt-4 p-4 pb-12'>
      {children}

      <MainContentFooter />
    </main>
  )
}

export const MainContentFooter = () => {
  return (
    <footer className='fixed bottom-0 start-56 end-4  h-12 bg-green-700 text-white '>
      {/* <div className='flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'> */}
      <p className=''>{`(c)${new Date().getFullYear()} qwerty `}</p>
      {/* </div> */}
    </footer>
  )
}

export const UserMenu = () => {
  const { data } = useSession()
  const session = data
  const [userMenu, setUserMenu] = useState(false)

  return (
    <>
      <Dropdown className='' label={session.user.name}  outline={true} >
        <Dropdown.Item>
          <div>{session.user.name}</div>
          <div className='font-medium truncate'>{session.user.email}</div>
        </Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={signOut} icon={()=><FaSignOutAlt />} className='ps-2'>
        Sign out
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}
