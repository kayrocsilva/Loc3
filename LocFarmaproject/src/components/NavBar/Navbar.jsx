import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userAuthentication } from '../../hooks/userAuthentication';
import { useAuthValue } from '../../context/AuthContext'; // Verifique se o import está correto
import logoDesktop from '../../assets/logotipo.png';
import logoMobile from '../../assets/logo-mobile.png';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importando FontAwesome e ícones necessários
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faStore,
  faCog,
  faClinicMedical,
  faHome,
  faInfoCircle,
  faEnvelope,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user } = useAuthValue(); // Obtém informações do usuário do contexto
  const { logout } = userAuthentication(); // Função de logout do hook userAuthentication
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const isAdmin = user && user.role === 'admin'; // Verifica se o usuário é administrador
  const isPharmacy = user && user.role === 'pharmacy'; // Verifica se o usuário é uma farmácia

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redireciona para a tela de login após o logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <img src={logoDesktop} alt="Logo Desktop" className="d-none d-lg-block" />
          <img src={logoMobile} alt="Logo Mobile" className="d-lg-none" />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={handleMenuToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <SearchBar />
        <div className={styles.navdir}>
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active" end>
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  <span className={styles.navLinkText}>Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" activeClassName="active">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                  <span className={styles.navLinkText}>Sobre Nós</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" activeClassName="active">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                  <span className={styles.navLinkText}>Contato</span>
                </NavLink>
              </li>
              {!user && (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" activeClassName="active">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-1" /> Entrar
                  </NavLink>
                </li>
              )}
              {isPharmacy && (
                <>
                  <li className="nav-item">
                    <NavLink to="/orders" className="nav-link" activeClassName="active">
                      <FontAwesomeIcon icon={faStore} className="mr-1" /> Pedidos
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/products" className="nav-link" activeClassName="active">
                      <FontAwesomeIcon icon={faStore} className="mr-1" /> Produtos
                    </NavLink>
                  </li>
                </>
              )}
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink to="/admin-dashboard" className="nav-link" activeClassName="active">
                      <FontAwesomeIcon icon={faCog} className="mr-1" /> Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin-users" className="nav-link" activeClassName="active">
                      <FontAwesomeIcon icon={faUser} className="mr-1" /> Usuários
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/pharmacies" className="nav-link" activeClassName="active">
                      <FontAwesomeIcon icon={faClinicMedical} className="mr-1" /> Farmácias
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item">
                    <NavLink to="/chat" className="nav-link" activeClassName="active">
                      <FontAwesomeIcon icon={faComment} className="mr-1" /> Chat
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/profile" className="nav-link" activeClassName="active">
                      <FontAwesomeIcon icon={faUser} className="mr-1" /> Perfil
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" /> Sair
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
