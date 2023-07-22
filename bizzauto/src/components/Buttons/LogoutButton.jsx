import { basePath } from "../../../next.config"

export const LogoutButton = (props) => {
  const logoutClick = () => {
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('loginInfo')
    if(location.href == basePath + '/'){
      location.reload()
    }else{
      location.href= basePath + '/'
    }
  }

  return (
    <>
      <a className='flex' onClick={logoutClick} {...props}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={22}
          height={22}
          viewBox='0 0 24 24'
        >
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M12 12h7m0 0l-3 3m3-3l-3-3m3-3V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1'
          ></path>
        </svg>
        <span className='ms-2'>{props.children}</span>
      </a>
    </>
  )
}

export default LogoutButton
