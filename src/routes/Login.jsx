import { useContext, useState } from "react";
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const  Login = () => {
    
    const [email, setEmail] = useState('emmanuel@gmail.com');
    const [password, setPassword] = useState('123123');

    //recibe el user y setUser al usar el usecontext()
    const { loginUser } = useContext(userContext)
    const navegate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('hola: ', email, password)
        try {
            await loginUser(email, password)
            console.log('Usuario logeado')
            navegate("/")
        } catch (error) {
            console.log(error.code)
        }
    };
    
    return (
      <>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="email" 
            placeholder="Ingrese Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            />
            <input type="password" 
            placeholder="Ingrese Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            />
            <button type="submit">Ingresar</button>
        </form>
      </>
    )
  }
  
  export default  Login;