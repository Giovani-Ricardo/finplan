import './assets/stylesheets/App.css';
import './assets/stylesheets/login.css'
import { useState, useContext } from 'react';
import NavBar2 from './navigation'
import NavBar from './assets/components/NavBar'
import {AuthContext} from "./contexts/auth"

function App() {
    const [logado, setLogado] = useState(false);
    // const {logout} = useContext(AuthContext);

    const logar = () => {
        setLogado(!logado)
        
        // if(logado == false){
        //     logout();
        // }
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
