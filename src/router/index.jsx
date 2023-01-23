import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AuthPage from "../views/Auth"
import Main from "../views/Main"
import Messages from "../views/Messages"
import MyNews from "../views/MyNews"
import News from "../views/News"
import Users from "../views/Users"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="news" element={<News />} />
        <Route path="mynews" element={<MyNews />} />
        <Route path="messages" element={<Messages />} />
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default Router
