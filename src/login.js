import React, {useState, useContext} from 'react'
import { AuthContext } from './contexts/auth';
import { Form, Button } from 'react-bootstrap'
import './assets/stylesheets/login.css'

function Login({logar}) {

    const {authenticated, login} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password, logar)
    };

    return (
        <div className='container-login'>
            <Form onSubmit={handleSubmit}>
                <fieldset className='form-login'>
                    <legend>Faça Login na sua conta FinPlan</legend>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="example@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Digite a sua senha" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Manter conectado?" />
                    </Form.Group>
                    <Button className="login-button" variant="secondary" size="lg" type="submit">
                        Entrar
                    </Button>
                </fieldset>
            </Form>
        </div>
    );
}

export default Login;