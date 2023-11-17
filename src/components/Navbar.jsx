import { useContext } from 'react';
import {NavLink} from 'react-router-dom'
import { userContext } from '../context/UserProvider';

const Navbar = () => { 
    //mandar a llamar a user provider para obtener el user
    const {user, signOutUser} = useContext(userContext)
    const handleClickLogOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.log(error.code)
        }
    }
    
    return(
        <div>
            {
                user ? (
                <>
                    <NavLink to="/">Incio | </NavLink>
                    <button onClick={handleClickLogOut}>Logout</button>
                    
                </>
                ) : (
                    <>
                        <NavLink to="/login">Login | </NavLink>
                        <NavLink to="/register">Register | </NavLink>
                    </>
                )}
            
        </div>
    )
 }

 export default Navbar;