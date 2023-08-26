import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({success:false, error: 'Authentication failed' })
  }

  fetch('https://jsonplaceholder.typicode.com/users')
  .then(resp=>resp.json())
  .then(resp=>{
    res.status(200).json({success:true,data:resp})
  })
  .catch(err=>res.status(400).json({success:false, error:err.message}))
}
