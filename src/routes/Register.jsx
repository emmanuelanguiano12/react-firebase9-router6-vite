import { useContext } from "react";
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import TitleForm from "../components/TitleForm";
import Button from "../components/Button";

export const Register = () => {
  
    const {registerUser} = useContext(userContext); 
    const navegate = useNavigate();
    const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate();

    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm();

    const onSubmit = async({email, password}) => {
            try {
                await registerUser(email, password)
                navegate('/')
            } catch (error) {
                console.log(error.code)
                const {code, message} = erroresFirebase(error.code);
                setError(code, {message});
            }
        };


    return (
    <>
        <TitleForm text="Register" />
        <FormError error={errors.firebase} />
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput 
                type="email" 
                placeholder="Ingrese Email" 
                {...register("email", {
                    required,
                    pattern: patternEmail,
                })}
                label = "Ingresa tu correo"
                error={errors.email}
            >
                <FormError error={errors.email} />
            </FormInput>
            
            <FormInput
                type="password" 
                placeholder="Ingrese Password" 
                {...register("password", {
                    minLength,
                    validate: validateTrim,
                })}
                label = "Ingresa tu password"
                error = {errors.password}
            >
                <FormError error={errors.password} />
            </FormInput>

            <FormInput
                type="password" 
                placeholder="Confirme Password" 
                {...register("repassword", {
                    validate: validateEquals(getValues("password")),
                })}
                label = "Confirme password"
                error = {errors.repassword}
            >
                <FormError error={errors.repassword} />
            </FormInput>
            
            <Button text="Register" type="submit" />
        </form>
    </>
  )
}

export default Register;
