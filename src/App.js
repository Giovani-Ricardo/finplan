import './assets/stylesheets/App.css';
import './assets/stylesheets/login.css'
import { useState } from 'react';
import Nav_bar from './navigation'
import NavBar from './assets/components/NavBar'

function App() {
    const [logado, setLogado] = useState(false);

    const logar = () => {
        setLogado(!logado)
    }


    if(logado) {
        return <div><NavBar logar={logar}></NavBar></div>
    } else {
        return (
        <div className='conteudo'><Nav_bar logar={logar}></Nav_bar></div>
        )
    }


}

export default App;
