import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
const AppLayout = () => {
  return (
     <div className="flex flex-col h-dvh">
      <Navbar/>
      <div className="flex-1 min-h-0">
        <Outlet/>
      </div>
      
    </div>
  )
}

export default AppLayout
