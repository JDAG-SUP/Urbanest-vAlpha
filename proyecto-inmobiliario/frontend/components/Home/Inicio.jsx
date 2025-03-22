import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    setAnimated(true);
    
    // Iniciar animación de estadísticas después de un delay
    const timer = setTimeout(() => {
      const counters = document.querySelectorAll('.counter-value');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.round(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        
        updateCounter();
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      <section className={`hero-section ${animated ? 'animated' : ''}`}>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">Bienvenido a</span>
              <span className="hero-title-highlight">UrbaNest</span>
            </h1>
            <p className="hero-subtitle">La mejor herramienta para conocer y valorar tu propiedad</p>
            <div className="hero-buttons">
              <Link to="/propiedades" className="hero-button primary">
                <span>Explorar propiedades</span>
                <i className="button-icon">→</i>
              </Link>
              <Link to="/predictor" className="hero-button secondary">
                <span>Valorar propiedad</span>
                <i className="button-icon">↗</i>
              </Link>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="Propiedad de lujo" />
              <div className="hero-image-overlay"></div>
              <div className="hero-image-badge">
                <div className="badge-icon">★</div>
                <div className="badge-text">
                  <span className="badge-value">Premium</span>
                  <span className="badge-label">Propiedades</span>
                </div>
              </div>
            </div>
            <div className="hero-image-dots"></div>
          </div>
        </div>
        
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,186.7C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏠</div>
              <div className="stat-value counter-value" data-target="5840">0</div>
              <div className="stat-label">Propiedades</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value counter-value" data-target="2100">0</div>
              <div className="stat-label">Clientes satisfechos</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value counter-value" data-target="95">0</div>
              <div className="stat-label">% de precisión</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📍</div>
              <div className="stat-value counter-value" data-target="120">0</div>
              <div className="stat-label">Ciudades</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Nuestros <span className="text-gradient">Servicios</span></h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg"></div>
                <span className="feature-icon">🔍</span>
              </div>
              <h3 className="feature-title">Buscar</h3>
              <p className="feature-description">
                Encuentra propiedades usando nuestros filtros avanzados y visualízalas en el mapa.
              </p>
              <Link to="/propiedades" className="feature-link">
                Explorar propiedades
                <span className="feature-link-arrow">→</span>
              </Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg"></div>
                <span className="feature-icon">💰</span>
              </div>
              <h3 className="feature-title">Valorar</h3>
              <p className="feature-description">
                Utiliza nuestro modelo de IA para obtener una valoración precisa de tu propiedad.
              </p>
              <Link to="/predictor" className="feature-link">
                Valorar ahora
                <span className="feature-link-arrow">→</span>
              </Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg"></div>
                <span className="feature-icon">🗺️</span>
              </div>
              <h3 className="feature-title">Explorar</h3>
              <p className="feature-description">
                Visualiza todas las propiedades georreferenciadas en nuestro mapa interactivo.
              </p>
              <Link to="/mapa" className="feature-link">
                Ver mapa
                <span className="feature-link-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-bg-pattern"></div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Quieres saber cuánto vale tu propiedad?</h2>
            <p className="cta-description">
              Utiliza nuestro modelo de inteligencia artificial para obtener una valoración precisa de tu propiedad en segundos.
            </p>
            <Link to="/predictor" className="cta-button">
              Valorar mi propiedad ahora
              <span className="cta-button-icon">↗</span>
            </Link>
          </div>
          
          <div className="cta-image">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="Valoración de propiedades" />
            <div className="cta-image-badge">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">Resultados al instante</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Lo que dicen <span className="text-gradient">nuestros usuarios</span></h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  Gracias a UrbaNest pude conocer el valor real de mi propiedad y tomar una decisión informada antes de venderla. El proceso fue rápido y muy preciso.
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-author-image">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ana García" />
                </div>
                <div className="testimonial-author-info">
                  <h4 className="testimonial-author-name">Ana García</h4>
                  <p className="testimonial-author-title">Propietaria</p>
                </div>
                <div className="testimonial-rating">
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  La herramienta de valoración es increíblemente precisa. Me ahorró mucho tiempo en la búsqueda de mi nuevo hogar y pude negociar mejor el precio.
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-author-image">
                  <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Carlos Martínez" />
                </div>
                <div className="testimonial-author-info">
                  <h4 className="testimonial-author-name">Carlos Martínez</h4>
                  <p className="testimonial-author-title">Comprador</p>
                </div>
                <div className="testimonial-rating">
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  Como agente inmobiliario, UrbaNest se ha convertido en una herramienta indispensable. Me permite ofrecer valoraciones precisas a mis clientes en minutos.
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-author-image">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Laura Rodríguez" />
                </div>
                <div className="testimonial-author-info">
                  <h4 className="testimonial-author-name">Laura Rodríguez</h4>
                  <p className="testimonial-author-title">Agente Inmobiliario</p>
                </div>
                <div className="testimonial-rating">
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                  <span className="rating-star">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="brands-section">
        <div className="container">
          <h2 className="brands-title">Confían en nosotros</h2>
          <div className="brands-grid">
            <div className="brand-item">
              <div className="brand-logo">🏢</div>
              <div className="brand-name">InmoEmpresa</div>
            </div>
            <div className="brand-item">
              <div className="brand-logo">🏛️</div>
              <div className="brand-name">BancoInmo</div>
            </div>
            <div className="brand-item">
              <div className="brand-logo">🏗️</div>
              <div className="brand-name">ConstructoraIbérica</div>
            </div>
            <div className="brand-item">
              <div className="brand-logo">🏘️</div>
              <div className="brand-name">UrbanDev</div>
            </div>
            <div className="brand-item">
              <div className="brand-logo">🏙️</div>
              <div className="brand-name">CiudadHogar</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Mantente informado</h2>
              <p className="newsletter-description">
                Suscríbete a nuestra newsletter para recibir novedades sobre el mercado inmobiliario y nuevas funcionalidades.
              </p>
            </div>
            <form className="newsletter-form">
              <input type="email" placeholder="Tu correo electrónico" className="newsletter-input" />
              <button type="submit" className="newsletter-button">Suscribirme</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio; 