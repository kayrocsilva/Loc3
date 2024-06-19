import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthentication } from '../../hooks/userAuthentication';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loading } = userAuthentication();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      navigate('/profile'); // Redireciona apenas se o login for bem-sucedido
    } catch (error) {
      setError(error.message); // Exibe a mensagem de erro na tela
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleRecoverPasswordClick = () => {
    navigate('/recover-password');
  };

  return (
    <div className={`${styles.login} container`}>
      <h1>LocFarma</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entre com seu e-mail"
            className="form-control"
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entre com sua senha"
            className="form-control"
          />
        </label>
        {!loading && <button className="btn btn-primary" type="submit">Login</button>}
        {loading && <button className="btn btn-primary" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
      {!loading && <button className="btn btn-link" onClick={handleRegisterClick}>Registrar</button>}
      {!loading && <button className="btn btn-link" onClick={handleRecoverPasswordClick}>Recuperar Senha</button>}
    </div>
  );
};

export default Login;
