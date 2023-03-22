import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AddUser from "../views/AddUser"
import AuthPage from "../views/Auth"
import Main from "../views/Main"
import Messages from "../views/Messages"
import MyNews from "../views/MyNews"
import Users from "../views/Users"
import UserInfo from "../views/Users/components/UserInfo"
import Roles from "../views/Users/components/Roles"
import AddNews from "../views/News"
import EditNews from "../views/EditNews"

const
  Router = () => {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Main />} />
          <Route path="news" element={<MyNews />} />
          <Route path="addnews" element={<AddNews />} />
          <Route path="news/edit/:id" element={<EditNews />} />
          <Route path="messages" element={<Messages />} />
          <Route path="users" element={<Users />}>
            <Route path="" element={<Roles />} />
            <Route path=":id" element={<UserInfo />} />
          </Route>
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/general-access" element={<></>} />
          <Route path="/dop-pages" element={<></>} />
          <Route path="/reklama" element={<></>} />
          <Route path="/statistika" element={<></>} />
          <Route path="/archive" element={<></>} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    )
  }

export default Router
