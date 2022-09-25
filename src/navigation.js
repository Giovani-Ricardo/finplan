
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import logo from './assets/images/finplan_logo.png'
import Login from './login'
import Home from './home'
import Cadastro from './cadastro'
import Sobre from './sobre'
import './assets/stylesheets/menu-superior.css'


function Nav_bar({ logar }) {
    return (
        <>

            <BrowserRouter>

                <Navbar className="menu-superior" variant="dark" expand="sm">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Link to='/'><img className='logo' src={logo} alt=""></img></Link>
                        </Nav>

                        <Nav className="me-auto">
                            <Link to='/home' className='link-nav'>Home</Link>

                            <Link to='/home' className='link-nav'>Preços</Link>

                            <Link to='/sobre' className='link-nav'>Sobre</Link>
                        </Nav>
                        <Nav className='botoes'>
                            <Link to='/login' className='menu-button'>Login</Link>
                            <Link to='/cadastro' className='menu-button'>Cadastre-se</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Routes>

                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login logar={logar} />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/sobre" element={<Sobre />} />
                </Routes>

            </BrowserRouter>
        </>
    );
}

export default Nav_bar;