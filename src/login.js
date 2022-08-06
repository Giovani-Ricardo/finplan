import React from 'react'
import { Form, Button } from 'react-bootstrap'
import './assets/stylesheets/login.css'

function Login({logar}) {

    return (
        <div className='container-login'>
            <Form>
                <fieldset className='form-login'>
                    <legend>Faça Login na sua conta FinPlan</legend>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@email.com" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite a sua senha" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Manter conectado?" />
                    </Form.Group>
                    <Button className="login-button" variant="secondary" size="lg" onClick={() => logar()}>
                        Entrar
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
}

export default Login;