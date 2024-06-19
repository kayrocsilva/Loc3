import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import nutricoreImage from '../../assets/images/destaques/nutricore.jpg';
import higieImage from '../../assets/images/destaques/higie.jpg';
import propolisImage from '../../assets/images/destaques/propolis.jpg';
import wheyProteinBarImage from '../../assets/images/destaques/whey_protein_bar.jpg';

const Destaques = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const navigate = useNavigate();

  const produtos = [
    { id: 1, nome: 'NutriCore Zen', preco: 'R$ 30,00', img: nutricoreImage, descricao: 'Descrição do NutriCore Zen' },
    { id: 2, nome: 'Higie+', preco: 'R$ 20,00', img: higieImage, descricao: 'Descrição do Higie+' },
    { id: 3, nome: 'Propolis', preco: 'R$ 10,00', img: propolisImage, descricao: 'Descrição do Propolis' },
    { id: 4, nome: 'Whey Protein', preco: 'R$ 80,00', img: wheyProteinBarImage, descricao: 'Descrição do Whey Protein' }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleShowModal = (produto) => {
    setSelectedProduto(produto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduto(null);
  };

  const handleShowChatModal = () => {
    if (user) {
      setShowChatModal(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <h2>Destaques</h2>
      </div>
      <div className="row">
        {produtos.map(produto => (
          <div className="col-sm-3" key={produto.id}>
            <div className="card my-3">
              <img src={produto.img} alt={`Produto ${produto.id}`} className="card-img-top"/>
              <div className="card-body">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="precocard">{produto.preco}</p>
                <Button variant="primary" onClick={() => handleShowModal(produto)}>
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduto && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduto.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProduto.img} alt={`Produto ${selectedProduto.id}`} className="img-fluid" />
            <p>{selectedProduto.preco}</p>
            <p>{selectedProduto.descricao}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleShowChatModal}>
              Contato com Farmácia
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showChatModal} onHide={handleCloseChatModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chat com a Farmácia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-box">
            {/* Implementar a lógica do chat aqui */}
            <p>Chat com a farmácia...</p>
            <input type="text" placeholder="Digite sua mensagem..." className="form-control" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChatModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={() => alert('Mensagem enviada!')}>
            Enviar Mensagem
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Destaques;
