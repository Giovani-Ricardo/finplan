import {React,  useState, useEffect } from 'react'
import { } from 'bootstrap'
import './assets/stylesheets/cadastro.css'
import { Form, Col, Row, Button, Modal, Alert } from 'react-bootstrap';
import {FiTarget} from 'react-icons/fi/index';
import {MdSend} from 'react-icons/md';
import './assets/stylesheets/main.css'
import {BsPlusCircle} from 'react-icons/bs';
import { Chart } from 'react-google-charts';
import DespesaService from "./services/DespesaService";
import MetaService from "./services/MetaService";
import CategoriaService from "./services/CategoriaService"
import { calcularMeta, optionsGraficoMeta, calcularCategorias, optionsGraficoCategoria, dadosGraficoTopDespesas, optionsPrevisao } from './assets/funcoes/graficos';


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

    // Obtendo todas as categorias
    const [categorias, setCategorias] = useState([])
    const getCategorias = async () => {
        const response = await CategoriaService.getCategorias();
        if(response.status === 200){
            setCategorias(response.data)
        }
    }

    // Obtendo top5despesas
    const [top5despesas, settop5despesas] = useState([])
    const getTop5despesas = async () => {
        const response = await DespesaService.top5Despesas();
        if(response.status === 200){
            settop5despesas(response.data)
        }
    }

    // Atualizar Meta
    const [novaMeta, setNovaMeta] = useState({});
    const atualizarMeta = async (data) => {
        const response = await MetaService.redefinirMeta(data);
        if(response.status === 200 || response.status === 201){
            setTetoGasto(response.data.valor);
        }
    }

    const handleNovaMeta = (e) => {
        e.preventDefault();
        atualizarMeta(novaMeta);
        handleCloseModalDefinirMeta();
        setNovaMeta({});
    };

    // Cadastro de nova Despesa
    const [novaDespesa, setNovaDespesa] = useState({});
    const cadastrarDespesa = async (data) => {
        const response = await DespesaService.createDespesa(data);
        if(response.status === 201){
            getAllDespesas();
            getTop5despesas();
        }
    }

    const handleCadastrarDespesa = (e) => {
        e.preventDefault();
        cadastrarDespesa(novaDespesa);
        handleCloseModalCadastroDespesa();
        setNovaDespesa({});
    };

    var valoresGraficoMeta = calcularMeta(listaDespesas, tetoGasto);
    var valoresGraficoCategorias = calcularCategorias(listaDespesas, categorias);
    var valoresGraficoTopDespesas = dadosGraficoTopDespesas(top5despesas);

    useEffect(() => {
        getMeta();
        getCategorias();
        getAllDespesas();
        getTop5despesas();
    }, []);

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
                            data={valoresGraficoMeta}
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
                            data={valoresGraficoCategorias}
                            options={optionsGraficoCategoria()}
                        />
                    </div>
                </Col>

                <Col lg={4}>
                    <div className='container-grafico'>
                        <Chart
                            chartLanguage='pt-br'
                            chartType="Bar"
                            width="100%"
                            height="300px"
                            data={valoresGraficoTopDespesas}
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
                    <Form onSubmit={handleCadastrarDespesa}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="" 
                            required={true}
                            onChange={(e) => novaDespesa.descricao = e.target.value}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control type="number" min="0" placeholder="R$:500,00" required={true} onChange={(e) => novaDespesa.valor = e.target.value}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label defaultValue="Selecione a categoria">Categoria</Form.Label>
                            <Form.Select required={true} onChange={(e) => novaDespesa.categorias_despesa_id = e.target.value} >
                                <option>Selecione a categoria</option>
                                {
                                    categorias.map((info, key) => {
                                        return (
                                            <option key={key} value={info.id}> {info.nome} </option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Data de vencimento</Form.Label>
                            <Form.Control type="date" required="true" onChange={(e) => novaDespesa.data_vencimento = e.target.value}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Deseja ser alertado no vencimento?" onChange={(e) => novaDespesa.alertar_vencimento = e.target.value}/>
                        </Form.Group>

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