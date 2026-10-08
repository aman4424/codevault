import useAuth from "../hooks/useAuth"
import Loading from "../pages/Loading";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({children}) => {
    const {authStatus}=useAuth();
    if(authStatus==="checking"){
        return (
            <Loading/>
        )
    }
        
    else if(authStatus=="unauthorized"){
        return (<Navigate to="/signin" replace/>);
    }

    return children;
}

export default PrivateRoute
