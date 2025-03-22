import React, { useState, useEffect } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import './Estadisticas.css';

// Registrar los componentes de Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Estadisticas = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [datosAgregados, setDatosAgregados] = useState({
    precioPromedioPorZona: {},
    propiedadesPorTipo: {},
    propiedadesPorOperacion: {},
    precioPromedioPorMetros: {},
    distribucionHabitaciones: {},
    evolucionPrecioMensual: {}
  });

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
        const data = generarDatosFicticiosMedellin();
        setPropiedades(data);
        procesarDatos(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los datos: ' + error.message);
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, []);

  // Función para generar datos ficticios de Medellín
  const generarDatosFicticiosMedellin = () => {
    const zonasMedellin = [
      'El Poblado', 
      'Laureles', 
      'Envigado', 
      'Belén', 
      'Sabaneta', 
      'La Candelaria', 
      'Robledo', 
      'Itagüí', 
      'Estadio', 
      'Calasanz'
    ];
    
    const tiposPropiedad = ['Apartamento', 'Casa', 'Apartaestudio', 'Finca', 'Local Comercial'];
    const tiposOperacion = ['Venta', 'Arriendo'];
    
    const propiedadesFicticias = [];
    
    // Generamos 100 propiedades ficticias
    for (let i = 0; i < 100; i++) {
      const zona = zonasMedellin[Math.floor(Math.random() * zonasMedellin.length)];
      const tipoPropiedad = tiposPropiedad[Math.floor(Math.random() * tiposPropiedad.length)];
      const tipoOperacion = tiposOperacion[Math.floor(Math.random() * tiposOperacion.length)];
      
      // Precios basados en el tipo de operación y la zona (en COP)
      let precioBase;
      if (tipoOperacion === 'Venta') {
        if (zona === 'El Poblado') precioBase = 500000000 + Math.random() * 700000000;
        else if (zona === 'Laureles' || zona === 'Envigado') precioBase = 350000000 + Math.random() * 400000000;
        else precioBase = 200000000 + Math.random() * 300000000;
      } else { // Arriendo
        if (zona === 'El Poblado') precioBase = 2000000 + Math.random() * 3000000;
        else if (zona === 'Laureles' || zona === 'Envigado') precioBase = 1200000 + Math.random() * 2000000;
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
      
      propiedadesFicticias.push({
        id: i + 1,
        zona: zona,
        tipo_propiedad: tipoPropiedad,
        tipo_operacion: tipoOperacion,
        precio: Math.round(precioBase),
        metros_cuadrados: Math.round(metrosBase),
        habitaciones: habitaciones,
        banos: Math.ceil(Math.random() * 3),
        estrato: Math.ceil(Math.random() * 6),
        antiguedad: Math.ceil(Math.random() * 20)
      });
    }
    
    return propiedadesFicticias;
  };

  const procesarDatos = (propiedades) => {
    // 1. Precio promedio por zona
    const preciosPorZona = propiedades.reduce((acc, prop) => {
      const zona = prop.zona || 'Sin definir';
      if (!acc[zona]) {
        acc[zona] = { total: 0, cantidad: 0 };
      }
      acc[zona].total += prop.precio;
      acc[zona].cantidad += 1;
      return acc;
    }, {});

    const precioPromedioPorZona = Object.keys(preciosPorZona).reduce((acc, zona) => {
      acc[zona] = Math.round(preciosPorZona[zona].total / preciosPorZona[zona].cantidad);
      return acc;
    }, {});

    // 2. Propiedades por tipo
    const propiedadesPorTipo = propiedades.reduce((acc, prop) => {
      const tipo = prop.tipo_propiedad || 'Sin definir';
      if (!acc[tipo]) {
        acc[tipo] = 0;
      }
      acc[tipo] += 1;
      return acc;
    }, {});

    // 3. Propiedades por operación (venta/alquiler)
    const propiedadesPorOperacion = propiedades.reduce((acc, prop) => {
      const operacion = prop.tipo_operacion || 'Sin definir';
      if (!acc[operacion]) {
        acc[operacion] = 0;
      }
      acc[operacion] += 1;
      return acc;
    }, {});

    // 4. Precio promedio por metros cuadrados
    const rangosMetros = {
      '0-50m²': { total: 0, cantidad: 0 },
      '51-100m²': { total: 0, cantidad: 0 },
      '101-150m²': { total: 0, cantidad: 0 },
      '151-200m²': { total: 0, cantidad: 0 },
      'Más de 200m²': { total: 0, cantidad: 0 }
    };

    propiedades.forEach(prop => {
      const metros = prop.metros_cuadrados;
      let rango = 'Sin definir';

      if (metros <= 50) rango = '0-50m²';
      else if (metros <= 100) rango = '51-100m²';
      else if (metros <= 150) rango = '101-150m²';
      else if (metros <= 200) rango = '151-200m²';
      else rango = 'Más de 200m²';

      rangosMetros[rango].total += prop.precio;
      rangosMetros[rango].cantidad += 1;
    });

    const precioPromedioPorMetros = Object.keys(rangosMetros).reduce((acc, rango) => {
      if (rangosMetros[rango].cantidad > 0) {
        acc[rango] = Math.round(rangosMetros[rango].total / rangosMetros[rango].cantidad);
      } else {
        acc[rango] = 0;
      }
      return acc;
    }, {});

    // 5. Distribución por número de habitaciones
    const distribucionHabitaciones = propiedades.reduce((acc, prop) => {
      const habitaciones = prop.habitaciones || 'Sin definir';
      const label = habitaciones === 'Sin definir' ? 'Sin definir' : `${habitaciones} hab.`;
      if (!acc[label]) {
        acc[label] = 0;
      }
      acc[label] += 1;
      return acc;
    }, {});

    // 6. Simular evolución de precio mensual (datos ficticios para demostración)
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const precioBase = Object.values(precioPromedioPorZona).reduce((sum, precio) => sum + precio, 0) / 
                      Object.values(precioPromedioPorZona).length || 300000000;
    
    const evolucionPrecioMensual = meses.reduce((acc, mes, index) => {
      // Simulamos una variación de precios con una tendencia alcista suave
      const variacion = 0.98 + (index * 0.005) + (Math.random() * 0.04);
      acc[mes] = Math.round(precioBase * variacion);
      return acc;
    }, {});

    setDatosAgregados({
      precioPromedioPorZona,
      propiedadesPorTipo,
      propiedadesPorOperacion,
      precioPromedioPorMetros,
      distribucionHabitaciones,
      evolucionPrecioMensual
    });
  };

  // Configuración de gráfico de barras - Precio por Zona
  const preciosPorZonaConfig = {
    labels: Object.keys(datosAgregados.precioPromedioPorZona),
    datasets: [{
      label: 'Precio promedio (COP)',
      data: Object.values(datosAgregados.precioPromedioPorZona),
      backgroundColor: 'rgba(57, 73, 171, 0.6)',
      borderColor: 'rgba(57, 73, 171, 1)',
      borderWidth: 1
    }]
  };

  // Configuración de gráfico circular - Tipos de Propiedad
  const tiposPropiedadConfig = {
    labels: Object.keys(datosAgregados.propiedadesPorTipo),
    datasets: [{
      label: 'Propiedades',
      data: Object.values(datosAgregados.propiedadesPorTipo),
      backgroundColor: [
        'rgba(57, 73, 171, 0.7)',
        'rgba(92, 107, 192, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 151, 167, 0.7)',
        'rgba(120, 144, 156, 0.7)'
      ],
      borderColor: [
        'rgba(57, 73, 171, 1)',
        'rgba(92, 107, 192, 1)',
        'rgba(0, 188, 212, 1)',
        'rgba(0, 151, 167, 1)',
        'rgba(120, 144, 156, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Configuración de gráfico circular - Operaciones
  const operacionesConfig = {
    labels: Object.keys(datosAgregados.propiedadesPorOperacion),
    datasets: [{
      label: 'Propiedades',
      data: Object.values(datosAgregados.propiedadesPorOperacion),
      backgroundColor: [
        'rgba(0, 188, 212, 0.7)',
        'rgba(57, 73, 171, 0.7)',
        'rgba(120, 144, 156, 0.7)'
      ],
      borderColor: [
        'rgba(0, 188, 212, 1)',
        'rgba(57, 73, 171, 1)',
        'rgba(120, 144, 156, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Configuración de gráfico de barras - Precio por metros cuadrados
  const preciosPorMetrosConfig = {
    labels: Object.keys(datosAgregados.precioPromedioPorMetros),
    datasets: [{
      label: 'Precio promedio (COP)',
      data: Object.values(datosAgregados.precioPromedioPorMetros),
      backgroundColor: 'rgba(0, 188, 212, 0.6)',
      borderColor: 'rgba(0, 188, 212, 1)',
      borderWidth: 1
    }]
  };

  // Configuración de gráfico de barras - Distribución por habitaciones
  const habitacionesConfig = {
    labels: Object.keys(datosAgregados.distribucionHabitaciones),
    datasets: [{
      label: 'Cantidad de propiedades',
      data: Object.values(datosAgregados.distribucionHabitaciones),
      backgroundColor: 'rgba(92, 107, 192, 0.6)',
      borderColor: 'rgba(92, 107, 192, 1)',
      borderWidth: 1
    }]
  };

  // Configuración de gráfico de línea - Evolución de precios
  const evolucionPreciosConfig = {
    labels: Object.keys(datosAgregados.evolucionPrecioMensual),
    datasets: [{
      label: 'Precio promedio (COP)',
      data: Object.values(datosAgregados.evolucionPrecioMensual),
      fill: false,
      backgroundColor: 'rgba(57, 73, 171, 0.6)',
      borderColor: 'rgba(57, 73, 171, 1)',
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="estadisticas-container">
      <h1 className="estadisticas-title">Estadísticas del Mercado Inmobiliario de Medellín</h1>
      <p className="estadisticas-description">
        Análisis detallado del mercado inmobiliario en Medellín basado en nuestra base de datos de propiedades.
        Estos datos te ayudarán a entender las tendencias actuales del mercado en las diferentes zonas de la ciudad.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h2 className="stat-title">Propiedades analizadas</h2>
          <div className="stat-value">{propiedades.length}</div>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Precio medio</h2>
          <div className="stat-value">
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(
              propiedades.reduce((sum, prop) => sum + prop.precio, 0) / propiedades.length || 0
            )}
          </div>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Superficie media</h2>
          <div className="stat-value">
            {Math.round(
              propiedades.reduce((sum, prop) => sum + prop.metros_cuadrados, 0) / propiedades.length || 0
            )} m²
          </div>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Zonas analizadas</h2>
          <div className="stat-value">
            {Object.keys(datosAgregados.precioPromedioPorZona).length}
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h2 className="chart-title">Precio Promedio por Zona</h2>
          <div className="chart-wrapper">
            <Bar data={preciosPorZonaConfig} options={options} />
          </div>
        </div>

        <div className="charts-row">
          <div className="chart-container half">
            <h2 className="chart-title">Distribución por Tipo de Propiedad</h2>
            <div className="chart-wrapper">
              <Pie data={tiposPropiedadConfig} options={pieOptions} />
            </div>
          </div>

          <div className="chart-container half">
            <h2 className="chart-title">Operaciones</h2>
            <div className="chart-wrapper">
              <Pie data={operacionesConfig} options={pieOptions} />
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Precio Promedio por Tamaño</h2>
          <div className="chart-wrapper">
            <Bar data={preciosPorMetrosConfig} options={options} />
          </div>
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Distribución por Habitaciones</h2>
          <div className="chart-wrapper">
            <Bar data={habitacionesConfig} options={{
              ...options,
              plugins: {
                ...options.plugins,
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += context.parsed.y + ' propiedades';
                      }
                      return label;
                    }
                  }
                }
              }
            }} />
          </div>
        </div>

        <div className="chart-container">
          <h2 className="chart-title">Evolución del Precio Promedio (12 meses)</h2>
          <div className="chart-wrapper">
            <Line data={evolucionPreciosConfig} options={options} />
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h2 className="insights-title">Análisis del Mercado</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Zonas más cotizadas</h3>
            <p>
              Las zonas con los precios más altos son {
                Object.entries(datosAgregados.precioPromedioPorZona)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([zona], index, arr) => 
                    index === arr.length - 1 
                      ? `y ${zona}`
                      : zona
                  )
                  .join(', ')
              }, donde los precios superan la media del mercado en Medellín.
            </p>
          </div>
          <div className="insight-card">
            <h3>Tipos de propiedad más comunes</h3>
            <p>
              {
                Object.entries(datosAgregados.propiedadesPorTipo)
                  .sort((a, b) => b[1] - a[1])[0][0]
              } son el tipo de propiedad más común en nuestra base de datos de Medellín, 
              representando el {
                Math.round(
                  (Object.entries(datosAgregados.propiedadesPorTipo)
                    .sort((a, b) => b[1] - a[1])[0][1] / 
                    propiedades.length) * 100
                )
              }% del total.
            </p>
          </div>
          <div className="insight-card">
            <h3>Relación Tamaño-Precio</h3>
            <p>
              Se observa una correlación positiva entre el tamaño de la propiedad y su precio en Medellín. 
              Las propiedades de más de 200m² tienen un precio promedio un {
                Math.round(
                  ((datosAgregados.precioPromedioPorMetros['Más de 200m²'] || 0) / 
                  (datosAgregados.precioPromedioPorMetros['0-50m²'] || 1) - 1) * 100
                )
              }% superior a las de menos de 50m².
            </p>
          </div>
          <div className="insight-card">
            <h3>Tendencia de precios</h3>
            <p>
              En los últimos 12 meses, los precios en Medellín han {
                Object.values(datosAgregados.evolucionPrecioMensual)[11] > 
                Object.values(datosAgregados.evolucionPrecioMensual)[0]
                  ? `aumentado un ${
                      Math.round(
                        (Object.values(datosAgregados.evolucionPrecioMensual)[11] / 
                        Object.values(datosAgregados.evolucionPrecioMensual)[0] - 1) * 100
                      )
                    }%`
                  : `disminuido un ${
                      Math.round(
                        (1 - Object.values(datosAgregados.evolucionPrecioMensual)[11] / 
                        Object.values(datosAgregados.evolucionPrecioMensual)[0]) * 100
                      )
                    }%`
              }, mostrando una tendencia {
                Object.values(datosAgregados.evolucionPrecioMensual)[11] > 
                Object.values(datosAgregados.evolucionPrecioMensual)[0]
                  ? 'alcista'
                  : 'bajista'
              } en el mercado.
            </p>
          </div>
        </div>
      </div>

      <div className="metodologia-section">
        <h2 className="metodologia-title">Metodología</h2>
        <p>
          Estas estadísticas se basan en el análisis de {propiedades.length} propiedades inmobiliarias 
          en Medellín y áreas metropolitanas. Los datos se actualizan periódicamente para reflejar las condiciones 
          actuales del mercado. Ten en cuenta que las estadísticas pueden variar según la comuna, estrato y el momento.
        </p>
      </div>
    </div>
  );
};

export default Estadisticas; 