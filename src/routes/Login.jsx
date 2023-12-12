import { useContext, useState } from "react";
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import TitleForm from "../components/TitleForm";
import Button from "../components/Button";
import ButtonLoader from "../components/ButtonLoader"

const  Login = () => {

    //recibe el user y setUser al usar el usecontext()
    const { loginUser } = useContext(userContext)
    const [loading, setLoading] = useState(false);
    const navegate = useNavigate()
    const {required, patternEmail, minLength, validateTrim} = formValidate();
    const {register, handleSubmit, formState: {errors}, setError} = useForm();

    const onSubmit = async({email, password}) => {
      try {
          setLoading(true);
          await loginUser(email, password)
          navegate('/')
      } catch (error) {
          console.log(error.code)
          const {code, message} = erroresFirebase(error.code);
          setError(code, {message});
      } finally{
           setLoading(false); 
      }
    };
    
    return (
      <>
          <TitleForm text="Login" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput 
                label="Ingresa tu correo"
                type="email" 
                placeholder="Ingrese Email" 
                {...register("email", {
                    required,
                    pattern: patternEmail,
                })}
                error = {errors.email}
            >
                <FormError error={errors.email} />
            </FormInput>

            <FormInput
                label="Ingresa tu contraseña"
                type="password" 
                placeholder="Ingrese Password" 
                {...register("password", {
                    minLength,
                    validate: validateTrim,
                })}
                error = {errors.password}
            >
                <FormError error={errors.password} />
            </FormInput>
                    <Button text="Log in" type="submit" loading={loading} />
            
        </form>
      </>
    )
  }
  
  export default  Login;