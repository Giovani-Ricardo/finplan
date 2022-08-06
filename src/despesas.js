import React from 'react'
import { useState} from 'react';
import {MdEditNote, MdOutlineDelete, MdPreview, MdSend,MdClose } from 'react-icons/md';
import {FaCheck} from 'react-icons/fa';
import {BsPlusCircle, BsSearch} from 'react-icons/bs';
import { Col, Row, Table, Modal, Button, Form } from 'react-bootstrap'
import './assets/stylesheets/despesas.css'
import dados from './data/categories.json'
import dados_despesas from './data/expenses.json'
import { filtrarDespesa } from './assets/funcoes/filtroDespesas';

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
        data_objeto = (info.date.split('/').reverse().join('-'));
    }

    //Variaveis que controlam o modal que exibe o alerta para confirmar delete de despesa
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    //Variaveis que controlam a exibição do modal de visualização das informações de despesas
    const [view, setView] = useState(false);
    const handleCloseView = () => setView(false);

    //Função resposável por mostrar o modal visualização de informações de despesas e passar as informações
    const showModalVisualizar = (info) => {
        setView(true);
        objeto = info;
    }

    const [listaDespesas, setListaDespesas] = useState(dados_despesas)
    const filtrar = (d) => {
  
        let nova_lista = filtrarDespesa(selectCategoria, dataInicio, dataFim, d);
        setListaDespesas(nova_lista);
    }
    

    //Variaveis que controlam a exibição do modal de cadastro de uma nova despesa
    const [showModalCadastroDespesa, setShowCadastroDespesa] = useState(false);
    const handleCloseModalCadastroDespesa = () => setShowCadastroDespesa(false);
    const handleShowModalCadastroDespesa = () => setShowCadastroDespesa(true);

    return (
        <div className='table-categoria'>
            <div className='titulo'>
                <h1>Despesas</h1>
            </div>
            <Form className='form-box'>
                <Row className='linha-form'>
                    <Col xs={3}>
                        <Form.Group className="mb-3">
                            <Form.Label defaultValue="Selecione a categoria">Categoria</Form.Label>
                            <Form.Select onChange={(e) => selectCategoria = e.target.value}>
                                <option>Selecione a categoria</option>
                                {
                                    dados.map((info, key) => {
                                        return (
                                            <option key={key}>{info.name}</option>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Inicio</Form.Label>
                            <Form.Control onChange={(e) => dataInicio = e.target.value} type="date" />
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fim</Form.Label>
                            <Form.Control onChange={(e) => dataFim = e.target.value} type="date" />
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Button onClick={() => filtrar(dados_despesas)} className='form-button' variant="primary"><BsSearch></BsSearch><span>Filtrar</span></Button>
                    </Col>
                </Row>
            </Form>

     

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
                                
                                    <td xs={3}>{info.description}</td>
                                    <td xs={2}>{info.date}</td>
                                    <td xs={1}>{'R$ ' + info.amount}</td>
                                    <td xs={2} className="coluna"><a href='#' onClick={() => showModalEditar(info)}><span><MdEditNote className='categoria-icons'></MdEditNote></span> Editar</a></td>
                                    <td xs={2} className="coluna"><a href='#' onClick={handleShowDelete}><span><MdOutlineDelete className='categoria-icons'></MdOutlineDelete></span>Excluir</a></td>
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
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" placeholder="" defaultValue={objeto.description} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control type="number" min="0" placeholder="R$:500,00" defaultValue={parseFloat(objeto.amount)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Data de vencimento</Form.Label>
                            <Form.Control type="date" placeholder="dd/mm/aaaa" defaultValue={data_objeto} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Deseja ser alertado no vencimento?" />
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
                    <Button variant="success" onClick={handleCloseDelete}>
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
                    <Modal.Title>{objeto.description}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Valor: R$ {objeto.amount}</h5>
                    <h5>Data:  {objeto.date}</h5>
                    <h5>Pago: {objeto.paid == 'true' ? 'Sim' : 'Não'}</h5>
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
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control type="number" min="0" placeholder="R$:500,00" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Data de vencimento</Form.Label>
                            <Form.Control type="date" placeholder="dd/mm/aaaa" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Deseja ser alertado no vencimento?" />
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