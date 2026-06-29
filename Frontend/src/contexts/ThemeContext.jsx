import { createContext,useState,useEffect } from "react"
export const ThemeContextData=createContext();
const ThemeContext = (props) => {
    const [theme, setTheme] = useState('dark')
    useEffect(() => {
        localStorage.setItem("theme",theme)
        document.documentElement.classList.toggle('light',theme==='light')
    }, [theme])
    
  return (
    
    <div>
      <ThemeContextData.Provider value={[theme,setTheme]}>
         {props.children}
      </ThemeContextData.Provider>
    </div>
  )
}

export default ThemeContext
