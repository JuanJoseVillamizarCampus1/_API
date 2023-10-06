import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DenunciaCard from "./CardDenuncias";

const Autoridad = () => {
  const history = useHistory();
  const [denuncias, setDenuncias] = useState([]); // Estado para almacenar las denuncias

  useEffect(() => {
    // Obtener token de localStorage
    const token = localStorage.getItem("token");

    // Verificar si hay un token
    if (token) {
      // Configurar los encabezados con el token de autenticación
      const headers = {
        'delitos-api-token-jwt': `${token}`,
      };

      // Realizar la solicitud GET al endpoint de denuncias
      axios
        .get("http://localhost:8001/api/denuncia-anonima", { headers })
        .then((response) => {
          setDenuncias(response.data.denuncias);
        })
        .catch((error) => {
          console.error("Error al obtener denuncias", error);
        });
    } else {
      // Si no hay un token, redirigir al usuario a la página de inicio de sesión
      history.push("/login");
    }
  }, [history]);
  const handleArchivarClick = (denunciaId) => {
    // Aquí puedes implementar la lógica para archivar una denuncia
    // Puedes enviar una solicitud al servidor para realizar la acción de archivar
    // Por ejemplo, usando axios.post()
    // Luego puedes actualizar la lista de denuncias en el estado
  };
  return (
    <div>
      <h1>Holiii eres Autoridad</h1>
      <Link to="/">
        <button>Atras</button>
      </Link>

      <h2>Denuncias en Curso:</h2>
      {denuncias.map((denuncia) => (
        <DenunciaCard
          key={denuncia._id}
          denuncia={denuncia}
          onArchivarClick={handleArchivarClick}
        />
      ))}
    </div>
  );
};

export default Autoridad;
