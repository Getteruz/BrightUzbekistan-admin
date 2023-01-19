import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AuthPage from "../views/Auth"
import Main from "../views/Main"
import News from "../views/News"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="news" element={<News />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default Router
