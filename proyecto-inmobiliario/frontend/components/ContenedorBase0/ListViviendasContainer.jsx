import React, { useState, useEffect } from 'react';
import ListVivienda from '../Viviendas/ListVivienda';
import './ListViviendasContainer.css';

const ListViviendasContainer = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    precioMin: '',
    precioMax: '',
    habitacionesMin: '',
    habitacionesMax: '',
    banosMin: '',
    banosMax: '',
    metrosMin: '',
    metrosMax: '',
    tipoPropiedad: '',
    tipoOperacion: '',
    zona: '',
    distrito: ''
  });

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/propiedades/');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setPropiedades(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  const resetFiltros = () => {
    setFiltros({
      precioMin: '',
      precioMax: '',
      habitacionesMin: '',
      habitacionesMax: '',
      banosMin: '',
      banosMax: '',
      metrosMin: '',
      metrosMax: '',
      tipoPropiedad: '',
      tipoOperacion: '',
      zona: '',
      distrito: ''
    });
  };

  // Obtener lista de distritos únicos para el filtro
  const distritos = [...new Set(propiedades.map(prop => prop.distrito))].sort();
  
  // Obtener lista de zonas únicas para el filtro
  const zonas = [...new Set(propiedades.map(prop => prop.zona).filter(Boolean))].sort();
  
  // Obtener lista de tipos de propiedades para el filtro
  const tiposPropiedades = [...new Set(propiedades.map(prop => prop.tipo_propiedad).filter(Boolean))].sort();

  // Filtrar propiedades según los criterios
  const propiedadesFiltradas = propiedades.filter(propiedad => {
    return (
      (filtros.precioMin === '' || propiedad.precio >= parseInt(filtros.precioMin)) &&
      (filtros.precioMax === '' || propiedad.precio <= parseInt(filtros.precioMax)) &&
      (filtros.habitacionesMin === '' || propiedad.habitaciones >= parseInt(filtros.habitacionesMin)) &&
      (filtros.habitacionesMax === '' || propiedad.habitaciones <= parseInt(filtros.habitacionesMax)) &&
      (filtros.banosMin === '' || (propiedad.banos && propiedad.banos >= parseInt(filtros.banosMin))) &&
      (filtros.banosMax === '' || (propiedad.banos && propiedad.banos <= parseInt(filtros.banosMax))) &&
      (filtros.metrosMin === '' || propiedad.metros_cuadrados >= parseInt(filtros.metrosMin)) &&
      (filtros.metrosMax === '' || propiedad.metros_cuadrados <= parseInt(filtros.metrosMax)) &&
      (filtros.tipoPropiedad === '' || propiedad.tipo_propiedad === filtros.tipoPropiedad) &&
      (filtros.tipoOperacion === '' || propiedad.tipo_operacion === filtros.tipoOperacion) &&
      (filtros.zona === '' || propiedad.zona === filtros.zona) &&
      (filtros.distrito === '' || propiedad.distrito === filtros.distrito)
    );
  });

  return (
    <div className="list-viviendas-container">
      <div className="filtros-section">
        <h2>Filtros de búsqueda</h2>
        <div className="filtros-grid">
          <div className="filtro-grupo">
            <label htmlFor="precioMin">Precio mínimo</label>
            <input 
              type="number" 
              id="precioMin" 
              name="precioMin"
              placeholder="Ej: 150000"
              value={filtros.precioMin}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="precioMax">Precio máximo</label>
            <input 
              type="number" 
              id="precioMax" 
              name="precioMax"
              placeholder="Ej: 500000"
              value={filtros.precioMax}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="habitacionesMin">Habitaciones mínimas</label>
            <input 
              type="number" 
              id="habitacionesMin" 
              name="habitacionesMin"
              placeholder="Ej: 2"
              value={filtros.habitacionesMin}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="habitacionesMax">Habitaciones máximas</label>
            <input 
              type="number" 
              id="habitacionesMax" 
              name="habitacionesMax"
              placeholder="Ej: 4"
              value={filtros.habitacionesMax}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="banosMin">Baños mínimos</label>
            <input 
              type="number" 
              id="banosMin" 
              name="banosMin"
              placeholder="Ej: 1"
              value={filtros.banosMin}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="banosMax">Baños máximos</label>
            <input 
              type="number" 
              id="banosMax" 
              name="banosMax"
              placeholder="Ej: 3"
              value={filtros.banosMax}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="metrosMin">Metros² mínimos</label>
            <input 
              type="number" 
              id="metrosMin" 
              name="metrosMin"
              placeholder="Ej: 60"
              value={filtros.metrosMin}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="metrosMax">Metros² máximos</label>
            <input 
              type="number" 
              id="metrosMax" 
              name="metrosMax"
              placeholder="Ej: 150"
              value={filtros.metrosMax}
              onChange={handleFiltroChange}
            />
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="tipoPropiedad">Tipo de propiedad</label>
            <select 
              id="tipoPropiedad" 
              name="tipoPropiedad"
              value={filtros.tipoPropiedad}
              onChange={handleFiltroChange}
            >
              <option value="">Todos los tipos</option>
              {tiposPropiedades.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="tipoOperacion">Tipo de operación</label>
            <select 
              id="tipoOperacion" 
              name="tipoOperacion"
              value={filtros.tipoOperacion}
              onChange={handleFiltroChange}
            >
              <option value="">Todas las operaciones</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="zona">Zona</label>
            <select 
              id="zona" 
              name="zona"
              value={filtros.zona}
              onChange={handleFiltroChange}
            >
              <option value="">Todas las zonas</option>
              {zonas.map(zona => (
                <option key={zona} value={zona}>{zona}</option>
              ))}
            </select>
          </div>
          
          <div className="filtro-grupo">
            <label htmlFor="distrito">Distrito</label>
            <select 
              id="distrito" 
              name="distrito"
              value={filtros.distrito}
              onChange={handleFiltroChange}
            >
              <option value="">Todos los distritos</option>
              {distritos.map(distrito => (
                <option key={distrito} value={distrito}>{distrito}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button className="reset-filtros" onClick={resetFiltros}>
          Restablecer filtros
        </button>
      </div>

      <div className="lista-resultados">
        <h2>Resultados ({propiedadesFiltradas.length} propiedades)</h2>
        
        {loading ? (
          <div className="loading">Cargando propiedades...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : propiedadesFiltradas.length > 0 ? (
          <ListVivienda propiedades={propiedadesFiltradas} />
        ) : (
          <div className="no-resultados">
            No se encontraron propiedades con los criterios de búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListViviendasContainer; 