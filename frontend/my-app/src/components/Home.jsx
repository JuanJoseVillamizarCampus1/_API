import React from "react";
<<<<<<< HEAD
import Navbar from "./header/Navbar";
import HomePage from "./contenidoHome/HomePage";
const Home = () => {
  return (
      <div className="App">
        <Navbar />
        <HomePage/>
      </div>
     
  

    // <div>
    //   <h1>Página de Inicio - Delitos</h1>
    //   <p>Bienvenido a la plataforma de denuncias de delitos.</p>
    //   <div>
    //     <Link to="/login">
    //       <button>Iniciar Sesión</button>
    //     </Link>
    //   </div>
    //   <div>
    //     <Link to="/registro">
    //       <button>Registrarse</button>
    //     </Link>
    //   </div>
    //   <div>
    //     <Link to="/denuncia-anonima">
    //       <Button>Hacer Denuncia Anónima</Button>
    //     </Link>
    //   </div>
    // </div>
=======
import HeaderBanner from '../components/banner/banner'
import Header from '../components/header/Holi';
const Home = () => {
  return (
    <div id="main-wrapper">
      <Header/>
      <div className="page-wrapper">
          <div className="container-fluid">
              <HeaderBanner/>
          </div>  
      </div>
    </div>
>>>>>>> 04aa08e351cc3ea499d13b72c68236bb63794bb7
  );
};

export default Home;
