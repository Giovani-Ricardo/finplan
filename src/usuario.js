import React, {useState, useContext} from 'react'
import './assets/stylesheets/cadastro.css'
import estados from './data/estados.json'
import { useNavigate } from "react-router-dom";
import { Form, Col, Row, Button } from 'react-bootstrap';
import UserService from './services/UserService';


function Usuario(props) {
    const navigate = useNavigate();

    // Cadastro de um novo usuario
    const [novoUsuario, setNovoUsuario] = useState({endereco_atributtes: {}});
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const cadastrarUsuario = async (data) => {
        console.log(data);
        const response = await UserService.createUser(data);
        if(response.status === 200){
            navigate('/login')
        }
    }

    const handleCadastrarUsuario = (e) => {
        e.preventDefault();
        cadastrarUsuario(novoUsuario);
        setNovoUsuario({endereco_atributtes: {}});
    };

    return (
        <div className='container-cadastro'>
            <h1>Editar Cadastro</h1>
            <Form onSubmit={handleCadastrarUsuario}>
                <Row className="mb-3">
                    <Form.Group controlId="formGridNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                        type="text"
                        onChange={(e) => novoUsuario.nome = e.target.value}
                        placeholder="Digite seu nome" />
                    </Form.Group>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email"
                        onChange={(e) => novoUsuario.email = e.target.value}
                        placeholder="Digite seu melhor email" />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                        type="password" 
                        onChange={(e) => novoUsuario.password = e.target.value}
                        placeholder="Cadastre sua senha" />
                    </Form.Group>

                    <Form.Group controlId="formGridConfirmPassword">
                        <Form.Label>Confirmar senha</Form.Label>
                        <Form.Control 
                        type="password" 
                        onChange={(e) => setConfirmarPassword(e.target.value)}
                        placeholder="Confirme sua senha" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control 
                    onChange={(e) => novoUsuario.endereco_atributtes.logradouro = e.target.value}
                    placeholder="Rua vitoria santos, 1000" />
                </Form.Group>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control 
                        placeholder="00000-000"
                        onChange={(e) => novoUsuario.endereco_atributtes.cep = e.target.value}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control onChange={(e) => novoUsuario.endereco_atributtes.cidade = e.target.value}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select defaultValue="Selecione seu estado" onChange={(e) => novoUsuario.endereco_atributtes.estado = e.target.value}
>
                            <option>Selecione seu estado</option>
                           {
                            estados.UF.map((estado, key) => {
                                return <option key={key}>{estado.sigla}</option>
                            })
                           }
                            
                        </Form.Select>
                    </Form.Group>


                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Está de acordo a política de privacidade?" />
                    <a href="#">políticas de privacidade</a>
                </Form.Group>

                <Button className='cadastro-button' variant="outline-secondary" size="lg" type="submit">
                    Enviar
                </Button>
            </Form>
        </div>
    );
}

export default Usuario;