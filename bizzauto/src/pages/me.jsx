import { useSession } from "next-auth/react"
// import Layout from "../components/layout"

export function MePage() {
  const { data } = useSession()

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default MePage
