import React from "react";
import "./assets/stylesheets/footer.css";
import fac from "./assets/images/fac.jpeg";
import inst from "./assets/images/ins.jpeg";

function Footer(props) {
  return (

    <footer className="footer">

      <ul className="nav-footer">
        <li>
          <a href="#" className="link">Home</a>
        </li>
        <li>
          <a href="#" className="link">
            Cadastro
          </a>
        </li>
        <li>
          <a href="#" className="link">
            Entrar
          </a>
        </li>

      </ul>

      <ul className="nav-icons">
        <li className="img-link">
          <a href="#">
            <img className="img" variant="top" src={fac} href="#" />
          </a>
        </li>
        <li className="img-link">
          <a href="#">
            <img className="img" variant="top" src={inst} href="#" />
          </a>
        </li>
      </ul>

    </footer>

  );
}

export default Footer;
