import { useContext } from "react";
import { userContext } from "../../context/UserProvider";
import {Navigate} from 'react-router-dom'
import { Outlet } from "react-router-dom"

const LayoutRequireAuth = () => { 
    const {user} = useContext(userContext)
    
    if(!user){
        return <Navigate to="/login" />
    }

    //devolver el resto de los componentes
    return(
        <div className="container mx-auto">
            <Outlet />
        </div>
    )
};

 export default LayoutRequireAuth;