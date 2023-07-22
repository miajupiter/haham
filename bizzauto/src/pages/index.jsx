import { Login } from '@/components/Login/Login'
import ThemeButton from '@/components/Buttons/ThemeButton'
import { Button } from 'flowbite-react'
import LogoutButton from '@/components/Buttons/LogoutButton'
import { basePath } from '../../next.config'
import { useRouter, withRouter } from 'next/router'
// import {  } from 'next/navigation'

import { Inbox } from '@/haham/inbox/index'
import { InboxInvoices } from '@/haham/inbox/invoices'
import { Dashboard } from '@/haham/main/dashboard'
import {
  MainNavbar,
  MainPanel,
  MainSidebar,
} from '@/components/Layouts/MainLayout'
import { useEffect, useState } from 'react'
import NewInvoice from '@/haham/inbox/invoice/new'
import EditInvoice from '@/haham/inbox/invoice/edit'

export function Home(props) {
  const router = useRouter()
  const [page, setPage] = useState()

  router.events.on('hashChangeStart', (e) => {
    // console.log('hashChangeStart e:',e.split('#')[1])
    loadPage(e.split('#')[1])
  })

  router.events.on('hashChangeComplete', (e) => {
    // console.log('hashChangeComplete e:',e.split('#')[1])
  })

  const loadPage=(pageRoute)=>{
    switch (pageRoute) {
      case '/inbox':
        setPage(<Inbox />)
        break
      case '/inbox/invoices':
        setPage(<InboxInvoices />)
        break
      case '/inbox/invoice/new':
        setPage(<NewInvoice />)
        break
        case '/inbox/invoice/edit':
          setPage(<EditInvoice />)
          break
      default:
        setPage(<Dashboard />)
        break
    }
  }

  useEffect(()=>{
    if(!page){
      
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
