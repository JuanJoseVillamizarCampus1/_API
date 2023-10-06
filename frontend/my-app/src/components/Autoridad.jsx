import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DenunciaCard from "./CardDenuncias";
import DelitoCard from "./CarDelito";

const Autoridad = () => {
  const history = useHistory();
  const [denuncias, setDenuncias] = useState([]);
  const [delitos, setDelitos] = useState([]);  // Estado para almacenar las denuncias

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
        .get("http://localhost:8001/api/denuncia-anonima?page=1&perPage=10", { headers })
        .then((response) => {
          setDenuncias(response.data.denuncias);
        })
        .catch((error) => {
          console.error("Error al obtener denuncias", error);
        });
        axios.get("http://localhost:8001/api/delitos?page=1&perPage=10", { headers })
        .then((response) => {
          console.log("Respuesta de delitos:", response.data);
          setDelitos(response.data.delitos);
        })
        .catch((error) => {
          console.error("Error al obtener delitos", error);
        });
    } else {
      // Si no hay un token, redirigir al usuario a la página de inicio de sesión
      history.push("/login");
    }
  }, []);
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
  
      <div>
        <h2>Delitos con usuario en Curso:</h2>
        {delitos.length > 0 ? (
          delitos.map((delito) => (
            <DelitoCard
              key={delito._id}
              delito={delito}
              onArchivarClick={handleArchivarClick}
            />
          ))
        ) : (
          <p>Cargando delitos...</p>
        )}
      </div>
    </div>
  );
  
};

export default Autoridad;
