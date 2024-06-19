import React, { useEffect, useState } from 'react';
import { useAuthValue } from '../../context/AuthContext'; // Supondo que useAuthValue fornece informações sobre o usuário autenticado
import { db } from '../../firebase/config'; // Importe a instância do Firestore

const ProfilePage = () => {
  const { user } = useAuthValue(); // Suponha que o contexto fornece informações sobre o usuário autenticado
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await db.collection('users').doc(user.uid).get(); // Supondo que cada usuário tenha um documento com seu UID como ID
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          setError('Dados do usuário não encontrados.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
        setError('Ocorreu um erro ao buscar dados do usuário. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <p>Carregando dados do usuário...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error}</p>;
  }

  return (
    <div className="container">
      <h2>Perfil de Usuário</h2>
      {userData && (
        <div>
          <p><strong>Nome:</strong> {userData.displayName}</p>
          <p><strong>E-mail:</strong> {userData.email}</p>
          {/* Adicione outros campos de dados do usuário aqui */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
