import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom'
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
    
    const clasButtonBlue = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    const classButtonRed = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"

    return(
        <nav className='bg-white border-gray-200 dark:bg-gray-900 '>
            <div className='container-flex flex-wrap items-center justify-between mx-auto p-4 '>
                <Link to="/" className='flex items-center'>
                    <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>URLShort APP</span>
                </Link>
                <div className='flex space-x-2'>
                    {
                    user ? (
                    <>
                        <NavLink to="/" className={clasButtonBlue}>Incio</NavLink>
                        <button onClick={handleClickLogOut} className={classButtonRed}>Logout</button>
                        
                    </>
                    ) : (
                        <>
                            <NavLink to="/login" className={clasButtonBlue}>Login</NavLink>
                            <NavLink to="/register" className={clasButtonBlue}>Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
 }

 export default Navbar;