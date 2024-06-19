import React from 'react';
import kayro from '../../assets/images/equipe/kayro.jpg';
import paulo from '../../assets/images/equipe/paulo.jpg';
import pedro from '../../assets/images/equipe/pedro.jpg';

const About = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Sobre Nós</h1>
      <div className="accordion" id="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Missão
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordion">
            <div className="accordion-body">
              <p>Facilitar a vida da população, especialmente daqueles que enfrentam dificuldades de locomoção e dos menos privilegiados, fornecendo informações sobre a disponibilidade e os preços de medicamentos em diferentes estabelecimentos, por meio de um aplicativo inovador. A missão é promover melhorias no bem-estar social e oferecer uma ferramenta eficaz para melhorar a vida das pessoas, especialmente no acesso a medicamentos escassos.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Visão
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordion">
            <div className="accordion-body">
              <p>Ser uma solução eficiente e prática para a comunidade, eliminando a necessidade de realizar inúmeras chamadas telefônicas na busca de medicamentos escassos. O aplicativo visa otimizar os recursos pessoais e financeiros dos usuários, além de promover a inclusão social ao atender às necessidades daqueles com dificuldades de locomoção. A visão é promover um impacto positivo na qualidade de vida dos usuários, fornecendo informações sobre o custo-benefício dos medicamentos disponíveis em diferentes estabelecimentos.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Valores
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordion">
            <div className="accordion-body">
              <p>Compromisso com a sociedade, equidade no acesso a medicamentos, melhoria do bem-estar social, facilidade de acesso à informação, conscientização na tomada de decisões, promoção da inclusão social e valorização dos recursos pessoais e financeiros dos usuários.</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-4">Equipe</h2>
      <div className="row">
        <div className="col-sm-4">
          <div className="card my-4">
            <img src={kayro} alt="Kayro" className="equipe" />
            <div className="card-body">
              <h5 className="card-title">Kayro César</h5>
              <p className="card-text">Líder</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card my-4">
            <img src={paulo} alt="Paulo" className="equipe" />
            <div className="card-body">
              <h5 className="card-title">Paulo Selestrino</h5>
              <p className="card-text">Gestor de Projetos</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card my-4">            
            <img src={pedro} alt="Pedro" className="equipe" />
            <div className="card-body">
              <h5 className="card-title">Pedro Rodrigues</h5>
              <p className="card-text">Analista de Qualidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About;
            