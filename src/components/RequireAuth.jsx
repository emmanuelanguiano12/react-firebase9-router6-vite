import { useContext } from "react";
import { userContext } from "../context/UserProvider";
import {Navigate} from 'react-router-dom'

const RequireAuth = ({children}) => { 
    const {user} = useContext(userContext)
    
    if(!user){
        return <Navigate to="/login" />
    }

    //devolver el resto de los componentes
    return children;
};

 export default RequireAuth;