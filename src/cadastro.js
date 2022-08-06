import React from 'react'
import './assets/stylesheets/cadastro.css'
import estados from './data/estados.json'
import { Form, Col, Row, Button } from 'react-bootstrap';

function Cadastro(props) {

    return (
        <div className='container-cadastro'>
            <h1>Página de cadastro</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu melhor email" />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Cadastre sua senha" />
                    </Form.Group>

                    <Form.Group controlId="formGridConfirmPassword">
                        <Form.Label>Confirmar senha</Form.Label>
                        <Form.Control type="password" placeholder="Confirme sua senha" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control placeholder="Rua vitoria santos, 1000" />
                </Form.Group>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select defaultValue="Selecione seu estado">
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

export default Cadastro;