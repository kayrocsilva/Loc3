import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Chat/ConversationList.module.css';

const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Simulação de conversas (pode ser obtido de um backend em uma aplicação real)
    const initialConversations = [
      { id: 1, pharmacyName: 'Farmácia A' },
      { id: 2, pharmacyName: 'Farmácia B' },
      { id: 3, pharmacyName: 'Farmácia C' },
    ];
    setConversations(initialConversations);
  }, []);

  return (
    <div className={styles.conversationsList}>
      <h2 className={styles.listHeader}>Conversas com Farmácias</h2>
      <ul className={styles.list}>
        {conversations.map((conversation) => (
          <li key={conversation.id} className={styles.listItem}>
            <NavLink
              to={`/chat/${conversation.id}`}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              {conversation.pharmacyName}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationsList;
