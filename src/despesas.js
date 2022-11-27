import React from 'react'
import { useState, useEffect} from 'react';
import {MdEditNote, MdOutlineDelete, MdPreview, MdSend,MdClose } from 'react-icons/md';
import {FaCheck} from 'react-icons/fa';
import {BsPlusCircle, BsSearch} from 'react-icons/bs';
import { Col, Row, Table, Modal, Button, Form } from 'react-bootstrap'
import './assets/stylesheets/despesas.css'
import dados from './data/categories.json'
import dados_despesas from './data/expenses.json'
import DespesaService from "./services/DespesaService";
import CategoriaService from "./services/CategoriaService"
import {conversorData} from './assets/funcoes/conversorData'

var objeto = {}
var data_objeto = undefined;
var dataInicio = undefined;
var dataFim = undefined;
var selectCategoria = "Selecione a categoria";

function Despesas() {

    //Variaveis que controla a exibição do modal de editar despesa
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);


    //Função responsável por mostrar o modal de editar despesa e passar as informações atuais para preencher o modal
    const showModalEditar = (info) => {
        setShow(true);
        objeto = info;
    }

    //Variaveis que controlam o modal que exibe o alerta para confirmar delete de despesa
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (info) => {
        setShowDelete(true);
        objeto = info;
    };

    const deletarDespesa = async () => {
        const response = await DespesaService.removeDespesa(objeto.id);
        objeto = {};
        if(response.status === 200){
            getAllDespesas();
        }
        handleCloseDelete();
    }

    //Variaveis que controlam a exibição do modal de visualização das informações de despesas
    const [view, setView] = useState(false);
    const handleCloseView = () => setView(false);

    //Função resposável por mostrar o modal visualização de informações de despesas e passar as informações
    const showModalVisualizar = (info) => {
        setView(true);
        objeto = info;
    }

    // Obter lista com todas as despesas cadastradas
    const [listaDespesas, setListaDespesas] = useState([]);
    const [categorias, setCategorias] = useState([])

    const getAllDespesas = async () => {
        const responseDespesas = await DespesaService.getDespesas();
        if(responseDespesas.status === 200){
            setListaDespesas(responseDespesas.data);
        }
    }


    const getCategorias = async () => {
        const response = await CategoriaService.getCategorias();
        if(response.status === 200){
            setCategorias(response.data)
        }
    }

    // Cadastro de nova Despesa
    const [novaDespesa, setNovaDespesa] = useState({});

    const cadastrarDespesa = async (data) => {
        const response = await DespesaService.createDespesa(data);
        if(response.status === 201){
            getAllDespesas();
        }
    }

    const handleCadastrarDespesa = (e) => {
        e.preventDefault();
        cadastrarDespesa(novaDespesa);
        handleCloseModalCadastroDespesa();
        setNovaDespesa({});
    };

    // Atualizar um despesa
    const atualizarDespesa = async (id, data) => {
        const response = await DespesaService.updateDespesa(id, data);
        if(response.status === 200){
            getAllDespesas();
        }
    }
    
    const handleAtualizarDespesa = (e) => {
        e.preventDefault();
        atualizarDespesa(objeto.id, novaDespesa);
        handleClose();
        setNovaDespesa({});
    };  

    
    useEffect(() => {
        getAllDespesas();
        getCategorias();
    }, []);

    // Aplicar filtro em despesas
    const [filtroDespesa, setFiltroDespesa] = useState({});

    const filtrar = async (data) => {
        console.log(data);
        const response = await DespesaService.filtrarDespesas(data);
        setListaDespesas(response.data);
    }

    const handleFiltrarDespesas = (e) => {
        e.preventDefault();
        filtrar(filtroDespesa);
        setFiltroDespesa({});
    };
    

    //Variaveis que controlam a exibição do modal de cadastro de uma nova despesa
    const [showModalCadastroDespesa, setShowCadastroDespesa] = useState(false);
    const handleCloseModalCadastroDespesa = () => setShowCadastroDespesa(false);
    const handleShowModalCadastroDespesa = () => setShowCadastroDespesa(true);

    return (
        <div className='table-categoria'>
            <div className='titulo'>
                <h1>Despesas</h1>
            </div>
            {/* Form filtro */}
            <Form className='form-box' onSubmit={handleFiltrarDespesas}>
                <Row className='linha-form'>
                    <Col xs={3}>
                        <Form.Group className="mb-3">
                            <Form.Label defaultValue="Selecione a categoria">Categoria</Form.Label>
                            <Form.Select onChange={(e) => filtroDespesa.categorias_despesa_id = e.target.value}>
                                <option>Selecione a categoria</option>
                                {
                                    categorias.map((info, key) => {
                                        return (
                                            <option key={key} value={info.id}> {info.descricao} </option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Inicio</Form.Label>
                            <Form.Control onChange={(e) => filtroDespesa.data_inicio = e.target.value} type="date"/>
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fim</Form.Label>
                            <Form.Control onChange={(e) => filtroDespesa.data_fim = e.target.value} type="date" />
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Button type="submit" className='form-button' variant="primary"><BsSearch></BsSearch><span>Filtrar</span></Button>
                    </Col>
                </Row>
            </Form>

     
            {/* Tabela de exibição dos dados */}
            <Table sm  hover className='tabela'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Vencimento</th>
                        <th>Valor</th>
                        <th colSpan={3} style={{textAlign : "center"}}>Funcionalidades</th>
                    </tr>
                </thead>
                <tbody>
                    {listaDespesas.map((info, key) => {
                        return (
                            <tr className='linha-tabela' key={key}>
                                <td xs={3}>{info.descricao}</td>
                                <td xs={2}>{conversorData(info.data_vencimento)}</td>
                                <td xs={1}>{'R$ ' + info.valor}</td>
                                <td xs={2} className="coluna"><a href='#' onClick={() => showModalEditar(info)}><span><MdEditNote className='categoria-icons'></MdEditNote></span> Editar</a></td>
                                <td xs={2} className="coluna"><a href='#' onClick={() => handleShowDelete(info)}><span><MdOutlineDelete className='categoria-icons'></MdOutlineDelete></span>Excluir</a></td>
                                <td xs={2} className="coluna"><a href='#' onClick={() => showModalVisualizar(info)}><span><MdPreview className='categoria-icons'></MdPreview></span>Visualizar</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            {/* Modal editar informações de despesas */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar despesa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAtualizarDespesa}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="" 
                            onChange={(e) => novaDespesa.descricao = e.target.value}
                            defaultValue={objeto.descricao} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control 
                            type="number" min="0" 
                            placeholder="R$:500,00" 
                            onChange={(e) => novaDespesa.valor = e.target.value}
                            defaultValue={parseFloat(objeto.valor)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label defaultValue="Selecione a categoria">Categoria</Form.Label>
                            <Form.Select required={true} onChange={(e) => novaDespesa.categorias_despesa_id = e.target.value} >
                                <option>Selecione a categoria</option>
                                {
                                    categorias.map((info, key) => {
                                        if(info.id === objeto.id){
                                            return <option key={key} value={info.id} selected={true}> {info.descricao} </option>
                                        }else{
                                            return <option key={key} value={info.id}> {info.descricao} </option>
                                        }
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Data de vencimento</Form.Label>
                            <Form.Control 
                            type="date" 
                            onChange={(e) => novaDespesa.data_vencimento = e.target.value}
                            defaultValue={objeto.data_vencimento} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check 
                            type="checkbox" 
                            label="Deseja ser alertado no vencimento?" 
                            onChange={(e) => novaDespesa.alertar_vencimento = e.target.value}
                            checked={objeto.alertar_vencimento} />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            <MdSend /><span style={{ marginLeft: "5px" }}>Salvar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            {/* Modal dialog para confirmar delete de despesa */}

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir esta categoria?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={deletarDespesa}>
                        <FaCheck /><span style={{ marginLeft: "5px" }}>Sim</span>
                    </Button>
                    <Button variant="danger" onClick={handleCloseDelete}>
                        <MdClose></MdClose><span style={{ marginLeft: "5px" }}>Não</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para visualizar as informações das despesas */}

            <Modal show={view} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>{objeto.descricao}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Valor: R$ {objeto.valor}</h5>
                    <h5>Data:  {objeto.data_vencimento}</h5>
                    <h5>Pago: {objeto.quitado === true ? 'Sim' : 'Não'}</h5>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

            {/* Modal para cadastro de uma nova despesa */}
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
                                            <option key={key} value={info.id}> {info.descricao} </option>
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
            <div className='barra-botao'><Button onClick={handleShowModalCadastroDespesa} className='botao' variant="outline-dark" size="lg"><BsPlusCircle /><span>Adicionar despesa</span></Button></div>
        </div>
    )
}

export default Despesas