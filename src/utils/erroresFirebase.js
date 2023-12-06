export const erroresFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
            return {
                code: "email",
                message: "El correo ya está en uso" 
            };
        case "auth/invalid/email":
            return {
                code: "email",
                message: "Formato de email no valido"
            };
        case "auth/wrong-password":
            return{
                code: "password",
                message: "Contraseña incorrecta"
            };
        case "auth/invalid-login-credentials":
            return {
                code: "email",
                message: "Usuario no valido"
            };
        default:
            return {
                code: "email",
                message: "Error en el servidor"
            };
    }
};