import React from "react";
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
  );
};

export default Home;
