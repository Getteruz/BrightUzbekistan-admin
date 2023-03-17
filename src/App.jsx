import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import Router from "./router"
import { getAdminInfo } from "./services/admin"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth/auth.slice"


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [cookie, setCookie] = useCookies(['user', 'access_token_admin'])
  const { data, refetch } = useQuery('me', getAdminInfo, {
    enabled: location.pathname !== '/auth' && !!cookie.access_token_admin
  })

  useEffect(() => {
    if(data) {
      dispatch(authActions.setUser(data))
    } else {
      refetch()
    }
  }, [data])

  useEffect(() => {
    if(cookie?.access_token_admin) {
      dispatch(authActions.login())
    } else {
      dispatch(authActions.logout())
    }
  }, [])

  useEffect(() => {
    if(!auth.isAuth) {
      navigate('/auth')
    }
  }, [auth.isAuth])

  return (
      <Router />
  )
}

export default App
