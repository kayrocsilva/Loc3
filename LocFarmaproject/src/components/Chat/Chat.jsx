import React, { useContext, createContext, useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ChatContext.Provider value={{ messages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext)
}
