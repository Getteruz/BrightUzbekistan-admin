import { Outlet } from "react-router-dom"
import Container from "../../components/Container"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import cls from "./style.module.scss"

const MainLayout = () => {
  return (
    <div className={cls.layout}>
      <Sidebar />
      <div className={cls.content}>
        <Navbar />
        <Container>
          <Outlet />
        </Container>
      </div>
    </div >
  )
}

export default MainLayout
