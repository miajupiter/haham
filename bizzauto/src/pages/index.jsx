import { Login } from '@/components/Login/Login'
import ThemeButton from '@/components/Buttons/ThemeButton'
import { Button } from 'flowbite-react'
import LogoutButton from '@/components/Buttons/LogoutButton'
import { basePath } from '../../next.config'
import { useRouter, withRouter } from 'next/router'

import {
  MainNavbar,
  MainPanel,
  MainSidebar,
} from '@/components/Layouts/MainLayout'
import { useEffect, useState } from 'react'
import {Haham} from '@/haham/index'

export function Home(props) {
  const router = useRouter()
  const [page, setPage] = useState()

  router.events.on('hashChangeStart', (e) => {
    // console.log('hashChangeStart e:',e.split('#')[1])
    loadPage(e.split('#/')[1])
  })

  router.events.on('hashChangeComplete', (e) => {
    // console.log('hashChangeComplete e:',e.split('#')[1])
  })

  const loadPage=(pageRoute)=>{
    const separated=pageRoute.split('/')
    const obj={
      module:BriefCase(separated[0]),
      page:separated.length>1 && BriefCase(separated[1]),
      func:separated.length>=2 && BriefCase(separated[2] || 'index'),
      id:separated.length>3 && BriefCase(separated[3] || ''),
    }
    if(Haham[obj.module] && Haham[obj.module][obj.page]){
      if(Haham[obj.module][obj.page][obj.func]){
        setPage(Haham[obj.module][obj.page][obj.func])
      }else{
        setPage(Haham[obj.module][obj.page])
      }
      
    }else{
      setPage(JSON.stringify(obj,null,2))
    }
    
  }

  useEffect(()=>{
    if(!page){
      loadPage(router.asPath.split('#/')[1])
    }
  },[router])
  return (
    <>
      <MainNavbar />
      <MainSidebar />
      <MainPanel>{page}</MainPanel>
    </>
  )
}

export default Home

// {router.pathname=='/dashboard'?<Dashboard />:<></>}
//       {router.pathname=='/inbox'?<Inbox />:<></>}
//       {router.pathname=='/inbox/invoices'?<InboxInvoices />:<></>}


function BriefCase(str){
  return str.length>1?str.substring(0,1).toUpperCase() + str.slice(1):str
}