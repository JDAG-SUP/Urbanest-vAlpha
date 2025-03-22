import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';
import L from 'leaflet';

// Corregir el problema de iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(precio);
};

const Mapa = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posicionCentral, setPosicionCentral] = useState([6.2442, -75.5812]); // Centro de Medellín por defecto

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        setLoading(true);
        // Comentamos la llamada real a la API y generamos datos ficticios para Medellín
        // const response = await fetch('http://localhost:5000/api/propiedades');
        // 
        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status}`);
        // }
        // 
        // const data = await response.json();
        
        // Generamos datos ficticios para Medellín
        const data = generarPropiedadesFicticiasMedellin();
        setPropiedades(data);
        
        // Calcular la posición promedio para centrar el mapa
        if (data.length > 0) {
          const latitudes = data.map(p => p.latitud);
          const longitudes = data.map(p => p.longitud);
          const latitudPromedio = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
          const longitudPromedio = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
          setPosicionCentral([latitudPromedio, longitudPromedio]);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, []);
  
  // Función para generar datos ficticios para Medellín
  const generarPropiedadesFicticiasMedellin = () => {
    const zonasMedellin = [
      { nombre: 'El Poblado', latitud: 6.2087, longitud: -75.5658 },
      { nombre: 'Laureles', latitud: 6.2466, longitud: -75.5950 },
      { nombre: 'Envigado', latitud: 6.1760, longitud: -75.5877 },
      { nombre: 'Belén', latitud: 6.2332, longitud: -75.6081 },
      { nombre: 'Sabaneta', latitud: 6.1495, longitud: -75.6167 },
      { nombre: 'La Candelaria', latitud: 6.2518, longitud: -75.5636 },
      { nombre: 'Robledo', latitud: 6.2755, longitud: -75.5904 },
      { nombre: 'Itagüí', latitud: 6.1846, longitud: -75.5991 },
      { nombre: 'Estadio', latitud: 6.2561, longitud: -75.5878 },
      { nombre: 'Calasanz', latitud: 6.2558, longitud: -75.6108 }
    ];
    
    const tiposPropiedad = ['Apartamento', 'Casa', 'Apartaestudio', 'Finca', 'Local Comercial'];
    const tiposOperacion = ['Venta', 'Arriendo'];
    const estados = ['Nuevo', 'Buen estado', 'Para remodelar'];
    
    const propiedadesFicticias = [];
    
    // Generamos 50 propiedades ficticias
    for (let i = 0; i < 50; i++) {
      const zonaIndex = Math.floor(Math.random() * zonasMedellin.length);
      const zona = zonasMedellin[zonaIndex];
      const tipoPropiedad = tiposPropiedad[Math.floor(Math.random() * tiposPropiedad.length)];
      const tipoOperacion = tiposOperacion[Math.floor(Math.random() * tiposOperacion.length)];
      const estado = estados[Math.floor(Math.random() * estados.length)];
      
      // Precios basados en el tipo de operación y la zona (en COP)
      let precioBase;
      if (tipoOperacion === 'Venta') {
        if (zona.nombre === 'El Poblado') precioBase = 500000000 + Math.random() * 700000000;
        else if (zona.nombre === 'Laureles' || zona.nombre === 'Envigado') precioBase = 350000000 + Math.random() * 400000000;
        else precioBase = 200000000 + Math.random() * 300000000;
      } else { // Arriendo
        if (zona.nombre === 'El Poblado') precioBase = 2000000 + Math.random() * 3000000;
        else if (zona.nombre === 'Laureles' || zona.nombre === 'Envigado') precioBase = 1200000 + Math.random() * 2000000;
        else precioBase = 800000 + Math.random() * 1500000;
      }
      
      // Los apartaestudios y locales son más pequeños
      let metrosBase;
      if (tipoPropiedad === 'Apartaestudio') metrosBase = 30 + Math.random() * 30;
      else if (tipoPropiedad === 'Local Comercial') metrosBase = 40 + Math.random() * 100;
      else if (tipoPropiedad === 'Finca') metrosBase = 200 + Math.random() * 800;
      else metrosBase = 60 + Math.random() * 150;
      
      const habitaciones = tipoPropiedad === 'Apartaestudio' ? 1 : 
                          tipoPropiedad === 'Local Comercial' ? 0 :
                          Math.ceil(Math.random() * 4);
      
      // Añadir un poco de variación alrededor de las coordenadas base de la zona
      const variacionLatitud = (Math.random() - 0.5) * 0.01;
      const variacionLongitud = (Math.random() - 0.5) * 0.01;
      
      propiedadesFicticias.push({
        id: i + 1,
        zona: zona.nombre,
        distrito: zona.nombre,
        tipo_propiedad: tipoPropiedad,
        tipo_operacion: tipoOperacion,
        precio: Math.round(precioBase),
        metros_cuadrados: Math.round(metrosBase),
        habitaciones: habitaciones,
        banos: Math.ceil(Math.random() * 3),
        estado: estado,
        latitud: zona.latitud + variacionLatitud,
        longitud: zona.longitud + variacionLongitud,
        antiguedad: Math.ceil(Math.random() * 20)
      });
    }
    
    return propiedadesFicticias;
  };

  if (loading) {
    return <div className="mapa-cargando">Cargando mapa de propiedades...</div>;
  }

  if (error) {
    return <div className="mapa-error">Error al cargar el mapa: {error}</div>;
  }

  return (
    <div className="mapa-container">
      <h2 className="mapa-titulo">Mapa de propiedades en Medellín</h2>
      <div className="mapa-instrucciones">
        Explora las propiedades disponibles en el mapa de Medellín. Haz clic en los marcadores para ver más detalles.
      </div>
      
      <MapContainer center={posicionCentral} zoom={13} className="mapa">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {propiedades.map(propiedad => (
          <Marker 
            key={propiedad.id} 
            position={[propiedad.latitud, propiedad.longitud]}
          >
            <Popup>
              <div className="mapa-popup">
                <h3>{propiedad.distrito}</h3>
                <p>
                  <strong>{propiedad.tipo_propiedad}</strong> · 
                  <strong> {propiedad.metros_cuadrados} m²</strong> · 
                  <strong> {propiedad.habitaciones} hab.</strong> · 
                  <strong> {propiedad.estado}</strong>
                </p>
                <p className="mapa-popup-precio">{formatearPrecio(propiedad.precio)}</p>
                <Link to={`/propiedad/${propiedad.id}`} className="mapa-popup-link">
                  Ver detalles
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="mapa-leyenda">
        <p>Se muestran {propiedades.length} propiedades en Medellín</p>
      </div>
    </div>
  );
};

export default Mapa; 