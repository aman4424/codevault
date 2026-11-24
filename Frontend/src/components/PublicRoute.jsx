import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Splash from "../pages/Splash"
import Loading from "../pages/Loading"
const PublicRoute = ({children}) => {
    const {authStatus}=useAuth()
    if(authStatus==="checking"){
        return (
            <Loading/>
        )
    }
        
    // else if(authStatus=="authorized"){
    //     return (<Navigate to="/" replace/>);
    // }

    return children;
}

export default PublicRoute
