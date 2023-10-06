const DelitoCard = ({ delito, onArchivarClick }) => {
    // Verifica si delito es undefined o null antes de acceder a sus propiedades
    if (!delito) {
      return null; // O muestra un mensaje de error o un componente de carga
    }
  
    return (
      <div className="delito-card">
        <h3>Tipo de Delito: {delito.tipoDelito}</h3>
        <p>Categoría de Delito: {delito.categoriaDelito.nombre}</p>
        <p>Usuario Reporte: {delito.usuarioReporte}</p>
        <p>Ubicación: {delito.ubicacion}</p>
        <p>Dirección: {delito.direccion}</p>
        <p>Comuna: {delito.comuna.nombre}</p>
        <p>Descripción: {delito.descripcion}</p>
        <p>Testigos: {delito.testigos ? "Sí" : "No"}</p>
        <p>Estado: {delito.estado}</p>
        <p>Fecha: {delito.fecha}</p>
        <button onClick={() => onArchivarClick(delito._id)}>Archivar</button>
      </div>
    );
  };
  
  export default DelitoCard;
  