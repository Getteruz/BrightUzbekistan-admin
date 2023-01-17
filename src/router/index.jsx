import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AuthPage from "../views/Auth"
import Main from "../views/Main"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default Router
