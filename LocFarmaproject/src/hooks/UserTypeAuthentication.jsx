import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

export const userTypeAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return;
        }
    };

    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);
            return user;
        } catch (error) {
            console.error(error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            console.error(error.message);

            let systemErrorMessage;

            if (error.message.includes("invalid-login-credentials")) {
                systemErrorMessage = "Este usuário não está cadastrado";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Há um erro com suas credenciais.";
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        createUser,
        error,
        loading,
        logout,
        login
    };
};
