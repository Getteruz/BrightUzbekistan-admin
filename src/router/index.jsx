import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AuthPage from "../views/Auth"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  )
}

export default Router
