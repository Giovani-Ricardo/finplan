import {React,  useState, useEffect } from 'react'
import { } from 'bootstrap'
import './assets/stylesheets/cadastro.css'
import { Form, Col, Row, Button, Modal, Alert } from 'react-bootstrap';
import {FiTarget} from 'react-icons/fi/index';
import {MdSend} from 'react-icons/md';
import './assets/stylesheets/main.css'
import {BsPlusCircle} from 'react-icons/bs';
import { Chart } from 'react-google-charts';
import dados from './data/categories.json';
import DespesaService from "./services/DespesaService";
import MetaService from "./services/MetaService";
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

    // Obtem o valor do teto de gasto
    const [tetoGasto, setTetoGasto] = useState(null);
    const getMeta = async () => {
        const response = await MetaService.getMeta();
        if(response.status === 200){
            setTetoGasto(response.data.valor);
        }
    }
    
    // Obter lista com todas as despesas cadastradas
    const [listaDespesas, setListaDespesas] = useState([]);
    const getAllDespesas = async () => {
        const responseDespesas = await DespesaService.getDespesas();
        if(responseDespesas.status === 200){
            setListaDespesas(responseDespesas.data);
        }
    }

    // Atualizar Meta
    const [novaMeta, setNovaMeta] = useState(null);
    const atualizarMeta = async (data) => {
        console.log(data)
        const response = await MetaService.redefinirMeta(data);
        if(response.status === 200){
            setTetoGasto(response.data.valor);
        }
    }

    const handleNovaMeta = (e) => {
        e.preventDefault();
        atualizarMeta(novaMeta);
        handleCloseModalDefinirMeta();
        setNovaMeta({});
    }; 

    var valores = calcularMeta(listaDespesas, tetoGasto);

    useEffect(() => {
        getMeta();
        getAllDespesas();
    }, []);

    const atualizaTeto = (valor) => {
        console.log(valor)
    }

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className='conteudo'>

            <Row className='alert'>
                <Alert variant="success">
                    <Alert.Heading>Bem vindo ao FinPlan {user.nome}</Alert.Heading>
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
                            data={valores}
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
                    <Form onSubmit={handleNovaMeta}>

                        <Form.Group className="mb-3" controlId="valorTeto">
                            <Form.Label>Novo valor</Form.Label>
                            <Form.Control 
                            type="number" 
                            min="0" 
                            defaultValue={tetoGasto}
                            onChange={(e) => novaMeta.valor = e.target.value}
                            name="valorTeto" />
                        </Form.Group>

                        <Button variant="success" type="submit" >
                            <MdSend /><span style={{ marginLeft: "5px" }}>Salvar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

        </div>
    );
}

export default Main;