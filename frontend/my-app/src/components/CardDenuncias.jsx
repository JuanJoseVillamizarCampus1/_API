import React from "react";

const DenunciaCard = ({ denuncia, onArchivarClick }) => {
  return (
    <div className="denuncia-card">
      <h3>Tipo de Delito: {denuncia.tipoDelito}</h3>
      <p>Categoría de Delito: {denuncia.categoriaDelito.nombre}</p>
      <p>Ubicación: {denuncia.ubicacion}</p>
      <p>Dirección: {denuncia.direccion}</p>
      <p>Comuna: {denuncia.comuna.nombre}</p>
      <p>Descripción: {denuncia.descripcion}</p>
      <p>Testigos: {denuncia.testigos ? "Sí" : "No"}</p>
      <p>Estado: {denuncia.estado}</p>
      <p>Fecha: {denuncia.fecha}</p>
      <button onClick={() => onArchivarClick(denuncia._id)}>Archivar</button>
    </div>
  );
};

export default DenunciaCard;
