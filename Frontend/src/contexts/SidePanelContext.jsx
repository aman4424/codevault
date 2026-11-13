import { useContext,createContext,useEffect,useState} from "react"; 
import useAuth from "../hooks/useAuth";
export const SidePanelContext=createContext();

const SidePanelContextProvider=({children})=>{
    const {authStatus}=useAuth();
    const [viewSidePanel, setViewSidePanel] = useState(false);
    
    useEffect(() => {
        setViewSidePanel(authStatus === "authorized");
    }, [authStatus])
    
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