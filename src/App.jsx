import { useQuery } from "react-query"
import { BrowserRouter } from "react-router-dom"
import Router from "./router"
import { getAdminInfo } from "./services/admin"

function App() {
  const { data } = useQuery('me', getAdminInfo)
  
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
