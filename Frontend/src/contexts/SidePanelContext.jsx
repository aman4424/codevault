import { useContext,createContext,useEffect,useState} from "react"; 
import useAuth from "../hooks/useAuth";
export const SidePanelContext=createContext();

const SidePanelContextProvider=({children})=>{
    const {authStatus}=useAuth();
    const [viewSidePanel, setViewSidePanel] = useState(false);
    
useEffect(() => {
  const mediaQuery = window.matchMedia("(min-width: 640px)");

  const syncSidePanel = () => {
    setViewSidePanel(authStatus === "authorized" && mediaQuery.matches);
  };

  syncSidePanel();
  mediaQuery.addEventListener("change", syncSidePanel);

  return () => {
    mediaQuery.removeEventListener("change", syncSidePanel);
  };
}, [authStatus]);
    
    return (
        <SidePanelContext.Provider
            value={{
                viewSidePanel,
                setViewSidePanel
            }}
        >
            {children}
        </SidePanelContext.Provider>
    )

    
}

export default SidePanelContextProvider