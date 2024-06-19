// src/components/ChatRoom/ChatRoom.jsx

import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config'; // Importa a instância do Firestore

const ChatRoom = ({ farmaciaId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesSnapshot = await db.collection('conversations')
          .doc(farmaciaId) // ID da farmácia como ID do documento da conversa
          .collection('messages')
          .orderBy('timestamp', 'asc') // Ordena por timestamp crescente
          .get();

        const messagesData = messagesSnapshot.docs.map(doc => doc.data());
        setMessages(messagesData);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchMessages();
  }, [farmaciaId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      await db.collection('conversations')
        .doc(farmaciaId) // ID da farmácia como ID do documento da conversa
        .collection('messages')
        .add({
          text: newMessage,
          timestamp: new Date(),
          sender: 'user' // Pode ser útil adicionar o ID do usuário aqui se necessário
        });

      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <div>
      <h2>Chat com a Farmácia</h2>
      <div style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatRoom;
