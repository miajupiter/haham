import { useRouter } from 'next/router'
import { basePath } from '../../next.config'
 
function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    // marginRight: 10,
    color: router.asPath.split('#')[1] === href.hash ? 'red' : 'initial',
  }
 
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   router.push(href)
  // }
  
  return (
    <button onClick={()=>router.push(href)} style={style}>
      {children}
    </button>
  )
}
 
export default ActiveLink