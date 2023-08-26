import React from 'react'
import {HahamLayout} from '@/components/Layouts/HahamLayout'
import { useRouter  } from 'next/router'
import { useParams} from 'next/navigation'
export const HahamPage = () => {
  
  // const {module,page}=useRouter().query
  const query=useRouter().query
  const params=useParams()
  console.log('query:',query)
  console.log('params:',params)
  
  return (
    <React.Fragment>
    <HahamLayout>
        <h1>Dynamic Function Page</h1>
        <hr />
        {/* <p>Module:{module}</p>
        <p>Page:{page}</p> */}
        <hr />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur quisquam, iusto provident quas voluptatem, dolores hic, dolorem commodi velit quia corrupti atque minus rerum neque optio. Odio accusantium facere deserunt?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit architecto quaerat praesentium excepturi nobis atque, optio repudiandae velit! Eum debitis similique aliquid tempora quos iusto repellendus nostrum quisquam consectetur id.</p>
    </HahamLayout>
    </React.Fragment>
  )
}

export default HahamPage