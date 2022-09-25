import './assets/stylesheets/App.css';
import './assets/stylesheets/login.css'
import { useState } from 'react';
import NavBar2 from './navigation'
import NavBar from './assets/components/NavBar'

function App() {
    const [logado, setLogado] = useState(true);

    const logar = () => {
        setLogado(!logado)
    }


    if(logado) {
        return (<div><NavBar logar={logar}></NavBar></div>)
    } else {
        return (
        <div className='conteudo'><NavBar2 logar={logar}></NavBar2></div>
        )
    }


}

export default App;
