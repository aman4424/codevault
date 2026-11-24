import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import PublicLayout from "../layouts/PublicLayout"
import GlobalSideBar from "../components/GlobalSideBar"
const AppLayout = () => {
  return (
     <div className="flex flex-col  h-dvh">
      <Navbar/>
      <div className="flex-1 min-h-0">
        <PublicLayout>
            <GlobalSideBar/>
            <Outlet/>
        </PublicLayout>
      </div>
      
    </div>
  )
}

export default AppLayout
