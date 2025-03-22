import React from 'react';
import './Vivienda.css';

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(precio);
};

const getEstadoClass = (estado) => {
  switch (estado) {
    case 'Reformado':
      return 'estado-reformado';
    case 'Buen estado':
      return 'estado-bueno';
    case 'A reformar':
      return 'estado-reformar';
    default:
      return '';
  }
};

const Vivienda = ({ propiedad }) => {
  if (!propiedad) return null;

  const {
    id,
    distrito,
    metros_cuadrados,
    habitaciones,
    precio,
    antiguedad,
    estado,
    latitud,
    longitud
  } = propiedad;

  // Generar una imagen aleatoria para cada propiedad (en un caso real usaríamos imágenes reales)
  const imagenUrl = `https://source.unsplash.com/300x200/?apartment,house,${id}`;

  return (
    <div className="vivienda-card">
      <div className="vivienda-imagen">
        <img src={imagenUrl} alt={`Propiedad en ${distrito}`} />
        <div className={`vivienda-estado ${getEstadoClass(estado)}`}>{estado}</div>
      </div>
      
      <div className="vivienda-info">
        <div className="vivienda-ubicacion">{distrito}</div>
        <h3 className="vivienda-titulo">Piso de {metros_cuadrados}m² con {habitaciones} habitaciones</h3>
        
        <div className="vivienda-detalles">
          <div className="vivienda-detalle">
            <span className="icono">🏠</span>
            <span>{metros_cuadrados} m²</span>
          </div>
          <div className="vivienda-detalle">
            <span className="icono">🛏️</span>
            <span>{habitaciones} hab.</span>
          </div>
          <div className="vivienda-detalle">
            <span className="icono">🗓️</span>
            <span>{antiguedad} años</span>
          </div>
        </div>
        
        <div className="vivienda-precio">{formatearPrecio(precio)}</div>
      </div>
    </div>
  );
};

export default Vivienda; 