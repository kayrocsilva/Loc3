import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { userAuthentication } from './hooks/userAuthentication';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18'; // Importa a configuração do i18next
import ConversationsList from './components/Chat/ConversationList';

// Importe o arquivo de configuração do Google Analytics
import { initGA, logPageView } from './utils/analytics';

// Importe os componentes da sua aplicação
import Navbar from '../src/components/NavBar/Navbar';
import loading from './assets/images/Loading.gif';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import PasswordRecovery from './pages/PasswordRecovery/PasswordRecovery';
import Contact from './pages/Contact/Contact';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatRoom from './components/Chat/ChatRoom';
import ReportsDashboard from './components/ReportsDashboard/ReportsDashboard';
import Farmacias from './pages/Farmacias/Farmacias';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = userAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    // Inicializa o Google Analytics quando o componente for montado
    initGA();

    // Monitora mudanças de rota para registrar as visualizações de página
    const unregister = onAuthStateChanged(auth, user => {
      setUser(user);
      logPageView(); // Registra a visualização da página ao mudar de rota
    });

    return () => unregister(); // Limpa o listener quando o componente for desmontado
  }, [auth]);

  if (loadingUser) {
    return <div className='container load'><img src={loading} alt="Gif Loading User" width="120px" height="120px" /></div>;
  }

  return (
    <>
    <I18nextProvider i18n={i18n}>   
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>            
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />          
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/register' element={<Register />} />  
              <Route path='/recover-password' element={<PasswordRecovery />} />
              <Route path='/profile' element={<ProfilePage />} />              
              <Route path="/reports" element={<ReportsDashboard />} />
              <Route path="/pharmacies" element={<Farmacias />} />
              <Route path="/conversations" element={<ConversationsList />} />
              <Route path="/chat/:id" element={<ChatRoom />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
      </I18nextProvider>   
    </>
  );
}

export default App;
