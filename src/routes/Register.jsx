import { useContext, useState } from "react";
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  
    const [email, setEmail] = useState('emmanuel@gmail.com');
    const [password, setPassword] = useState('123123');

    const {registerUser} = useContext(userContext);

    const navegate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('hola: ', email, password)
        try {
            await registerUser(email, password)
            console.log('Usuario creado')
            navegate('/')
        } catch (error) {
            console.log(error.code)
        }
    }

    return (
    <>
        <h1>Register</h1>
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
            <button type="submit">Register</button>
        </form>
    </>
  )
}

export default Register;
