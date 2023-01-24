import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AddUser from "../views/AddUser"
import AuthPage from "../views/Auth"
import Main from "../views/Main"
import Messages from "../views/Messages"
import MyNews from "../views/MyNews"
import News from "../views/News"
import Users from "../views/Users"
import UserInfo from "../views/Users/components/UserInfo"
import Roles from "../views/Users/components/Roles"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="news" element={<News />} />
        <Route path="mynews" element={<MyNews />} />
        <Route path="messages" element={<Messages />} />
        <Route path="users" element={<Users />}>
          <Route path="" element={<Roles />} />
          <Route path="id" element={<UserInfo />} />
        </Route>
        <Route path="/adduser" element={<AddUser />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default Router
