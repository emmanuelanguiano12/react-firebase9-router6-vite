export const formValidate = () => { 
    return{
        required: {
            value: true,
            message: 'Campo obligatorio'
        },
        patternEmail: {
            value:  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto"
        },
        patternurl: {
            value:  /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: "Formato de URL incorrecto"
        },
        minLength: {
            value: 6,
            message: 'Debe tener al menos 6 caracteres'
        },
        validateTrim: {
                trim: (v) => {
                if(!v.trim()) return "no se aceptan espacios"
                return true;
            }
        },
        validateEquals(value) {
            return {
                equals: (v) => v === value || 'Las contraseñas no coinciden',
            }
        },
    }    
}