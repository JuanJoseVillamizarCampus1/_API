import React from "react";
import { Link } from "react-router-dom";
const Ciudadano = () => {
  return (
    <div>
      <h1>Holi eses un usuario regular </h1>
      <Link to="/">
        <button>Atras</button>
      </Link>
    </div>
  );
};

export default Ciudadano;