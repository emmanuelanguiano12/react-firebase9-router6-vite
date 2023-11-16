import { useContext } from "react";
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const  Login = () => {
    
    //recibe el user y setUser al usar el usecontext()
    const {user, setUser} = useContext(userContext)
    const navegate = useNavigate()

    const handleClickLogin = () =>{
        setUser(true);
        navegate("/")
    }
    
    return (
      <>
          <h1>Login</h1>
          <h2>
            {
                user ? 'En linea' : 'Offline'
            }
          </h2>
          <button onClick={handleClickLogin}>Acceder</button>
      </>
    )
  }
  
  export default  Login;