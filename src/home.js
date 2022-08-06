import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardGroup,
} from "react-bootstrap";
import "./assets/stylesheets/home.css";
import saiba from "./assets/images/capa.jpeg";
import facil from "./assets/images/facil.jpeg";
import juros from "./assets/images/despesas.jpeg";
import suporte from "./assets/images/suporte.jpeg";
import economize from "./assets/images/economize.jpeg";
import grafico from "./assets/images/saiba.jpeg";
import Footer from "./footer";

function Home() {
  return (
    <div className="principal">
      <Row>
        <Container fluid className="cont">
          <Col xs={6}>
            <img className="image" src={saiba}></img>
          </Col>
          <Col xs={6}>
            <h1 className="font">FINPLAN</h1>
            <h2>
              Desenvolvido para pequenas empresas e negócios, o Finplan é uma
              ferramenta online que vai facilitar sua vida financeira.
            </h2>
          </Col>
        </Container>
      </Row>
      <br></br>
      <Container fluid>
        <CardGroup>
          <Card className="juros">
            <Card.Img variant="top" src={grafico} />
            <Card.Body>
              <Card.Title>
                <h1> Saiba para onde vai o dinheiro do seu negocio</h1>
              </Card.Title>
              <Card.Text>
                <h2>
                  Com o Finplan, você categoriza todos os seus lançamentos. Com
                  gráficos simples, você sabe de onde vem e para onde vai o seu
                  dinheiro.
                </h2>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="juros">
            <Card.Img variant="top" src={juros} />
            <Card.Body>
              <Card.Title>
                <h1>Pare de pagar juros atoa e economize</h1>
              </Card.Title>
              <Card.Text>
                <h2>
                  Manter as contas em dia é sempre um problema? O Finplan avisa
                  você: receba alertas de contas a pagar e a receber!
                </h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
      <Container fluid className="roda">
        <CardGroup>
          <Card className='card baixo'>
            <Card.Img className="imagem-final" variant="top" src={facil} />
            <Card.Body>
              <Card.Title>
                <h1>Fácil de usar</h1>
              </Card.Title>
              <Card.Text>
                <h4>
                  O Finplan vai além do básico e permite que você faça controles
                  incríveis, essenciais para suas finanças. Simple como tem que
                  ser!
                </h4>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='card baixo'>
            <Card.Img className="imagem-final" variant="top" src={economize} />
            <Card.Body>
              <Card.Title>
                <h1>Economize seu tempo</h1>
              </Card.Title>
              <Card.Text>
                <h4>
                  Tempo é dinheiro! Em segundos, você tem tudo sob controle!
                </h4>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='card baixo'>
            <Card.Img className="imagem-final" variant="top" src={suporte} />
            <Card.Body>
              <Card.Title>
                <h1>Suporte amigo</h1>
              </Card.Title>
              <Card.Text>
                <h4>
                  Dúvidas? Perguntas? Nosso suporte ajuda você! A gente tá aqui
                  pra resolver seus problemas e deixar sua vida bem mais fácil!
                </h4>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>

      <Footer></Footer>
    </div>
  );
}
export default Home;
