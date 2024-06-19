import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError('Ocorreu um erro ao enviar o e-mail de recuperação. Por favor, tente novamente.');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Recuperação de Senha</h2>
      {emailSent ? (
        <p>Um e-mail de recuperação foi enviado para {email}. Verifique sua caixa de entrada.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Digite seu e-mail:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar E-mail de Recuperação'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PasswordRecovery;
