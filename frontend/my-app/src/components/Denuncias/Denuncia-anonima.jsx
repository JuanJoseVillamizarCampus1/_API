import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../header/Navbar";
import "./DenunciaForm.css";

const DenunciaForm = () => {
  const [formData, setFormData] = useState({
    tipoDelito: "",
    categoriaDelito: "",
    direccion: "",
    descripcion: "",
    testigos: false, // Inicializar como un valor booleano
    comuna: "",
    barrio: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [barrios, setBarrios] = useState([]); // Estado para los barrios

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/categoriasDelitos/all")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías", error);
      });

    axios
      .get("http://localhost:8001/api/comunas/all")
      .then((response) => {
        setComunas(response.data.comunas);
      })
      .catch((error) => {
        console.error("Error al obtener comunas", error);
      });
  }, []);

  // Nuevo efecto para obtener los barrios cuando la comuna cambie
  useEffect(() => {
    if (formData.comuna) {
      axios
        .get(`http://localhost:8001/api/comunas/${formData.comuna}`)
        .then((response) => {
          setBarrios(response.data);
          console.log(barrios);
        })
        .catch((error) => {
          console.error("Error al obtener barrios", error);
        });
    }
  }, [formData.comuna]); // Se ejecutará cuando formData.comuna cambie

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Verificar si el campo es un checkbox
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/denuncia-anonima",
        formData, // Aquí enviamos los datos del formulario
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Registro exitoso, mostrar mensaje de éxito
        setSuccessMsg("Denuncia anónima creada con éxito.");
        setErrorMsg("");
        // Limpiar el formulario después del envío exitoso
        setFormData({
          tipoDelito: "",
          categoriaDelito: "",
          direccion: "",
          descripcion: "",
          testigos: false,
          comuna: "",
          barrio: "",
        });
      } else {
        setErrorMsg("Error en la solicitud de denuncia.");
      }
    } catch (error) {
      console.error("Error en la solicitud de denuncia", error);
      setErrorMsg("Error en la solicitud de denuncia.");
    }
  };

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <div className="fondo-d">
        <div className="denuncia-form-container">
          <h1>Formulario de Denuncia Anónima</h1>
          <form onSubmit={handleSubmit} className="denuncia-form">
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
            <button type="submit" className="denuncia-button">
              Enviar Denuncia
            </button>
          </form>
          {errorMsg && <p>{errorMsg}</p>}
          {successMsg && <p>{successMsg}</p>}
          <Link to="/">
            <button className="back-button">Atras</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DenunciaForm;
