import React from "react";
import './home.css'
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bienvenido al Portal de Delitos</h1>
        <p>Reporta y consulta información sobre delitos en tu ciudad.</p>
        <Link to="/denuncia-anonima">
          <button className="denuncia-button">Reportar delito Anonimamente</button>
        </Link>
      </div>
      <p className="text">Se parte de la cadena para acabar con al delincuencia en tu ciudad.</p>
    </div>
  );
};

export default HomePage;
