import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="slogan-bar">
        <div className="container">
          <h2>La clave para elegir la propiedad ideal</h2>
        </div>
      </div>
      
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="logo">
            <div className="logo-box">
              <div className="urbanest-logo">
                <div className="logo-container">
                  <div className="logo-text-main">Urbanest</div>
                  <div className="logo-slogan-bar">LA CLAVE PARA ELEGIR LA PROPIEDAD IDEAL</div>
                </div>
              </div>
            </div>
          </Link>
          
          <form className="search-form">
            <div className="search-container">
              <i className="search-icon">🔍</i>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar propiedades..." 
                aria-label="Buscar propiedades"
              />
            </div>
          </form>
          
          <div className="nav-links">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Inicio
            </NavLink>
            <NavLink to="/propiedades" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Propiedades
            </NavLink>
            <NavLink to="/mapa" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Mapa
            </NavLink>
            <NavLink to="/estadisticas" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Estadísticas
            </NavLink>
            <NavLink to="/predictor" className="nav-button">
              Predecir <span className="button-arrow">↗</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 