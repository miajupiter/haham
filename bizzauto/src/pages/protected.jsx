import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"

export function ProtectedPage() {
  const {data,status}= useSession()
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [data])
 

  // If no session exists, display access denied message
  if (!data) {
    return (
      <div>
        <p>status1:{status}</p>
        <AccessDenied />
      </div>
    )
  }

  // If session exists, display content
  return (
    <div>
      <p>status2:{status}</p>
      <h1>Protected Page</h1>
      
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </div>
  )
}

export default ProtectedPage