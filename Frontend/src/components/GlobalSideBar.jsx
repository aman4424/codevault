import { NavLink } from "react-router-dom"

const GlobalSideBar = () => {
  const clName="h-10 w-full bg-card border-y text-primary flex items-center justify-center"
  return (
    <div className='py-2 '>
      <ul>
         <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${clName} ${isActive
                                ? "bg-primary text-text"
                                : "bg-card text-primary"}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
         <li>
                    <NavLink
                        to="/notebooks"
                        className={({ isActive }) =>
                            `${clName} ${isActive
                                ? "bg-primary text-text"
                                : "bg-card text-primary"}`
                        }
                    >
                        Notebooks
                    </NavLink>
                </li>
         <li>
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                            `${clName} ${isActive
                                ? "bg-primary text-text"
                                : "bg-card text-primary"}`
                        }
                    >
                        Analytics
                    </NavLink>
                </li>
         <li>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `${clName} ${isActive
                                ? "bg-primary text-text"
                                : "bg-card text-primary"}`
                        }
                    >
                        Settings
                    </NavLink>
                </li>
        
        
      </ul>
    </div>
  )
}

export default GlobalSideBar

