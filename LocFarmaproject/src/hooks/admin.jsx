import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { isAdminUser } from './firebaseUtils'; // Função para verificar se o usuário é administrador

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isAdminUser = await checkIfUserIsAdmin(user.uid); // Implemente essa função para verificar se o usuário é administrador
        setIsAdmin(isAdminUser);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return isAdmin;
};

export default useAdminCheck;
