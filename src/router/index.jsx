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
import AddNews from "../views/AddNews"
import EditNews from "../views/EditNews"
import EditUser from "../views/EditUser"
import GeneralAccess from "../views/GenerelAccess"
import EditGeneralAccess from "../views/EditGeneralAccess"
import Archive from "../views/Archive"
import Reklama from "../views/Reklama"
import ReklamaLayout from "../views/ReklamaLayout"
import AddReklama from "../views/AddReklama"
import EditReklama from "../views/EditReklama"

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
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/general-access" element={<GeneralAccess />} />
          <Route path="/general-access/edit/:id" element={<EditGeneralAccess />} />
          <Route path="/reklama" element={<ReklamaLayout />}>
            <Route path="" element={<Reklama />} />
            <Route path="add" element={<AddReklama />} />
            <Route path=":id" element={<EditReklama />} />
          </Route>
          <Route path="/dop-pages" element={<></>} />
          <Route path="/statistika" element={<></>} />
          <Route path="/archive" element={<Archive />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    )
  }

export default Router
