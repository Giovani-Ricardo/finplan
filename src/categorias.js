import React from 'react'
import { useState } from 'react';
import {MdEditNote, MdOutlineDelete, MdPreview, MdSend,MdClose } from 'react-icons/md';
import {FaCheck} from 'react-icons/fa';
import {BsPlusCircle} from 'react-icons/bs';
import {Table, Modal, Button, Form } from 'react-bootstrap'
import './assets/stylesheets/categoria.css'
import dados from './data/categories.json'


var objeto = {};

function Categorias() {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const showModal = (info) => {
        setShow(true)
        objeto = info;
    }

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const [view, setView] = useState(false);
    const handleCloseView = () => setView(false);
    const showModalView = (info) => {
        setView(true);
        objeto = info;
    }

    const [showModalCadastro, setShowModalCadastro] = useState(false);
    const handleShowModalCadastro = () => setShowModalCadastro(true);
    const handleCloseModalCadastro = () => setShowModalCadastro(false);


    return (
        <div className='table-categoria'>
            <div className='titulo'>
                <h1>Categorias</h1>
            </div>

            <Table sm hover className='tabela'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th colSpan={3} style={{textAlign : "center"}}>Funcionalidades</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((info, key) => {
                        return (
                            <tr className='linha-tabela' key={key}>
                                    <td xs={3}>{info.name}</td>
                                    <td xs={2} className="coluna"><a href='#' onClick={() => showModal(info)}><span><MdEditNote className='categoria-icons'></MdEditNote></span> Editar</a></td>
                                    <td xs={2} className="coluna"><a href='#' onClick={handleShowDelete}><span><MdOutlineDelete className='categoria-icons'></MdOutlineDelete></span>Excluir</a></td>
                                    <td xs={2} className="coluna"><a href='#' onClick={() => showModalView(info)}><span><MdPreview className='categoria-icons'></MdPreview></span>Visualizar</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>    

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="" defaultValue={objeto.name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" as="textarea" placeholder="Enter email" defaultValue={objeto.description} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Percentual</Form.Label>
                            <Form.Control type="number" max="100" min="0" placeholder="0" defaultValue={parseFloat(objeto.percentage)} />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            <MdSend /><span>Enviar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            <Modal show={showModalCadastro} onHide={handleCloseModalCadastro}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" as="textarea" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Percentual</Form.Label>
                            <Form.Control type="number" max="100" min="0" placeholder="0" />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            <MdSend /><span>Enviar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir esta categoria?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseDelete}>
                        <FaCheck /><span style={{marginLeft:"5px"}}>Sim</span>
                    </Button>
                    <Button variant="danger" onClick={handleCloseDelete}>
                        <MdClose></MdClose><span style={{marginLeft:"5px"}}>Não</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={view} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>{objeto.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <h4>Descrição:</h4>
                    <p>{objeto.description}</p>
                    <h4>Proporção:</h4>
                    <span>{objeto.percentage}%</span>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <div className='barra-botao'><Button className='botao' variant="outline-dark" size="lg" onClick={handleShowModalCadastro}><BsPlusCircle /><span>Adicionar categoria</span></Button></div>
        </div>
    )
}

export default Categorias