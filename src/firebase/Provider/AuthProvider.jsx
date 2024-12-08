import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleRegister = (name, email, photo, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        setError(null)
        updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
        })
      })
      .catch((err) => setError(err?.message));
  };

  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        setError(null)
      })
      .catch((err) => setError(err?.message));
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user)
        setError(null)  
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
  };
  useEffect(()=>{
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {   
        setError(null)     
        setUser(user)
        setLoading(false)
      } 
    });
  },[])
  const userInfo = {
    handleRegister,
    handleSignIn,
    user,
    handleLogOut,
    handleGoogleSignIn,
    isLoading,
    error
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
