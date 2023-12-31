import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Ciudadano = () => {
  const history = useHistory();
  const usuario = localStorage.getItem("Usuario");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    tipoDelito: "",
    categoriaDelito: "",
    usuarioReporte: usuario,
    direccion: "",
    descripcion: "",
    testigos: false,
    comuna: "",
    barrio: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    if (token) {
      // Configurar los encabezados con el token de autenticación
      const headers = {
        "delitos-api-token-jwt": `${token}`,
      };

      // Realizar las solicitudes axios para obtener categorías, comunas y configurar barrios
      axios
        .get("http://localhost:8001/api/categoriasDelitos/all", { headers })
        .then((response) => {
          setCategorias(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener categorías", error);
        });

      axios
        .get("http://localhost:8001/api/comunas/all", { headers })
        .then((response) => {
          setComunas(response.data.comunas);
        })
        .catch((error) => {
          console.error("Error al obtener comunas", error);
        });

      // Nuevo efecto para obtener los barrios cuando la comuna cambie
      if (formData.comuna) {
        axios
          .get(`http://localhost:8001/api/comunas/${formData.comuna}`, {
            headers,
          })
          .then((response) => {
            setBarrios(response.data);
            console.log(barrios);
          })
          .catch((error) => {
            console.error("Error al obtener barrios", error);
          });
      }
    } else {
      // Si no hay un token, redirigir al usuario a la página de inicio de sesión
      history.push("/login");
    }
  }, [history, formData.comuna]); // Dependencias incluidas en el efecto

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (token) {
        // Configurar los encabezados con el token de autenticación
        const headers = {
          "delitos-api-token-jwt": `${token}`,
        };
        const response = await axios.post(
          "http://localhost:8001/api/delitos",
          formData,
          {
            headers: headers, // Aquí debes pasar los encabezados en la configuración de la solicitud
          }
        );

        if (response.status === 201) {
          setSuccessMsg("Denuncia creada con éxito.");
          setErrorMsg("");
          setFormData({
            tipoDelito: "",
            usuarioReporte: "",
            categoriaDelito: "",
            direccion: "",
            descripcion: "",
            testigos: false,
            comuna: "",
            barrio: "",
          });
        } else {
          console.log(errorMsg);
          setErrorMsg("Error en la solicitud de denuncia.");
        }
      }
    } catch (error) {
      console.error("Error en la solicitud de denuncia", error);
      setErrorMsg("Error en la solicitud de denuncia.");
    }
  };

  return (
    <div>
      <h1>Formulario de Denuncia</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Delito:</label>
          <input
            type="text"
            name="tipoDelito"
            value={formData.tipoDelito}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Categoría de Delito:</label>
          <select
            name="categoriaDelito"
            value={formData.categoriaDelito}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias &&
              categorias.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>¿Hay testigos?</label>
          <input
            type="checkbox"
            name="testigos"
            checked={formData.testigos}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Comuna:</label>
          <select
            name="comuna"
            value={formData.comuna}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una comuna</option>
            {comunas &&
              comunas.map((comuna) => (
                <option key={comuna._id} value={comuna._id}>
                  {comuna.nombre}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Barrios:</label>
          <select
            name="barrio"
            value={formData.barrio}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un barrio</option>
            {barrios.map((barrio) => (
              <option key={barrio} value={barrio}>
                {barrio}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Enviar Denuncia</button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
      <Link to="/">
        <button>Atras</button>
      </Link>
    </div>
  );
};

export default Ciudadano;
