import { useContext } from 'react';
import {NavLink} from 'react-router-dom'
import { userContext } from '../context/UserProvider';

const Navbar = () => { 
    //mandar a llamar a user provider para obtener el user
    const {user, setUser} = useContext(userContext)
    
    return(
        <div>
            {
                user ? 
                <>
                    <NavLink to="/">Incio</NavLink>
                    <button onClick={() => setUser(false)}>Logout</button>
                </>
                :
                (<NavLink to="/login">Login</NavLink>)
            }
            
        </div>
    )
 }

 export default Navbar;