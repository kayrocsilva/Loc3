import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulando uma requisição de envio do formulário
    try {
      // Aqui você pode enviar os dados para o servidor ou realizar qualquer operação necessária
      // Por simplicidade, apenas simular um atraso de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Limpa o formulário após o envio
    } catch (error) {
      setSubmitting(false);
      setShowError(true);
    }
  };

  return (
    <div>
      <h2>Entre em Contato</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Mensagem</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            placeholder="Digite sua mensagem"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </Form>
      {showSuccess && (
        <Alert variant="success" className="mt-3">
          Mensagem enviada com sucesso!
        </Alert>
      )}
      {showError && (
        <Alert variant="danger" className="mt-3">
          Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.
        </Alert>
      )}
    </div>
  );
};

export default ContactForm;