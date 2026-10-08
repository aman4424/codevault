import { useContext,createContext,useEffect,useState} from "react"; 
import moduleName from 'module'
import axios from "axios";
export const AuthContext=createContext(null);

const AuthContextProvider=({children})=>{
    const [authStatus, setAuthStatus] = useState("checking");
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        if(authStatus!=="checking")return;
        const token=localStorage.getItem("token");
        if(token===null){
            setAuthStatus("unauthorized");
            return;
        }
       const verifyUser=async ()=>{
        try {
            const response= await axios.get( "http://localhost:5000/api/auth/verify",{
                headers:{
                   Authorization: `Bearer ${token}`,
                }
            })
            setUser(response.data.user);
            setAuthStatus("authorized");
        } catch (error) {
            localStorage.removeItem("token"); // the token is bad or expired
           setAuthStatus("unauthorized");

        }
       }
       verifyUser()

    },[])
    
    return(
        <AuthContext.Provider
            value={{
                authStatus,
                setAuthStatus,
                user,
                setUser
            }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;