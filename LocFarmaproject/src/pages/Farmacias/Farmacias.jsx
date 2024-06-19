import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

const Farmacias = () => {
  const [farmacias, setFarmacias] = useState([]);

  useEffect(() => {
    const fetchFarmacias = async () => {
      try {
        const snapshot = await db.collection('farmacias').get();
        const farmaciasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFarmacias(farmaciasData);
      } catch (error) {
        console.error('Erro ao buscar farmácias:', error);
      }
    };

    fetchFarmacias();
  }, []);

  return (
    <div>
      <h2>Farmácias Adicionadas</h2>
      <ul>
        {farmacias.map(farmacia => (
          <li key={farmacia.id}>
            <p>Nome: {farmacia.nome}</p>
            <p>Endereço: {farmacia.endereco}</p>
            <p>Telefone: {farmacia.telefone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Farmacias;
