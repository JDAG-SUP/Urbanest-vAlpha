import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './PropiedadDetalle.css';

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

const PropiedadDetalle = () => {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propiedadesSimilares, setPropiedadesSimilares] = useState([]);

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        setLoading(true);
        // Comentamos la llamada real a la API y generamos datos ficticios para Medellín
        // const response = await fetch(`http://localhost:5000/api/propiedades/${id}`);
        // 
        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status}`);
        // }
        // 
        // const data = await response.json();
        
        // Generamos datos ficticios para propiedad en Medellín
        const data = generarPropiedadFicticiaMedellin(id);
        setPropiedad(data);
        
        // Obtener propiedades similares en la misma zona
        // const responseSimilares = await fetch(`http://localhost:5000/api/propiedades?distrito=${data.distrito}`);
        // const dataSimilares = await responseSimilares.json();
        
        // Generamos datos ficticios para propiedades similares en Medellín
        const dataSimilares = generarPropiedadesSimilaresMedellin(data.zona, id);
        setPropiedadesSimilares(dataSimilares);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPropiedad();
  }, [id]);
  
  // Función para generar una propiedad ficticia en Medellín
  const generarPropiedadFicticiaMedellin = (id) => {
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
    
    // Determinar un índice basado en el ID para tener consistencia
    const idNumber = parseInt(id);
    const zonaIndex = idNumber % zonasMedellin.length;
    const zona = zonasMedellin[zonaIndex];
    
    const tipoPropiedadIndex = idNumber % tiposPropiedad.length;
    const tipoOperacionIndex = Math.floor(idNumber / 10) % tiposOperacion.length;
    const estadoIndex = Math.floor(idNumber / 5) % estados.length;
    
    const tipoPropiedad = tiposPropiedad[tipoPropiedadIndex];
    const tipoOperacion = tiposOperacion[tipoOperacionIndex];
    const estado = estados[estadoIndex];
    
    // Precios basados en el tipo de operación y la zona (en COP)
    let precio;
    if (tipoOperacion === 'Venta') {
      if (zona.nombre === 'El Poblado') precio = 500000000 + (idNumber * 50000000) % 700000000;
      else if (zona.nombre === 'Laureles' || zona.nombre === 'Envigado') precio = 350000000 + (idNumber * 40000000) % 400000000;
      else precio = 200000000 + (idNumber * 30000000) % 300000000;
    } else { // Arriendo
      if (zona.nombre === 'El Poblado') precio = 2000000 + (idNumber * 200000) % 3000000;
      else if (zona.nombre === 'Laureles' || zona.nombre === 'Envigado') precio = 1200000 + (idNumber * 150000) % 2000000;
      else precio = 800000 + (idNumber * 100000) % 1500000;
    }
    
    // Tamaño basado en el tipo de propiedad
    let metros;
    if (tipoPropiedad === 'Apartaestudio') metros = 30 + (idNumber * 3) % 30;
    else if (tipoPropiedad === 'Local Comercial') metros = 40 + (idNumber * 5) % 100;
    else if (tipoPropiedad === 'Finca') metros = 200 + (idNumber * 20) % 800;
    else metros = 60 + (idNumber * 8) % 150;
    
    const habitaciones = tipoPropiedad === 'Apartaestudio' ? 1 : 
                         tipoPropiedad === 'Local Comercial' ? 0 :
                         1 + (idNumber % 4);
    
    // Añadir un poco de variación alrededor de las coordenadas base de la zona
    const variacionLatitud = ((idNumber * 17) % 100) / 10000;
    const variacionLongitud = ((idNumber * 23) % 100) / 10000;
    
    const caracteristicas = [
      'Cocina integral',
      'Balcón',
      'Parqueadero privado',
      'Ascensor',
      'Zona de lavandería',
      'Vigilancia 24/7',
      'Gimnasio',
      'Piscina'
    ];
    
    // Seleccionar algunas características basadas en el ID
    const caracteristicasSeleccionadas = caracteristicas.filter((_, index) => {
      return (idNumber + index) % 3 === 0;
    });
    
    return {
      id: idNumber,
      zona: zona.nombre,
      distrito: zona.nombre,
      direccion: `Calle ${idNumber * 3 + 10} # ${idNumber % 100 + 5}-${idNumber % 80 + 10}`,
      tipo_propiedad: tipoPropiedad,
      tipo_operacion: tipoOperacion,
      precio: Math.round(precio),
      metros_cuadrados: Math.round(metros),
      habitaciones: habitaciones,
      banos: 1 + (idNumber % 3),
      estrato: zona.nombre === 'El Poblado' ? 6 : (zona.nombre === 'Laureles' || zona.nombre === 'Envigado') ? 5 : Math.min(3 + (idNumber % 3), 6),
      estado: estado,
      latitud: zona.latitud + variacionLatitud,
      longitud: zona.longitud + variacionLongitud,
      antiguedad: Math.max(1, idNumber % 20),
      descripcion: `Hermoso ${tipoPropiedad.toLowerCase()} ubicado en ${zona.nombre}, uno de los sectores más exclusivos de Medellín. Esta propiedad de ${Math.round(metros)}m² cuenta con ${habitaciones} habitaciones, ${1 + (idNumber % 3)} baños y está en perfecto estado. ${tipoOperacion === 'Venta' ? 'Ideal para inversión o para vivir.' : 'Disponible para arriendo inmediato.'}`,
      caracteristicas: caracteristicasSeleccionadas
    };
  };
  
  // Función para generar propiedades similares en Medellín
  const generarPropiedadesSimilaresMedellin = (zona, propiedadId) => {
    const propiedadesSimilares = [];
    const idBase = parseInt(propiedadId) * 100;
    
    // Generamos 3 propiedades similares
    for (let i = 0; i < 3; i++) {
      const nuevaPropiedad = generarPropiedadFicticiaMedellin((idBase + i + 1).toString());
      // Aseguramos que estén en la misma zona para que sean realmente similares
      nuevaPropiedad.zona = zona;
      nuevaPropiedad.distrito = zona;
      propiedadesSimilares.push(nuevaPropiedad);
    }
    
    return propiedadesSimilares;
  };

  if (loading) {
    return <div className="propiedad-cargando">Cargando detalles de la propiedad...</div>;
  }

  if (error) {
    return <div className="propiedad-error">Error al cargar la propiedad: {error}</div>;
  }

  if (!propiedad) {
    return <div className="propiedad-no-encontrada">Propiedad no encontrada</div>;
  }

  const {
    distrito,
    zona,
    direccion,
    metros_cuadrados,
    habitaciones,
    banos,
    precio,
    antiguedad,
    estado,
    tipo_propiedad,
    tipo_operacion,
    descripcion,
    caracteristicas,
    latitud,
    longitud,
    estrato
  } = propiedad;

  // Generar imágenes aleatorias para simulación
  const imagenes = [
    `https://source.unsplash.com/800x600/?apartment,interior,living,${id}1`,
    `https://source.unsplash.com/800x600/?apartment,kitchen,${id}2`,
    `https://source.unsplash.com/800x600/?apartment,bedroom,${id}3`,
    `https://source.unsplash.com/800x600/?apartment,bathroom,${id}4`
  ];

  return (
    <div className="propiedad-detalle">
      <div className="volver-link">
        <Link to="/propiedades">← Volver a listado de propiedades</Link>
      </div>
      
      <div className="propiedad-header">
        <div className="propiedad-titulo-container">
          <h1 className="propiedad-titulo">{tipo_propiedad} en {distrito}</h1>
          <p className="propiedad-direccion">{direccion}</p>
        </div>
        <div className="propiedad-precio-container">
          <div className="propiedad-precio">{formatearPrecio(precio)}</div>
          <div className="propiedad-operacion">{tipo_operacion}</div>
        </div>
      </div>
      
      <div className="propiedad-galeria">
        {imagenes.map((img, index) => (
          <div key={index} className={`galeria-item ${index === 0 ? 'galeria-item-principal' : ''}`}>
            <img src={img} alt={`Imagen ${index + 1} de la propiedad`} />
          </div>
        ))}
      </div>
      
      <div className="propiedad-content">
        <div className="propiedad-info-principal">
          <div className="propiedad-caracteristicas">
            <div className="caracteristica">
              <span className="icono">🏠</span>
              <span className="valor">{metros_cuadrados} m²</span>
            </div>
            <div className="caracteristica">
              <span className="icono">🛏️</span>
              <span className="valor">{habitaciones} habitaciones</span>
            </div>
            <div className="caracteristica">
              <span className="icono">🚿</span>
              <span className="valor">{banos} baños</span>
            </div>
            <div className="caracteristica">
              <span className="icono">🗓️</span>
              <span className="valor">{antiguedad} años</span>
            </div>
            <div className="caracteristica">
              <span className="icono">🏢</span>
              <span className="valor">{estado}</span>
            </div>
            <div className="caracteristica">
              <span className="icono">🔢</span>
              <span className="valor">Estrato {estrato}</span>
            </div>
          </div>
          
          <div className="propiedad-descripcion">
            <h2>Descripción</h2>
            <p>{descripcion}</p>
          </div>
          
          <div className="propiedad-extras">
            <h2>Características adicionales</h2>
            <ul className="lista-caracteristicas">
              {caracteristicas && caracteristicas.length > 0 ? (
                caracteristicas.map((caracteristica, index) => (
                  <li key={index}>{caracteristica}</li>
                ))
              ) : (
                <>
                  <li>Cocina integral</li>
                  <li>Balcón</li>
                  <li>Parqueadero</li>
                  <li>Ascensor</li>
                  <li>Vigilancia 24/7</li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="propiedad-sidebar">
          <div className="propiedad-mapa-container">
            <h2>Ubicación en Medellín</h2>
            <MapContainer 
              center={[latitud, longitud]} 
              zoom={15} 
              className="propiedad-mapa"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitud, longitud]}>
                <Popup>
                  {tipo_propiedad} en {distrito}<br />
                  {formatearPrecio(precio)}
                </Popup>
              </Marker>
            </MapContainer>
            <p className="propiedad-ubicacion-texto">
              {zona}, Medellín, Colombia
            </p>
          </div>
          
          <div className="contacto-agente">
            <h2>Contactar</h2>
            <div className="agente-info">
              <div className="agente-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Agente inmobiliario" />
              </div>
              <div className="agente-detalles">
                <div className="agente-nombre">Carlos Restrepo</div>
                <div className="agente-titulo">Asesor Inmobiliario</div>
              </div>
            </div>
            
            <div className="contacto-botones">
              <a href="tel:+573001234567" className="boton-contacto telefono">
                <span className="icono">📞</span> Llamar
              </a>
              <a href="mailto:carlos@urbanest.co" className="boton-contacto email">
                <span className="icono">✉️</span> Email
              </a>
              <a href="https://wa.me/573001234567" className="boton-contacto whatsapp">
                <span className="icono">💬</span> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {propiedadesSimilares.length > 0 && (
        <div className="propiedades-similares">
          <h2>Propiedades similares en {zona}</h2>
          <div className="similares-grid">
            {propiedadesSimilares.map(propiedad => (
              <div key={propiedad.id} className="similar-card">
                <img 
                  src={`https://source.unsplash.com/300x200/?apartment,property,${propiedad.id}`} 
                  alt={`Propiedad en ${propiedad.distrito}`}
                  className="similar-imagen"
                />
                <div className="similar-info">
                  <h3>{propiedad.tipo_propiedad} en {propiedad.distrito}</h3>
                  <p className="similar-detalles">
                    {propiedad.metros_cuadrados} m² · {propiedad.habitaciones} hab. · {propiedad.banos} baños
                  </p>
                  <p className="similar-precio">{formatearPrecio(propiedad.precio)}</p>
                  <Link to={`/propiedad/${propiedad.id}`} className="similar-link">
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropiedadDetalle; 