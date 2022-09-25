//atalho para criar esqueleto de componente -> rfce
import React, { useState } from 'react';
import {FaBars, FaUserCircle, FaUserEdit } from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import {RiLogoutBoxLine, } from 'react-icons/ri';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../../assets/stylesheets/NavBar.css';
import logo from '../../assets/images/finplan_logo.png'
import { IconContext } from 'react-icons';
import Main from '../../main'
import Categorias from '../../categorias'
import Despesas from '../../despesas'

function NavBar({logar}) {
    const [sidebar, setSidebar] = useState(false);
    const [userbox, setUserbox] = useState(false);

    const showUserbox = () => setUserbox(!userbox)
    const showSidebar = () => setSidebar(!sidebar)

    return (
        <BrowserRouter>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>

                    <Link to="#" className='menu-bars'>
                        <FaBars onClick={showSidebar}></FaBars>
                    </Link>
                    <Link to="#" className=''><img className='logo' src={logo} alt=""></img></Link>
                    <Link to="#" className='menu-user-button'>
                        <FaUserCircle onClick={showUserbox}></FaUserCircle>
                    </Link>
                </div>


                <div className={userbox ? 'menu-user-box active' : 'menu-user-box'}>
                    <ul className='nav-menu-items'>
                        <li className='nav-text'>
                            <Link to="#" className='nav-text'>
                                <FaUserEdit></FaUserEdit>
                                <span>Editar perfil</span>
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <Link to="/login" className='nav-text' onClick={() => logar()}>
                                <RiLogoutBoxLine></RiLogoutBoxLine>
                                <span>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </div>


                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle'>
                            <Link to="#" className='menu-bars'>
                                <AiOutlineClose onClick={showSidebar} />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link onClick={showSidebar} to={item.path} className="nav-text">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>


            </IconContext.Provider>

            <Routes>
                <Route path="/login" element={<Main></Main>}></Route>
                <Route path="/categorias" element={<Categorias />}></Route>
                <Route path="/despesas" element={<Despesas />}></Route>
            </Routes>
        </BrowserRouter>
        
    )
}

export default NavBar