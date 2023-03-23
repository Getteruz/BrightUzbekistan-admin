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
  // const [cookie, setCookie] = useCookies(['user', 'access_token_admin'])
  const { data, refetch, isLoading } = useQuery('me', getAdminInfo, {
    enabled: location.pathname !== '/auth'
  })

  useEffect(() => {
    if(!isLoading && data) {
      dispatch(authActions.setUser(data))
    } else if (!isLoading && !data) {
      console.log(13);
      dispatch(authActions.logout())
    }
  }, [data])

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
