import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"
import Router from "./router"
import { getAdminInfo } from "./services/admin"
import { useEffect } from "react"

function App() {
  const location = useLocation()
  const [cookie, setCookie] = useCookies(['user'])
  const { data, refetch } = useQuery('me', getAdminInfo, {
    enabled: location.pathname !== '/auth'
  })

  useEffect(() => {
    if(data) {
      setCookie('user', data)
    } else {
      refetch()
    }
  }, [data])

  return (
    <Router />
  )
}

export default App
