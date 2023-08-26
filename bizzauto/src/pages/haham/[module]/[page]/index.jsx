import React, { useEffect, useState } from 'react'
import {HahamLayout} from '@/components/Layouts/HahamLayout'
import { useRouter  } from 'next/router'
import { useParams} from 'next/navigation'
import {Button, TextBox} from 'devextreme-react'

export const HahamPage = () => {
  const [result,setResult]=useState([])
  const query=useRouter().query
  
  console.log('query:',query)
  
  useEffect(()=>{
    if(query.module=='invoice' && query.page=='inbox'){
      fetch('https://jsonplaceholder.typicode.com/users').then(resp=>resp.json()).then(resp=>{
        
        setResult(resp)
      })
      .catch(console.error)
      // const val=await (await ).json()
      // setResult(val)
    }else    if(query.module=='invoice' && query.page=='outbox'){
      fetch('https://jsonplaceholder.typicode.com/users').then(resp=>resp.json()).then(resp=>{
        
        setResult(resp)
      })
      .catch(console.error)
      // const val=await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
      // setResult(val)
    }else {

    }
  },[query])

  return (
    <React.Fragment>
    <HahamLayout>
        <h1>Dynamic Page</h1>
        <hr />
        <p>Module:{query.module}</p>
        <p>Page:{query.page}</p>
        <hr />
        <p>
          <TextBox
            stylingMode='outlined'
            labelMode='floating'
            label='Label'
            value='value deger'
          />
        </p>
        {result && result.map(e=>(<p>{query && query.page} {e.name} - {e.phone}</p>))}
    </HahamLayout>
    </React.Fragment>
  )
}

export default HahamPage