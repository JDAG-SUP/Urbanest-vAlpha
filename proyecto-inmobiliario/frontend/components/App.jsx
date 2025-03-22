import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navegacion/Navbar';
import ListViviendasContainer from './ContenedorBase0/ListViviendasContainer';
import Mapa from './Mapa/Mapa';
import ModeloPredictivo from './ModeloPredictivo/model';
import PropiedadDetalle from './Vivienda/PropiedadDetalle';
import Inicio from './Home/Inicio';
import Estadisticas from './Estadisticas/Estadisticas';
import './App.css';

const App = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/propiedades" element={<ListViviendasContainer />} />
            <Route path="/propiedad/:id" element={<PropiedadDetalle />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/predictor" element={<ModeloPredictivo />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-wave">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
          <div className="container footer-container">
            <div className="footer-left">
              <div className="footer-logo">
                <div className="urbanest-logo-footer">
                  <div className="logo-container-footer">
                    <div className="logo-text-main-footer">Urbanest</div>
                    <div className="logo-slogan-bar-footer">LA CLAVE PARA ELEGIR LA PROPIEDAD IDEAL</div>
                  </div>
                </div>
              </div>
              <p className="footer-description">
                Aprende de nuestro proyecto y contáctate con nosotros. Ofrecemos las mejores herramientas para encontrar y valorar propiedades inmobiliarias.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <i className="facebook-icon">f</i>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <i className="instagram-icon">ig</i>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <i className="twitter-icon">t</i>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <i className="linkedin-icon">in</i>
                </a>
              </div>
            </div>
            
            <div className="footer-right">
              <div className="footer-contact">
                <p className="footer-email">info@urbanest.com</p>
                <p className="footer-phone">+34 91 123 45 67</p>
                <hr className="footer-divider" />
              </div>
              
              <div className="footer-links">
                <div className="footer-links-column">
                  <h3>Ayuda</h3>
                  <ul>
                    <li><a href="#">Preguntas frecuentes</a></li>
                    <li><a href="#">Servicio al cliente</a></li>
                    <li><a href="#">Guías de uso</a></li>
                    <li><a href="#">Contáctanos</a></li>
                  </ul>
                </div>
                
                <div className="footer-links-column">
                  <h3>Legal</h3>
                  <ul>
                    <li><a href="#">Política de privacidad</a></li>
                    <li><a href="#">Términos de servicio</a></li>
                    <li><a href="#">Cookies</a></li>
                  </ul>
                </div>
                
                <div className="footer-links-column">
                  <h3>Compañía</h3>
                  <ul>
                    <li><a href="#">Sobre nosotros</a></li>
                    <li><a href="#">Nuestro equipo</a></li>
                    <li><a href="#">Trabaja con nosotros</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="container">
              <p>&copy; {currentYear} UrbaNest. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App; 