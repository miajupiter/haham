import { useSession } from 'next-auth/react'
import {HahamLayout} from '@/components/Layouts/HahamLayout'
import AccessDenied from '@/components/access-denied'
export const Haham = () => {
  const { data } = useSession()
  if (!data) {
    return <AccessDenied />
  }

  return (
    <HahamLayout>
        <h1>Form Title</h1>
        <hr />
        <a href='/haham/invoice/inbox'>module</a>
        <hr />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur quisquam, iusto provident quas voluptatem, dolores hic, dolorem commodi velit quia corrupti atque minus rerum neque optio. Odio accusantium facere deserunt?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit architecto quaerat praesentium excepturi nobis atque, optio repudiandae velit! Eum debitis similique aliquid tempora quos iusto repellendus nostrum quisquam consectetur id.</p>
    </HahamLayout>
  )
}

export default Haham
