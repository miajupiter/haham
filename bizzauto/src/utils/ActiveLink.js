import { useRouter } from 'next/router'
import { basePath } from '../../next.config'
 
function ActiveLink({ children, href }) {
  const router = useRouter()
  // const href2=(basePath!='' && href.startsWith(basePath)==false)?basePath + href:href
  const style = {
    // marginRight: 10,
    color: router.asPath.split('#')[1] === href.hash ? 'red' : 'initial',
  }
 
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
  
  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
 
export default ActiveLink