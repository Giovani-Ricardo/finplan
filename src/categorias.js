import React from 'react'
import { useState, useEffect } from 'react';
import {MdEditNote, MdOutlineDelete, MdPreview, MdSend,MdClose } from 'react-icons/md';
import {FaCheck} from 'react-icons/fa';
import {BsPlusCircle} from 'react-icons/bs';
import {Table, Modal, Button, Form } from 'react-bootstrap'
import './assets/stylesheets/categoria.css'
import dados from './data/categories.json'
import CategoriaService from "./services/CategoriaService"



var objeto = {};

function Categorias() {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const showModal = (info) => {
        setShow(true)
        objeto = info;
    }

    // Controle do modal de confirmação deletar
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (info) => {
        setShowDelete(true);
        objeto = info;
    };

    // Deletar uma categoria
    const deletarCategoria = async () => {
        const response = await CategoriaService.removeCategoria(objeto.id);
        objeto = {};
        if(response.status === 204){
            getCategorias();
        }
        handleCloseDelete();
    }

    const [view, setView] = useState(false);
    const handleCloseView = () => setView(false);
    const showModalView = (info) => {
        setView(true);
        objeto = info;
    }

    const [showModalCadastro, setShowModalCadastro] = useState(false);
    const handleShowModalCadastro = () => setShowModalCadastro(true);
    const handleCloseModalCadastro = () => setShowModalCadastro(false);

    // Obtendo todas as categorias
    const [categorias, setCategorias] = useState([])
    const getCategorias = async () => {
        const response = await CategoriaService.getCategorias();
        if(response.status === 200){
            setCategorias(response.data)
        }
    }

    // Cadastrando novas categorias
    const [novaCategoria, setNovaCategoria] = useState({});

    const cadastrarCategoria = async (data) => {
        const response = await CategoriaService.createCategoria(data);
        if(response.status === 201){
            getCategorias();
        }
    }

    const handleCadastrarCategoria = (e) => {
        e.preventDefault();
        cadastrarCategoria(novaCategoria);
        handleCloseModalCadastro();
        setNovaCategoria({});
    };

    // Atualizar categorias 
    const atualizarCategoria = async (id, data) => {
        const response = await CategoriaService.updateCategoria(id, data);
        if(response.status === 200){
            getCategorias();
        }
    }
    
    const handleAtualizarCategoria = (e) => {
        e.preventDefault();
        atualizarCategoria(objeto.id, novaCategoria);
        handleClose();
        setNovaCategoria({});
    };  

    useEffect(() => {
        getCategorias();
    }, []);



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
                    {categorias.map((info, key) => {
                        return (
                            <tr className='linha-tabela' key={key}>
                                <td xs={3}>{info.nome}</td>
                                <td xs={2} className="coluna"><a href='#' onClick={() => showModal(info)}><span><MdEditNote className='categoria-icons'></MdEditNote></span> Editar</a></td>
                                <td xs={2} className="coluna"><a href='#' onClick={() => handleShowDelete(info)}><span><MdOutlineDelete className='categoria-icons'></MdOutlineDelete></span>Excluir</a></td>
                                <td xs={2} className="coluna"><a href='#' onClick={() => showModalView(info)}><span><MdPreview className='categoria-icons'></MdPreview></span>Visualizar</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>    

            {/* Modal editar categoria */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAtualizarCategoria}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="" 
                            onChange={(e) => novaCategoria.nome = e.target.value}
                            defaultValue={objeto.nome} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                            type="text" 
                            as="textarea" 
                            onChange={(e) => novaCategoria.descricao = e.target.value}
                            placeholder="Enter email" defaultValue={objeto.descricao} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Percentual</Form.Label>
                            <Form.Control 
                            type="number" 
                            max="100" min="0"
                            placeholder="0" 
                            onChange={(e) => novaCategoria.percentual = e.target.value}
                            defaultValue={parseFloat(objeto.percentual)} />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            <MdSend /><span>Enviar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
            
            {/* Modal para cadastrar uma nova categoria */}
            <Modal show={showModalCadastro} onHide={handleCloseModalCadastro}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCadastrarCategoria}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                            required
                            type="text" 
                            onChange={(e) => novaCategoria.nome = e.target.value}
                            placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                            required
                            type="text" as="textarea"
                            onChange={(e) => novaCategoria.descricao = e.target.value}
                            placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="percentage">
                            <Form.Label>Percentual</Form.Label>
                            <Form.Control 
                            type="number" 
                            required
                            onChange={(e) => novaCategoria.percentual = e.target.value}
                            max="100" min="0" 
                            placeholder="0" />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            <MdSend /><span>Enviar</span>
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            {/* Modal confirmação de delete */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir esta categoria?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={deletarCategoria}>
                        <FaCheck /><span style={{marginLeft:"5px"}}>Sim</span>
                    </Button>
                    <Button variant="danger" onClick={handleCloseDelete}>
                        <MdClose></MdClose><span style={{marginLeft:"5px"}}>Não</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de visualização dos dados */}
            <Modal show={view} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>{objeto.nome}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <h4>Descrição:</h4>
                    <p>{objeto.descricao}</p>
                    <h4>Proporção:</h4>
                    <span>{objeto.percentual}%</span>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <div className='barra-botao'><Button className='botao' variant="outline-dark" size="lg" onClick={handleShowModalCadastro}><BsPlusCircle /><span>Adicionar categoria</span></Button></div>
        </div>
    )
}

export default Categorias