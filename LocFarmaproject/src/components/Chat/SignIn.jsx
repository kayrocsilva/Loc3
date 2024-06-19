// src/components/SignIn.jsx
import React from 'react';
import { auth } from '../../firebase/config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(error => console.error(error));
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default SignIn;
