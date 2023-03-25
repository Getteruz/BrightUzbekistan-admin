import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
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
  const { data, isLoading } = useQuery('me', getAdminInfo, {
    enabled: location.pathname !== '/auth',
    staleTime: Infinity,
    cacheTime: Infinity
  })

  useEffect(() => {
    if(!isLoading && data) {
      dispatch(authActions.setUser(data))
    } else if (!isLoading && !data) {
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
