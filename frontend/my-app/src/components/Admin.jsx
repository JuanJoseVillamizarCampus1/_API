import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Admin = () => {
  const storedToken = localStorage.getItem("rol");
  const storedUsuario = localStorage.getItem("Usuario");
  console.log('storedUsuario:',JSON.parse(storedUsuario));
  const decodeToken = (storedToken,storedUsuario) => {
    try {
      const decoded = jwt_decode(storedToken,storedUsuario); // Decodifica el token
      return decoded;
    } catch (error) {
      return null;
    }
  };
  const decodedToken = decodeToken(storedToken); 
  const decodeUsuario = decodeToken(storedUsuario);
  console.log(decodeUsuario);
 console.log(decodedToken);
  return (
    <div>
      <h1>Grande capo iniciaste sesion sos un crak  sos Admin</h1>
      
      <Link to="/">
        <button>Atras</button>
      </Link>
    </div>
  );
};

export default Admin;