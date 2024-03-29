// `use client`

import {  useEffect } from 'react'
import { useTheme } from 'next-themes'
const IconSun = ({size=18}) => (
  <svg
    fill='none'
    viewBox='3 3 18 18'
    width={size}
    height={size}
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      fill='currentColor'
      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    ></path>
  </svg>
)
const IconMoon = ({size=18}) => (
  <svg
    fill='none'
    viewBox='2 2 20 20'
    width={size}
    height={size}
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      fill='currentColor'
      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    ></path>
  </svg>
)

const ThemeButton = (props = {}) => {
  // const [theme, setTheme ] = useState()
  const {theme, setTheme}=useTheme()

  // tema.toggleMode=()=>{
  //   console.log('i am here...')
  //   setTheme(theme === 'light' ? 'dark' : 'light')
  //   localStorage.setItem('theme', theme)
  // }

  
  // const switchTheme = () => {
  //   tema.mode=theme
  //   setTheme(theme === 'light' ? 'dark' : 'light')
  //   localStorage.setItem('theme', theme)
    
  // }
  useEffect(() => {
    let val = localStorage.getItem('theme') || 'dark'
    setTheme(val)
    
    
  }, [])
  return (
    
     <button
      className='mt-0 px-2 py-0 bg-transparent'
      onClick={()=>setTheme(theme==='dark'?'light':'dark')}
      {...props}
    >
      {theme === 'light' ? (<IconMoon size={22} /> ): (<IconSun size={22} />)}
    </button>
  )
}

export default ThemeButton
