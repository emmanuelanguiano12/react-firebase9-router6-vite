import { useContext, useState } from "react";
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Register = () => {
  
    const {registerUser} = useContext(userContext); 
    const navegate = useNavigate();
    
    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm();

    const onSubmit = async({email, password}) => {
        console.log(email, password)
            try {
                await registerUser(email, password)
                console.log('Usuario creado')
                navegate('/')
            } catch (error) {
                console.log(error.code)
                switch(error.code){
                    case "auth/email-already-in-use":
                        setError("email", {
                            message: "El correo ya está en uso"
                        })
                        break;
                    case "auth/invalid/email":
                        setError("email", {
                            message: "Formato de email no valido"
                        })
                        break;
                    default:
                        console.log("Error en el servidor")
                }
            }
        };


    return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" 
            placeholder="Ingrese Email" 
            {...register("email", {
                required: {
                    value: true,
                    message: 'Campo obligatorio'
                },
                pattern: {
                    value:  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                    message: "Formato de email incorrecto"
                }
            })}
            />
            {
                errors.email && <p>{errors.email.message}</p>
            }
            <input type="password" 
            placeholder="Ingrese Password" 
            {...register("password", {
                setValueAs: v => v.trim(),
                minLength: {
                value: 6,
                message: 'Debe tener al menos 6 caracteres'
                },
                validate: {
                    trim: v => {
                        if(!v.trim()) return "no se aceptan espacios"
                        return true;
                    }
                }
            })}
            />
            {
                errors.password && <p>{errors.password.message}</p>
            }
            <input type="password" 
            placeholder="Confirme Password" 
            {...register("repassword", {
                setValueAs: v => v.trim(),
                validate: {
                    equals: (v) => v === getValues("password") || 'Las contraseñas no coinciden',
                    //message: 'Las contraseñas no coinciden'
                }
            })}
            />
            {
                errors.repassword && <p>{errors.repassword.message}</p>
            }
            <button type="submit">Register</button>
        </form>
    </>
  )
}

export default Register;
