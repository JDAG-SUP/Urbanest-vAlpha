import React, { useState, useEffect } from 'react';
import './model.css';

const ModeloPredictivo = () => {
  const [formData, setFormData] = useState({
    metros_cuadrados: '',
    habitaciones: '',
    antiguedad: '',
    distrito: ''
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    // Obtener la lista de distritos disponibles
    const fetchDistritos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/propiedades/');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los distritos');
        }
        
        const propiedades = await response.json();
        const distritosUnicos = [...new Set(propiedades.map(p => p.distrito))].sort();
        setDistritos(distritosUnicos);
      } catch (err) {
        console.error('Error al cargar distritos:', err);
      }
    };

    fetchDistritos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(precio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar datos antes de enviar
    const { metros_cuadrados, habitaciones, antiguedad, distrito } = formData;
    if (!metros_cuadrados || !habitaciones || !antiguedad || !distrito) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/api/predecir/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metros_cuadrados: parseFloat(metros_cuadrados),
          habitaciones: parseInt(habitaciones),
          antiguedad: parseInt(antiguedad),
          distrito
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error en la predicción');
      }
      
      setResultado(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predictor-container">
      <div className="predictor-header">
        <h2>Predictor de Precios Inmobiliarios</h2>
        <p className="predictor-descripcion">
          Utiliza nuestro modelo de inteligencia artificial para predecir el precio de una propiedad
          basado en sus características.
        </p>
      </div>
      
      <div className="predictor-content">
        <div className="predictor-form-container">
          <form onSubmit={handleSubmit} className="predictor-form">
            <div className="form-group">
              <label htmlFor="distrito">Distrito</label>
              <select 
                id="distrito" 
                name="distrito" 
                value={formData.distrito}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un distrito</option>
                {distritos.map(distrito => (
                  <option key={distrito} value={distrito}>{distrito}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="metros_cuadrados">Metros cuadrados</label>
              <input 
                type="number" 
                id="metros_cuadrados" 
                name="metros_cuadrados"
                placeholder="Ej: 90"
                min="20"
                max="500"
                value={formData.metros_cuadrados}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="habitaciones">Número de habitaciones</label>
              <input 
                type="number" 
                id="habitaciones" 
                name="habitaciones"
                placeholder="Ej: 2"
                min="1"
                max="10"
                value={formData.habitaciones}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="antiguedad">Antigüedad (años)</label>
              <input 
                type="number" 
                id="antiguedad" 
                name="antiguedad"
                placeholder="Ej: 15"
                min="0"
                max="100"
                value={formData.antiguedad}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="predictor-button"
              disabled={loading}
            >
              {loading ? 'Calculando...' : 'Calcular Precio'}
            </button>
            
            {error && (
              <div className="predictor-error">
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
        
        <div className="predictor-result-container">
          {resultado ? (
            <div className="predictor-result">
              <h3>Resultado de la predicción</h3>
              
              <div className="precio-predicho">
                <div className="etiqueta">Precio estimado:</div>
                <div className="valor">{formatearPrecio(resultado.precio_estimado)}</div>
              </div>
              
              <div className="caracteristicas-resumen">
                <h4>Características</h4>
                <ul>
                  <li><span>Distrito:</span> {resultado.caracteristicas.distrito}</li>
                  <li><span>Superficie:</span> {resultado.caracteristicas.metros_cuadrados} m²</li>
                  <li><span>Habitaciones:</span> {resultado.caracteristicas.habitaciones}</li>
                  <li><span>Antigüedad:</span> {resultado.caracteristicas.antiguedad} años</li>
                </ul>
              </div>
              
              <div className="predictor-disclaimer">
                <p>Esta predicción es orientativa y ha sido generada por un modelo entrenado con datos históricos.</p>
              </div>
            </div>
          ) : (
            <div className="predictor-placeholder">
              <div className="placeholder-icon">💡</div>
              <h3>¿Cuánto vale tu propiedad?</h3>
              <p>Completa el formulario con las características de la propiedad para obtener una estimación de su valor de mercado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModeloPredictivo; 