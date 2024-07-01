import { useState, useEffect } from "react";
import { auth } from "../db/firebaseConfig";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Create a new instance of the GoogleAuthProvider
const provider = new GoogleAuthProvider();

// Custom hook for client authentication
const useClientAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isFetch, setIsFetch] = useState<boolean>(true);

    // Router instance for navigation
    const router = useRouter();

    // Function to handle login with Google
    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if(user) {
            router.push('/dashboard');
        }
    }


     // Effect to handle changes in authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
           if(user) {
            setUser(user);
            setIsFetch(false);
           } else {
            setUser(null);
            setIsFetch(false);
           }
        });

        return () => unsubscribe();
    }, [])


    // Function to redirect the user if authenticated
    const redirectIfAuthenticated = () => {
        if(user) {
            router.push('/dashboard');
        }
    }

    // Return user, isFetch, loginWithGoogle, and redirectIfAuthenticated to be used in components
    return { user, isFetch, loginWithGoogle, redirectIfAuthenticated }
}

export default useClientAuth