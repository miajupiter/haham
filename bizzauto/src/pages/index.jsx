import ThemeButton from '@/components/Buttons/ThemeButton'
import LogoutButton from '@/components/Buttons/LogoutButton'
// import { useRouter, withRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'

import { useEffect, useState } from 'react'

export function Home(props){
  const { data } = useSession()
  const session=data

  return(
    <div>
     {!session && (
            <>
              <span className={''}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                
                // onClick={(e) => {
                //   e.preventDefault()
                //   signIn()
                // }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className='avatar'
                />
              )}
              <span className={''}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                
                // onClick={(e) => {
                //   e.preventDefault()
                //   signOut()
                // }}
              >
                Sign out
              </a>
            </>
          )}
    <p>
      <a href='/me' >me</a>
    </p>
    <p>
      <a href='/protected' >protected</a>
    </p>
    <p>
      <a href='/server' >server</a>
    </p>
    <p>
      <a href='/haham' >haham admin panel</a>
    </p>
    <p>
      {/* {data!=null?<button onClick={signOut} >log out</button>:
      <button onClick={signIn} >Login</button>
      } */}
      
    </p>
    </div>
  )
}






export default Home

// function BriefCase(str){
//   return str.length>1?str.substring(0,1).toUpperCase() + str.slice(1):str
// }