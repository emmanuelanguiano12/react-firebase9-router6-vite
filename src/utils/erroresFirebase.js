export const erroresFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
            return "El correo ya está en uso";
        case "auth/invalid/email":
            return "Formato de email no valido";
        case "auth/invalid-login-credentials":
            return "Usuario no valido";
        default:
            return "Error en el servidor";
    }
};