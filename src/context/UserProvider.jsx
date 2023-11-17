import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const userContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(user){
                const {email, photoURL, displayName, uid} = user
                setUser({email, photoURL, displayName, uid})
            } else {
                setUser(null);
            }
        })
        return () => unsuscribe();
    }, []);


    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const signOutUser = () => signOut(auth)

    return(
        <userContext.Provider value={{user, setUser, registerUser, loginUser, signOutUser}}>
            {children}
        </userContext.Provider>    
    )
}

export default UserProvider;