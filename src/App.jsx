import { useQuery } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import Router from "./router"
import { getAdminInfo } from "./services/admin"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth/auth.slice"
import useSocket from "./hooks/useSocket"


function App() {
  const socket = useSocket()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { data, isLoading, refetch } = useQuery('me', getAdminInfo, {
    enabled: location.pathname !== '/auth',
    staleTime: Infinity,
    cacheTime: Infinity
  })

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(authActions.setUser(data))
    } else if (!isLoading && !data) {
      dispatch(authActions.logout())
    }
  }, [data])

  useEffect(() => {
    if (!auth.isAuth) {
      navigate('/auth')
    } else {
      refetch()
    }
  }, [auth.isAuth])

  useEffect(() => {
    if (auth?.user?.id) {
      socket.emit('join', { id: auth?.user?.id })
      socket.on('login', data => alert(data?.user))
    }
  }, [])

  return (
    <Router />
  )
}

export default App