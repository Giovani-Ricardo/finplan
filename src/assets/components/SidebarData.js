import React from 'react'
import FaFileInvoiceDollar from 'react-icons/fa';
import AiFillHome from 'react-icons/ai';
import MdCategory from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/login',
        icon: <AiFillHome></AiFillHome>,
        cName: 'nav-text'
    },
    {
        title: 'Categorias',
        path: '/categorias',
        icon: <MdCategory/>,
        cName: 'nav-text'
    },
    {
        title: 'Despesas',
        path: '/despesas',
        icon: <FaFileInvoiceDollar/>,
        cName: 'nav-text'
    }
    
]