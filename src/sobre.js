
import React from 'react'
import { Col, Container, Row, Carousel } from 'react-bootstrap'
import './assets/stylesheets/sobre.css'
import saiba from './assets/images/saiba.jpeg'
import despesas from './assets/images/despesas.jpeg'
import categorias from './assets/images/categorias.jpeg'

function Sobre(props) {
  return (
    <div>
      <Container className="sobre">
        <h2>Sobre nós</h2>
        <h1>Bem vindos ao FinPlanner!</h1>
        <h4>O Facilitador da vida finançeira da sua micro-empresa</h4>
      </Container><br></br>
      <div className='exe'>
        <h5>Imagens ilustrativas do programa</h5>
        <div className="slide">
          <Carousel fade variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={saiba}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={despesas}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={categorias}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <Container className="body">
            <Row>
              <Col xs={12}>
                <p> Micro e pequenas empresas têm papel crucial na economia do Brasil,
                  de acordo com o Estado em 2021 foi responsável por, em média,
                  30% do PIB, além de 55% dos empregos formais do país. A má gestão
                  financeira é apontada como um dos principais motivos para o
                  encerramento destas empresas, em 2019 a taxa de sobrevivência foi de 79,8%.
                  O saldo entre empresas abertas e encerradas em 2019 no Brasil voltou
                  a ser positivo em 290,9 mil. Após o país ter registrado saldo negativo
                  de 65,9 mil empresas em 2018, o movimento se inverteu em 2019, com a
                  entrada no mercado de 947,3 mil empresas e o fechamento de 656,4 mil. (IBGE)
                  Pensando na crescente demanda no gerenciamento financeiro no nicho de
                  micro e pequenas empresas, buscamos a solução através de um sistema de
                  gestão financeira que permitirá aos usuários otimizar de maneira simples
                  e intuitiva as finanças de seu negócio, gerando relatórios com o banco
                  de dados afim de manter um maior controle de recursos, mitigar gastos
                  desnecessários, criar o planejamento para despesas futuras e melhorar
                  na precificação dos produtos.
                  Com base nas tecnologias atuais,
                  optamos por utilizar HTML, CSS e Java Script para o front
                  end e utilizando a linguagem Python para o back end. O banco
                  de dados será feito em MySQL e com objetivo de futuramente
                  implementar uma inteligência artificial como diferencial de mercado.</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Sobre;