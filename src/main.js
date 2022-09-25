import {React,  useState } from 'react'
import { } from 'bootstrap'
import './assets/stylesheets/cadastro.css'
import { Form, Col, Row, Button, Modal, Alert } from 'react-bootstrap';
import {FiTarget} from 'react-icons/fi/index';
import {MdSend} from 'react-icons/md';
import './assets/stylesheets/main.css'
import {BsPlusCircle} from 'react-icons/bs';
import { Chart } from 'react-google-charts';
import dados from './data/categories.json'
import { calcularMeta, optionsGraficoMeta, calcularCategorias, optionsGraficoCategoria, calcularPrevisao, optionsPrevisao } from './assets/funcoes/graficos';


function Main(props) {

    const [showModalCadastroDespesa, setShowCadastroDespesa] = useState(false);
    const handleCloseModalCadastroDespesa = () => setShowCadastroDespesa(false);
    const handleShowModalCadastroDespesa = () => setShowCadastroDespesa(true);

    const [showModalDefinirMeta, setShowDefinirMeta] = useState(false);
    const handleCloseModalDefinirMeta = () => setShowDefinirMeta(false);
    const handleShowModalDefinirMeta = () => setShowDefinirMeta(true);

    const [formDias, setFormDias] = useState(false);
    const showFormDias = () => setFormDias(!formDias);

    const [tetoGasto, setTetoGasto] = useState(calcularMeta())

    const atualizaTeto = (valor) => {
        console.log(valor)
    }

    return (
        <div className='conteudo'>

            <Row className='alert'>
                <Alert variant="success">
                    <Alert.Heading>Bem vindo ao FinPlan</Alert.Heading>
                    <hr />
                    <p className="mb-0">
                        Veja abaixo como está as finanças do seu negocio
                    </p>
                </Alert>
            </Row>


            <Row className='linha-graficos'>
                <Col lg={4}>
                    <div className='container-grafico'>
                        <Chart className='grafico'
                            chartLanguage='pt-br'
                            chartType="PieChart"
                            width="110%"
                            height="300px"
                            data={tetoGasto}
                            options={optionsGraficoMeta()}
                        />
                    </div>
                </Col>

                <Col lg={4}>
                    <div className='container-grafico'>
                        <Chart className='grafico'
                            chartLanguage='pt-br'
                            chartType="PieChart"
                            width="110%"
                            height="300px"
                            data={calcularCategorias()}
                            options={optionsGraficoCategoria()}
                        />
                    </div>
                </Col>

                <Col lg={4}>
                    <div className='container-grafico'>
                        <Chart
                            chartLanguage='pt-br'
                            chartType="Line"
                            width="100%"
                            height="300px"
                            data={calcularPrevisao()}
                            options={optionsPrevisao}
                        />
                    </div>
                </Col>

            </Row>

            <div className='container-botao'>

                <Button className='botao-main' variant="outline-dark" size="lg" onClick={handleShowModalDefinirMeta}><FiTarget /><span>Redefinir teto</span></Button>

                <Button className='botao-main' variant="outline-dark" size="lg" onClick={handleShowModalCadastroDespesa}><BsPlusCircle /><span>Adicionar despesa</span></Button>

            </div>

            {/* Modal de cadastro de uma nova despesa */}
            <Modal show={showModalCadastroDespesa} onHide={handleCloseModalCadastroDespesa}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar despesa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select>
                                {
                                    dados.map((info, key) => {
                                        return (
                                            <option key={key}>{info.name}</option>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control type="number" min="0" placeholder="R$:500,00" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Data de vencimento</Form.Label>
                            <Form.Control type="date" placeholder="dd/mm/aaaa" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="alert">
                            <Form.Check type="checkbox" label="Deseja ser alertado no vencimento?" />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="" controlId="periodo">
                                    <Form.Check type="checkbox" onClick={showFormDias} label="Despesa recorrente?" />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className={formDias ? 'form-dias active' : 'form-dias'} controlId="description">
                                    <Form.Control type="number" min="0" placeholder="Período em dias" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="success" type="submit">
                            <MdSend /><span style={{ marginLeft: "5px" }}>Salvar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            {/* Modal para definir uma nova meta */}
            <Modal show={showModalDefinirMeta} onHide={handleCloseModalDefinirMeta}>
                <Modal.Header closeButton>
                    <Modal.Title>Definir teto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => atualizaTeto(e.target.valorTeto.value)}>

                        <Form.Group className="mb-3" controlId="valorTeto">
                            <Form.Label>Novo valor</Form.Label>
                            <Form.Control type="number" min="0" placeholder="R$:500,00" name="valorTeto" />
                        </Form.Group>

                        <Button variant="success" >
                            <MdSend /><span style={{ marginLeft: "5px" }}>Salvar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

        </div>
    );
}

export default Main;