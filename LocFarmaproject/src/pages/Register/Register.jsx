
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import styles from './Register.module.css';

const Register = () => {
  const [userType, setUserType] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    cep: '',
    cpf: '',
    companyName: '',
    cnpj: '',
    name: '',
    surname: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formValues.password !== formValues.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );

      if (userType === 'cpf') {
        // Registro para usuário comum (CPF)
        const userRef = collection(db, 'users');
        const newUser = {
          email: formValues.email,
          address: formValues.address,
          cep: formValues.cep,
          cpf: formValues.cpf,
          name: formValues.name,
          surname: formValues.surname,
        };

        await addDoc(userRef, newUser);
        console.log('Usuário comum registrado com sucesso:', newUser);
      } else if (userType === 'cnpj') {
        // Registro para farmácia (CNPJ)
        const pharmacyRef = collection(db, 'pharmacies');
        const newPharmacy = {
          email: formValues.email,
          address: formValues.address,
          cep: formValues.cep,
          cnpj: formValues.cnpj,
          companyName: formValues.companyName,
        };

        await addDoc(pharmacyRef, newPharmacy);
        console.log('Farmácia registrada com sucesso:', newPharmacy);
      }

      setSuccess('Usuário registrado com sucesso!');
      setTimeout(() => setSuccess(''), 5000); // Limpa a mensagem de sucesso após 5 segundos
      navigate('/profile'); // Redireciona para a página de perfil após o registro
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário. Tente novamente.');
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormValues({
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      cep: '',
      cpf: '',
      companyName: '',
      cnpj: '',
      name: '',
      surname: '',
    });
  };

  const handleCloseModal = () => {
    navigate('/login'); // Navega de volta para a tela de login
  };

  return (
    <div className={`${styles.register} container`}>
      <div className={styles.modalHeader}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          X
        </button>
      </div>

      <h2>Registro</h2>

      <label>Tipo de Documento:</label><br />
      <div className="btn-group" role="group" aria-label="Tipo de Documento">
        <button
          type="button"
          className={`btn ${userType === 'cpf' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleUserTypeChange('cpf')}
        >
          CPF
        </button>
        <button
          type="button"
          className={`btn ${userType === 'cnpj' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleUserTypeChange('cnpj')}
        >
          CNPJ
        </button>
      </div><br /><br />

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Digite seu e-mail"
        /><br /><br />

        <label htmlFor="password">Senha:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Digite sua senha"
        /><br /><br />

        <label htmlFor="confirmPassword">Confirmar Senha:</label><br />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Confirme sua senha"
        /><br /><br />

        <label htmlFor="address">Endereço:</label><br />
        <input
          type="text"
          id="address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Digite seu endereço"
        /><br /><br />

        <label htmlFor="cep">CEP:</label><br />
        <input
          type="text"
          id="cep"
          name="cep"
          value={formValues.cep}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Digite seu CEP"
        /><br /><br />

        {userType === 'cpf' && (
          <>
            <label htmlFor="name">Nome:</label><br />
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Digite seu nome"
            /><br /><br />

            <label htmlFor="surname">Sobrenome:</label><br />
            <input
              type="text"
              id="surname"
              name="surname"
              value={formValues.surname}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Digite seu sobrenome"
            /><br /><br />

            <label htmlFor="cpf">CPF:</label><br />
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formValues.cpf}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Digite seu CPF"
            /><br /><br />
          </>
        )}

        {userType === 'cnpj' && (
          <>
            <label htmlFor="cnpj">CNPJ:</label><br />
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formValues.cnpj}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Digite seu CNPJ"
            /><br /><br />

            <label htmlFor="companyName">Razão Social:</label><br />
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formValues.companyName}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Digite a razão social"
            /><br /><br />
          </>
        )}

        <input type="submit" value="Registrar" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Register;

