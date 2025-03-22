import React from 'react';
import { Link } from 'react-router-dom';
import Vivienda from '../Vivienda/Vivienda';
import './ListVivienda.css';

const ListVivienda = ({ propiedades }) => {
  if (!propiedades || propiedades.length === 0) {
    return <div className="no-propiedades">No hay propiedades disponibles</div>;
  }

  return (
    <div className="propiedades-grid">
      {propiedades.map(propiedad => (
        <Link 
          to={`/propiedad/${propiedad.id}`} 
          key={propiedad.id}
          className="propiedad-link"
        >
          <Vivienda propiedad={propiedad} />
        </Link>
      ))}
    </div>
  );
};

export default ListVivienda; 