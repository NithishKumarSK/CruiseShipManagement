import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Lets first create an empty context
const AuthContext = createContext()

// Now the auth context provider will determine all the things that need to be 
// properly initialized in the context.
// It is also able to set event listeners like onAuthStateChanged

export function AuthContextProvider ({children}) {
    const [ currentUser, setCurrentUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect( () => {
        
        const unsubscribe = onAuthStateChanged(auth, (user) =>{

            if(user){

                user.getIdTokenResult()
                .then( (idTokenInfo) =>
                    { 
                        setCurrentUser({...user, role: idTokenInfo.claims.role || 'Guest'})
                        console.log('set the role now!');
                    }
                )
                .catch( ( err) => console.log('Error while changing users : ',err))
                .finally(() => {
                    console.log('Loading State: ', loading); 
                    console.log('Current User: ', currentUser);
                })
            }
            else{
                setCurrentUser(null)
            }
            setLoading(false); // The auth info finished loading
            
            
        })
        
        return () => {
            
            unsubscribe();
            
        }

    },[])

    return (
        
        <AuthContext.Provider value={{currentUser, loading}}>
            {children}
        </AuthContext.Provider >
    )
} 

export function useAuth( ){
    return useContext(AuthContext);
}
