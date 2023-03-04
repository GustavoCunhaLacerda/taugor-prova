import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {

  const [passwordStates, setPasswordStates] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   setCurrentUser(user);
    // })
  }, []);

  const handleRegister = async (email, password, name) => {
    // await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // )
    // await updateProfile(auth.currentUser, { displayName: name })
  };

  const handleLogin = async (email, password) => {
    // await signInWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
  };

  const getUser = () => {
    // return auth.currentUser;
  }

  const setError = (errorMessage) => {
    // setErrorMessage(errorMessage)
    // setTimeout(() => {
    //   setErrorMessage('')
    // }, 6000);
  }

  const handleChange = (prop) => (event) => {
    // setPasswordStates({ ...passwordStates, [prop]: event.target.value });
  };

  const resetPasswordStates = () => {
    // setPasswordStates({
    //   showPassword: false,
    //   showConfirmPassword: false,
    // })
  }


  return (
    <AuthContext.Provider value={{
      currentUser,
      getUser,
      passwordStates,
      handleChange,
      handleRegister,
      handleLogin,
      resetPasswordStates,
      setError,
      errorMessage,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const HandleLogout = async () => {
  // await signOut(auth);
};